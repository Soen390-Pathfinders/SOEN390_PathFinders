import React, { useState, useEffect } from "react";
import { 
  View, Text, Button, Alert, FlatList, TouchableOpacity, Modal, StyleSheet 
} from "react-native";
import { Calendar } from "react-native-calendars";
import * as CalendarAPI from "expo-calendar";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";

// Define Drawer Navigation Type
type RootDrawerParamList = {
  OutdoorDirections: undefined;
};
type NavigationProp = DrawerNavigationProp<RootDrawerParamList>;

export default function NextClassInfo() {
  const [calendars, setCalendars] = useState([]);
  const [selectedCalendarId, setSelectedCalendarId] = useState(null);
  const [markedDates, setMarkedDates] = useState({});
  const [allEvents, setAllEvents] = useState([]);
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);
  const [eventModalVisible, setEventModalVisible] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState([]);

  const navigation = useNavigation<NavigationProp>(); // Drawer navigation

  useEffect(() => {
    getPermissions();
  }, []);

  const getPermissions = async () => {
    const { status } = await CalendarAPI.requestCalendarPermissionsAsync();
    if (status === "granted") {
      fetchGoogleCalendars();
    } else {
      Alert.alert("Permission Denied", "Cannot access calendar events.");
    }
  };

  const fetchGoogleCalendars = async () => {
    try {
      const allCalendars = await CalendarAPI.getCalendarsAsync(CalendarAPI.EntityTypes.EVENT);
      const googleCalendars = allCalendars.filter(cal => cal.source.type === "com.google");

      if (googleCalendars.length === 0) {
        Alert.alert("No Google Calendar found!");
      } else {
        setCalendars(googleCalendars);
        setSelectedCalendarId(googleCalendars[0].id);
        fetchEvents(googleCalendars[0].id);
      }
    } catch (error) {
      console.error("Error fetching calendars:", error);
    }
  };

  const fetchEvents = async (calId) => {
    if (!calId) {
      Alert.alert("No calendar selected!");
      return;
    }

    const now = new Date();
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    try {
      const events = await CalendarAPI.getEventsAsync([calId], now, nextMonth);
      const formattedEvents = {};

      events.forEach((event) => {
        const date = event.startDate.split("T")[0];
        formattedEvents[date] = { marked: true, dotColor: "blue" };
      });

      setMarkedDates(formattedEvents);
      setAllEvents(events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleDayPress = (day) => {
    const date = day.dateString;

    const eventsOnDate = allEvents.filter(event => {
      const eventDate = new Date(event.startDate).toISOString().split("T")[0];
      return eventDate === date;
    });

    if (eventsOnDate.length > 0) {
      setSelectedEvents(eventsOnDate);
      setEventModalVisible(true);
    } else {
      Alert.alert("No Events", "There are no events on this day.");
    }
  };

  const handleCalendarSelection = (calendar) => {
    Alert.alert(
      "Switch Calendar",
      `Do you want to switch to "${calendar.title}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          onPress: () => {
            setSelectedCalendarId(calendar.id);
            fetchEvents(calendar.id);
            setCalendarModalVisible(false);
          },
        },
      ]
    );
  };

  const getNextClass = () => {
    const now = new Date();
    const upcomingEvents = allEvents.filter(event => new Date(event.startDate) > now);

    if (upcomingEvents.length === 0) {
      Alert.alert("No Upcoming Classes", "There are no upcoming events.");
      return;
    }

    const nextEvent = upcomingEvents.reduce((prev, curr) =>
      new Date(prev.startDate) < new Date(curr.startDate) ? prev : curr
    );

    if (!nextEvent.location) {
      Alert.alert("No Location", "This event does not have a location set.");
      return;
    }

    Alert.alert(
      "Next Class Details",
      `Title: ${nextEvent.title}\nTime: ${new Date(nextEvent.startDate).toLocaleString()}\nLocation: ${nextEvent.location}`,
      [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("OutdoorDirections", {
              customStartLocation: 'start',
              customDestination: nextEvent.location,
            });
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Switch Calendar" onPress={() => setCalendarModalVisible(true)} />
      <Button title="Refresh Events" onPress={() => fetchEvents(selectedCalendarId)} />

      <Text style={styles.header}>Calendar:</Text>
      <Calendar markedDates={markedDates} markingType="dot" onDayPress={handleDayPress} />

      <Button title="Directions to Next Class" onPress={getNextClass} />

      <Modal visible={calendarModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Select a Google Calendar:</Text>
            <FlatList
              data={calendars}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.listItem} onPress={() => handleCalendarSelection(item)}>
                  <Text>{item.title}</Text>
                </TouchableOpacity>
              )}
            />
            <Button title="Close" onPress={() => setCalendarModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <Modal visible={eventModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Events on this day:</Text>
            <FlatList
              data={selectedEvents}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.eventItem}>
                  <Text style={styles.eventTitle}>{item.title}</Text>
                  <Text>{new Date(item.startDate).toLocaleString()}</Text>
                  <Text>Location: {item.location || "No location specified"}</Text>
                </View>
              )}
            />
            <Button title="Close" onPress={() => setEventModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  eventItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  eventTitle: {
    fontWeight: "bold",
  },
});
