import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import { Calendar } from "react-native-calendars";
import * as CalendarAPI from "expo-calendar";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";

// Define Drawer Navigation Type
// This specifies the available routes for navigation
type RootDrawerParamList = {
  OutdoorDirections: { customStartLocation: string; customDestination: string };
};
type NavigationProp = DrawerNavigationProp<RootDrawerParamList>;

export default function NextClassInfo() {
  // State variables
  const [calendars, setCalendars] = useState([]); // Stores list of available Google calendars
  const [selectedCalendarId, setSelectedCalendarId] = useState(null); // Stores the selected calendar ID
  const [markedDates, setMarkedDates] = useState({}); // Stores marked dates for calendar events
  const [allEvents, setAllEvents] = useState([]); // Stores all events from the selected calendar
  const [calendarModalVisible, setCalendarModalVisible] = useState(false); // Controls visibility of calendar selection modal
  const [eventModalVisible, setEventModalVisible] = useState(false); // Controls visibility of event details modal
  const [selectedEvents, setSelectedEvents] = useState([]); // Stores events for a selected date

  const navigation = useNavigation<NavigationProp>(); // Drawer navigation

  useEffect(() => {
    getPermissions();
  }, []);

  // Request permission to access the user's calendar
  const getPermissions = async () => {
    const { status } = await CalendarAPI.requestCalendarPermissionsAsync();

    if (status === "granted") {
      fetchGoogleCalendars(); // If permission is granted, fetch calendars
    } else {
      Alert.alert("Permission Denied", "Cannot access calendar events.");
    }
  };

  // Fetch Google Calendars associated with the user's account
  const fetchGoogleCalendars = async () => {
    try {
      const allCalendars = await CalendarAPI.getCalendarsAsync(
        CalendarAPI.EntityTypes.EVENT
      );
      const googleCalendars = allCalendars.filter(
        (cal) => cal.source.type === "com.google"
      );
      if (googleCalendars.length === 0) {
        Alert.alert("No Google Calendar found!");
      } else {
        setCalendars(googleCalendars);
        setSelectedCalendarId(googleCalendars[0].id);
        fetchEvents(googleCalendars[0].id); // Fetch events from the first Google calendar
      }
    } catch (error) {
      console.error("Error fetching calendars:", error);
    }
  };

  // Fetch events from the selected Google Calendar
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
        const date = typeof event.startDate === "string" ? event.startDate.split("T")[0] : new Date(event.startDate).toISOString().split("T")[0];
        formattedEvents[date] = { marked: true, dotColor: "#808080" };
      });

      setMarkedDates(formattedEvents);
      setAllEvents(events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Handle day press on the calendar
  const handleDayPress = (day) => {
    const date = day.dateString;
    const eventsOnDate = allEvents.filter((event) => {
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

  // Handle calendar selection change
  const handleCalendarSelection = (calendar) => {
    Alert.alert(
      "Switch Calendar",
      `Do you want to switch to \"${calendar.title}\"?`,
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

  // Get the next upcoming class from the event list
  const getNextClass = () => {
    const now = new Date();
    const upcomingEvents = allEvents.filter(
      (event) => new Date(event.startDate) > now
    );

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
      `Title: ${nextEvent.title}\nTime: ${new Date(
        nextEvent.startDate
      ).toLocaleString()}\nLocation: ${nextEvent.location}`,
      [
        {
          text: "Get Directions",
          onPress: () => {
            navigation.navigate("OutdoorDirections", {
              customStartLocation: "start",
              customDestination: nextEvent.location,
            });
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Button
        title="Switch Calendar"
        onPress={() => setCalendarModalVisible(true)}
      />
      <Button
        title="Refresh Events"
        onPress={() => fetchEvents(selectedCalendarId)}
      />
      {/* Calendar Selection Modal */}
      <Modal
        visible={calendarModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Select a Google Calendar:</Text>

            <FlatList
              data={calendars}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.listItem}
                  onPress={() => handleCalendarSelection(item)}
                >
                  <Text>{item.title}</Text>
                </TouchableOpacity>
              )}
            />

            <Button
              title="Close"
              onPress={() => setCalendarModalVisible(false)}
            />
          </View>
        </View>
      </Modal>

      <Modal
        visible={eventModalVisible}
        animationType="slide"
        transparent={true}
      >
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

                  <Text>
                    Location: {item.location || "No location specified"}
                  </Text>
                </View>
              )}
            />

            <Button title="Close" onPress={() => setEventModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <Text style={styles.header}>Calendar:</Text>
      <Calendar
        markedDates={markedDates}
        markingType="dot"
        onDayPress={handleDayPress}
      />

      <Button title="Directions to Next Class" onPress={getNextClass} />
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
  }, // Add to your styles
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
