// ShuttleTimeDisplay.tsx
import { View, Text, StyleSheet } from "react-native";

type ShuttleTimeProps = {
  campusTime: string | undefined;
  minutesAway: number | null;
};

const getStatusInfo = (minutesAway: number | null) => {
  if (minutesAway === null) return { text: "", style: {} };

  if (minutesAway === 0) {
    return {
      text: "⏳ Departing...",
      style: styles.departingStatus,
    };
  }

  if (minutesAway < 0) {
    return {
      text: "✓ Departed",
      style: styles.departedStatus,
    };
  }

  return {
    text: `🚌 in ${Math.max(0, Math.ceil(minutesAway))} min`,
    style: styles.awayStatus,
  };
};

const ShuttleTimeDisplay = ({ campusTime, minutesAway }: ShuttleTimeProps) => {
  if (!campusTime) return <View style={styles.column} />;

  const statusInfo = getStatusInfo(minutesAway);

  return (
    <View style={styles.column}>
      <Text style={styles.timeText}>
        {campusTime}
        <Text style={[styles.statusText, statusInfo.style]}>
          {statusInfo.text && `  ${statusInfo.text}`}
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