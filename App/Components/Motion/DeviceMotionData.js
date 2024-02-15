import {
    ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StatusBar,
} from "react-native";

import { useFonts } from "expo-font";

export default function DeviceMotionData({
  data,
  speed,
  setSpeed,
  changeSpeed,
  currSpeed,
  handleCheck,
}) {
    const [fontsLoaded] = useFonts({
      "raleway-bold": require("../../../assets/Fonts/Raleway-SemiBold.ttf"),
      "raleway": require("../../../assets/Fonts/Raleway-Regular.ttf"),
    });
    if (!fontsLoaded) {
        return <ActivityIndicator />;
    }

  return (
    <View style={styles.outerContainer}>
      <Text style={styles.heading}>Acceleration (m/s^2)</Text>
      {data.acceleration.x && data.acceleration.x != null ? (
        <Text style={styles.text}>x: {data.acceleration.x}</Text>
      ) : null}
      {data.acceleration.y && data.acceleration.y != null ? (
        <Text style={styles.text}>y: {data.acceleration.y}</Text>
      ) : null}
      {data.acceleration.z && (data.acceleration.z != null) != null ? (
        <Text style={styles.text}>z: {data.acceleration.z}</Text>
      ) : null}

      <Text style={styles.heading}>Acceleration Including Gravity (m/s^2)</Text>
      {data.accelerationIncludingGravity.x &&
      data.accelerationIncludingGravity.x != null ? (
        <Text style={styles.text}>
          x: {data.accelerationIncludingGravity.x}
        </Text>
      ) : null}
      {data.accelerationIncludingGravity.y &&
      data.accelerationIncludingGravity.y != null ? (
        <Text style={styles.text}>
          y: {data.accelerationIncludingGravity.y}
        </Text>
      ) : null}
      {data.accelerationIncludingGravity.z &&
      data.accelerationIncludingGravity.z != null ? (
        <Text style={styles.text}>
          z: {data.accelerationIncludingGravity.z}
        </Text>
      ) : null}

      {data.interval && data.interval != null ? (
        <Text style={styles.heading}>
          Interval (s) : {data.interval / 1000}
        </Text>
      ) : null}

      {data.orientation ? (
        <Text style={styles.heading}> Orientation: {data.orientation}</Text>
      ) : null}

      <Text style={styles.heading}>Rotation</Text>
      {data.rotation.alpha && data.rotation.alpha != null ? (
        <Text style={styles.text}>alpha: {data.rotation.alpha}</Text>
      ) : null}
      {data.rotation.beta && data.rotation.beta != null ? (
        <Text style={styles.text}>beta: {data.rotation.beta}</Text>
      ) : null}
      {data.rotation.gamma && data.rotation.gamma != null ? (
        <Text style={styles.text}>gamma: {data.rotation.gamma}</Text>
      ) : null}

      <Text style={styles.heading}>Rotation Rate (deg/s)</Text>
      {data.rotationRate.alpha && data.rotationRate.alpha != null ? (
        <Text style={styles.text}>alpha: {data.rotationRate.alpha}</Text>
      ) : null}
      {data.rotationRate.beta && data.rotationRate.beta != null ? (
        <Text style={styles.text}>beta: {data.rotationRate.beta}</Text>
      ) : null}
      {data.rotationRate.gamma && data.rotationRate.gamma != null ? (
        <Text style={styles.text}>gamma: {data.rotationRate.gamma}</Text>
      ) : null}

      <View style={styles.inputContainer}>
        <Text style={styles.text}>Sensor sampling interval: {currSpeed}</Text>
        <TextInput
          style={styles.input}
          value={speed}
          keyboardType="numeric"
          onChangeText={(text) => setSpeed(text)}
          placeholder="Key sensor interval"
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleCheck} style={styles.button}>
          <Text style={{ fontFamily: "raleway" }}>Console Log</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={changeSpeed}
          style={[styles.button, styles.middleButton]}
        >
          <Text style={{ fontFamily: "raleway" }}>Update sensor interval</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  heading: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "raleway-bold",
  },
  text: {
    textAlign: "center",
    fontFamily: "raleway",
  },
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    fontFamily: "raleway",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#ccc",
    fontFamily: "raleway-bold",
  },
  input: {
    height: 40,
    margin: 12,
    width: 200,
    borderWidth: 1,
    padding: 10,
    fontFamily: "raleway",
  },
});
