// ShuttleTimeRow.tsx
import { View, Text, StyleSheet } from "react-native";

type ShuttleTimeProps = {
  campusTime: string | undefined;
  minutesAway: number | null;
};

const ShuttleTimeDisplay = ({ campusTime, minutesAway }: ShuttleTimeProps) => {
  if (!campusTime) return <View style={styles.column} />;

  return (
    <View style={styles.column}>
      <Text style={styles.timeText}>
        {campusTime}
        <Text
          style={[
            styles.statusText,
            minutesAway === 0
              ? styles.departingStatus
              : minutesAway < 0
              ? styles.departedStatus
              : styles.awayStatus,
          ]}
        >
          {minutesAway === 0
            ? "  ⏳ Departing..."
            : minutesAway < 0
            ? "  ✓ Departed"
            : `  🚌 in ${Math.max(0, Math.ceil(minutesAway))} min`}
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default ShuttleTimeDisplay;
