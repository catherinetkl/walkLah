import { Ionicons } from "@expo/vector-icons";

import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function Navbar({ setSettings }) {
  return (
    <View style={styles.navbarWrapper}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setSettings(false)}
      >
        <Ionicons
          name="fast-food-outline"
          size={24}
          color="white"
          style={styles.buttonIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setSettings(true)}>
        <Ionicons
          name="settings-outline"
          size={24}
          color="white"
          style={styles.buttonIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbarWrapper: {
    backgroundColor: "black",
    borderTopWidth: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 5,
  },
  button: {
    flex: 0.5,
    alignItems: "center",
  },
  buttonIcon: {
    fontSize: 50,
  },
});
