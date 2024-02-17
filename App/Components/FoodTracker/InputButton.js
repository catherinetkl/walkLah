import { PixelRatio, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function InputButton({ onPress, buttonText, backgroundColor }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        backgroundColor
          ? { backgroundColor: backgroundColor }
          : { backgroundColor: "#3399FF" },
      ]}
      title="Set New Limit"
      color="white"
      onPress={() => onPress()}
    >
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 20 * PixelRatio.getFontScale(),
    marginTop: 15 * PixelRatio.getFontScale(),
    padding: 10 * PixelRatio.getFontScale(),
  },
  buttonText: {
    color: "white",
    fontSize: 15 * PixelRatio.getFontScale(),
  },
});
