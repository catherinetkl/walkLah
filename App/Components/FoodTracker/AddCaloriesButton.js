import React from "react";
import {
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import Colors from "../../Shared/Colors";

export default function AddCaloriesButton({ add, title, onOpen }) {
  return add === true ? (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.button} onPress={onOpen}>
        <Text style={styles.text}>{title}</Text>
        <Ionicons
          name="add-circle"
          size={40 * PixelRatio.getFontScale()}
          color="white"
        />
      </TouchableOpacity>
    </View>
  ) : (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.button} onPress={onOpen}>
        <Text style={styles.text}>{title}</Text>
        <Ionicons
          name="add-circle"
          size={40 * PixelRatio.getFontScale()}
          style={styles.transparent}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "98%",
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.PRIMARY,
    borderRadius: 40,
    marginTop: 12 * PixelRatio.getFontScale(),
  },
  text: {
    alignSelf: "center",
    color: "white",
    fontSize: 15 * PixelRatio.getFontScale(),
    paddingStart: 20 * PixelRatio.getFontScale(),
  },
  transparent: {
    opacity: 0,
  },
});
