import { ScrollView, View, Text, StyleSheet } from "react-native";
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
  return timeToMinutes("10:15"); // Test mode: Fixed at 10:15 AM
  // return timeToMinutes(
  //   new Date().toLocaleTimeString("en-US", { hour12: false })
  // );
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
  const [simulatedTime, setSimulatedTime] = useState(getCurrentTimeInMinutes());
  const [departures, setDepartures] = useState(getNextDepartures(simulatedTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setSimulatedTime((prev) => prev + 1);
      setDepartures(getNextDepartures(simulatedTime));
    }, 30000);

    return () => clearInterval(interval);
  }, [simulatedTime]);

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    return `${hours}:${mins.toString().padStart(2, "0")}`;
  };

  return (
    <ScrollView 
      style={styles.timecontainer}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Bus Shuttle Departure Times</Text>
      <Text style={styles.simulatedTime}>
        Current Time: {formatTime(simulatedTime)}
      </Text>
      
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>LOYOLA CAMPUS</Text>
        <Text style={styles.headerText}>SGW CAMPUS</Text>
      </View>

      {[...Array(Math.max(
        departures.loyola.length,
        departures.sgw.length
      ))].map((_, index) => {
        const loyTime = departures.loyola[index];
        const sgwTime = departures.sgw[index];
        const loyMinutesAway = loyTime ? timeToMinutes(loyTime) - simulatedTime : null;
        const sgwMinutesAway = sgwTime ? timeToMinutes(sgwTime) - simulatedTime : null;

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
                        : `  🚌 ${Math.max(0, Math.ceil(loyMinutesAway))} mins away`}
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
                        : `  🚌 ${Math.max(0, Math.ceil(sgwMinutesAway))} mins away`}
                  </Text>
                </Text>
              )}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  timecontainer: {
    backgroundColor: "#1a365d",
    width: "100%",
    maxHeight: "30%", // Keep the container height
  },
  contentContainer: {
    padding: 15,
    paddingBottom: 20, // Extra padding for scroll space
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  simulatedTime: {
    color: "#9fafca", // Lighter blue for secondary text
    fontSize: 16,
    textAlign: "center",
    marginBottom: 15,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#2d4a7c",
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  headerText: {
    color: "white",
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
    color: "white",
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
    color: "#9fafca", // Light blue for minutes away
  },
});
