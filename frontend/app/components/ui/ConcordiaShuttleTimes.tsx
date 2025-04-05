import { View, Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { loyolaSchedule, sgwSchedule } from "../../data/shuttleSchedules";
import ShuttleTimesDisplay from "../ui/ShuttleTimesDisplay.tsx";

//takes the time as String and returns a number of minutes
export const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  // Check if the time is invalid (hours must be between 0-23, minutes between 0-59)
  if (
    isNaN(hours) ||
    isNaN(minutes) ||
    hours < 0 ||
    hours >= 24 ||
    minutes < 0 ||
    minutes >= 60
  ) {
    return NaN;
  }

  return hours * 60 + minutes;
};

// Converting the current time to minutes for accurate shuttle departure calculations. returns the current time in minutes
export const getCurrentTimeInMinutes = (): number => {
  return timeToMinutes(
    new Date().toLocaleTimeString("en-US", { hour12: false })
  );
};

//Format time for display
export const formatTime = (minutes: number): string => {
  const hours =
    minutes >= 1440
      ? Math.floor((minutes - 1440) / 60)
      : Math.floor(minutes / 60);
  const mins =
    minutes >= 1440
      ? Math.floor((minutes - 1440) % 60)
      : Math.floor(minutes % 60);
  return `${hours}:${mins.toString().padStart(2, "0")}`;
};

//getnextDepartures filters out the next 3 departures from the list of departure for both campus
export const getNextDepartures = (currentMinutes: number) => {
  const upcomingLoyola = loyolaSchedule
    .filter((time) => {
      const timeInMinutes = timeToMinutes(time);
      return timeInMinutes > currentMinutes - 1;
    })
    // Display only the next 3 shuttle times as per design choice to avoid cluttering the UI
    .slice(0, 3);

  const upcomingSGW = sgwSchedule
    .filter((time) => {
      const timeInMinutes = timeToMinutes(time);
      return timeInMinutes > currentMinutes - 1;
    })
    .slice(0, 3);
  return { loyola: upcomingLoyola, sgw: upcomingSGW };
};

export default function ConcordiaShuttleTimes() {
  const [currentTime, setCurrentTime] = useState(getCurrentTimeInMinutes()); //Get the current time from the devie in minutes
  const [departures, setDepartures] = useState(getNextDepartures(currentTime)); //departures array containing the next 3 based on current time.

  //updates current time and departures every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const newCurrentTime = getCurrentTimeInMinutes();
      setCurrentTime(newCurrentTime);
      setDepartures(getNextDepartures(newCurrentTime));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.timecontainer}>
      <Text style={styles.title}>Bus Shuttle Departure Times</Text>
      <Text style={styles.currentTime}>
        Current Time: {formatTime(currentTime)}
      </Text>

      <View style={styles.headerRow}>
        <Text style={styles.headerText}>LOYOLA CAMPUS</Text>
        <Text style={styles.headerText}>SGW CAMPUS</Text>
      </View>

      {[
        ...Array(Math.max(departures.loyola.length, departures.sgw.length)),
      ].map((_, index) => {
        const loyTime = departures.loyola[index];
        const sgwTime = departures.sgw[index];
        const loyMinutesAway = loyTime
          ? timeToMinutes(loyTime) - currentTime
          : null;
        const sgwMinutesAway = sgwTime
          ? timeToMinutes(sgwTime) - currentTime
          : null;

        return (
          <View key={index} style={styles.row}>
            <ShuttleTimesDisplay
              campusTime={loyTime}
              minutesAway={loyMinutesAway}
            />
            <ShuttleTimesDisplay
              campusTime={sgwTime}
              minutesAway={sgwMinutesAway}
            />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  timecontainer: {
    backgroundColor: "rgba(145, 35, 55, 0.99)",
    width: "100%",
    maxHeight: "37%",
    padding: 15,
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
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 8,
    paddingHorizontal: 20,
  },
  column: {
    flex: 1,
    alignItems: "center",
  },
  timeText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    minWidth: 150,
    flexDirection: "row",
    justifyContent: "center",
  },
  statusText: {
    fontSize: 14,
    marginLeft: 8,
    textAlign: "left",
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
    color: "white", // Light blue for minutes away
  },
});
