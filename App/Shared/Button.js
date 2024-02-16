import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Colors from "./Colors";

const CustomButton = ({ title, onPress, color }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "raleway-bold",
    color: Colors.WHITE,
  },
});

export default CustomButton;
