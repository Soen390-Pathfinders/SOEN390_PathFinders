import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Modal, Image } from "react-native";
import React, { useState, useEffect } from "react";

// Separate schedules for Loyola and SGW
const loyolaSchedule = [
  "9:15", "9:30", "9:45", "10:00", "10:15", "10:30", "10:45", "11:00",
  "11:15", "11:30", "11:45", "12:30", "12:45", "13:00", "13:15", "13:30",
  "13:45", "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30",
  "15:45", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45", "18:00",
  "18:15"
];

const sgwSchedule = [
  "9:30", "9:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15",
  "11:30", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45",
  "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "16:00",
  "16:15", "16:45", "17:00", "17:15", "17:30", "17:45", "18:00", "18:15",
  "18:30"
];

const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const getCurrentTimeInMinutes = (): number => {
  return timeToMinutes(
    new Date().toLocaleTimeString("en-US", { hour12: false })
  );
};

const getNextDepartures = (currentMinutes: number) => {
  const upcomingLoyola = loyolaSchedule
    .filter(time => {
      const timeInMinutes = timeToMinutes(time);
      return timeInMinutes > currentMinutes - 1;
    })
    .slice(0, 3);

  const upcomingSGW = sgwSchedule
    .filter(time => {
      const timeInMinutes = timeToMinutes(time);
      return timeInMinutes > currentMinutes - 1;
    })
    .slice(0, 3);

  return { loyola: upcomingLoyola, sgw: upcomingSGW };
};

export default function ConcordiaShuttleTimes() {
  const [currentTime, setCurrentTime] = useState(getCurrentTimeInMinutes());
  const [departures, setDepartures] = useState(getNextDepartures(currentTime));
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime((prev) => prev + 1);
      setDepartures(getNextDepartures(currentTime));
    }, 30000);

    return () => clearInterval(interval);
  }, [currentTime]);

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    return `${hours}:${mins.toString().padStart(2, "0")}`;
  };

  const renderDepartureTimes = () => {
    return [...Array(Math.max(
      departures.loyola.length,
      departures.sgw.length
    ))].map((_, index) => {
      const loyTime = departures.loyola[index];
      const sgwTime = departures.sgw[index];
      const loyMinutesAway = loyTime ? timeToMinutes(loyTime) - currentTime : null;
      const sgwMinutesAway = sgwTime ? timeToMinutes(sgwTime) - currentTime : null;

      return (
        <View key={index} style={styles.row}>
          <View style={styles.column}>
            {loyTime && (
              <Text style={styles.timeText}>
                {loyTime}
                <Text style={[
                  styles.statusText,
                  loyMinutesAway === 0 ? styles.departingStatus : 
                  loyMinutesAway < 0 ? styles.departedStatus : styles.awayStatus
                ]}>
                  {loyMinutesAway === 0 
                    ? "  ⏳ Departing..."
                    : loyMinutesAway < 0 
                      ? "  ✓ Departed"
                      : `  🚌 in ${Math.max(0, Math.ceil(loyMinutesAway))} min`}
                </Text>
              </Text>
            )}
          </View>
          <View style={styles.column}>
            {sgwTime && (
              <Text style={styles.timeText}>
                {sgwTime}
                <Text style={[
                  styles.statusText,
                  sgwMinutesAway === 0 ? styles.departingStatus : 
                  sgwMinutesAway < 0 ? styles.departedStatus : styles.awayStatus
                ]}>
                  {sgwMinutesAway === 0
                    ? "  ⏳ Departing..."
                    : sgwMinutesAway < 0
                      ? "  ✓ Departed"
                      : `  🚌 in ${Math.max(0, Math.ceil(sgwMinutesAway))} min`}
                </Text>
              </Text>
            )}
          </View>
        </View>
      );
    });
  };

  return (
    
    <View>
      {/* Button to open modal */}
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Image source={require("../../../assets/images/bus-schedule.png")}
                      style={{
                        width: 27,
                        height: 27,
                      }
                    }>
          </Image>      
      </TouchableOpacity>

      {/* Modal to display departure times */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Bus Shuttle Departure Times</Text>
            <Text style={styles.modalCurrentTime}>
              Current Time: {formatTime(currentTime)}
            </Text>

            <View style={styles.headerRow}>
              <Text style={styles.headerText}>LOYOLA CAMPUS</Text>
              <Text style={styles.headerText}>SGW CAMPUS</Text>
            </View>

            {renderDepartureTimes()}

            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    backgroundColor: "rgba(255, 255, 255, 0.99)",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 15,
    paddingBottom: 80, // Extra padding to avoid overlap with the button
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  currentTime: {
    color: "white", 
    fontSize: 16,
    textAlign: "center",
    marginBottom: 15,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  buttonText: {
    color: "rgba(145, 35, 55, 0.99)",
    fontSize: 16,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalView: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalCurrentTime: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  headerText: {
    color: "black", // Changed to black for modal
    fontSize: 14,
    fontWeight: "bold",
    flex: 1,
    textAlign: 'center',
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 8,
    paddingHorizontal: 20,
  },
  column: {
    flex: 1,
    alignItems: 'center',
  },
  timeText: {
    color: "black", // Changed to black for modal
    fontSize: 14,
    fontWeight: "500",
    textAlign: 'center',
    minWidth: 150,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  statusText: {
    fontSize: 14,
    marginLeft: 8,
    textAlign: 'left',
    flex: 1,
  },
  departingStatus: {
    color: "#ffd700", // Gold color for departing
    fontWeight: "bold",
  },
  departedStatus: {
    color: "#48bb78", // Green color for departed
    fontWeight: "bold",
  },
  awayStatus: {
    color: "black", // Changed to black for modal
  },
});