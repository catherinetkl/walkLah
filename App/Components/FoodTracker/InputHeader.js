import {
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function InputHeader({ backPress, headerText }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={backPress}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>{headerText}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: 20 * PixelRatio.getFontScale(),
    padding: 10 * PixelRatio.getFontScale(),
    width: 80 * PixelRatio.getFontScale(),
  },
  backButtonText: {
    color: "white",
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 5 * PixelRatio.getFontScale(),
    paddingBottom: 13 * PixelRatio.getFontScale(),
  },
  headerTextContainer: {
    alignItems: "center",
    flex: 1,
  },
  headerText: {
    fontSize: 15 * PixelRatio.getFontScale(),
    color: "white",
  },
});
