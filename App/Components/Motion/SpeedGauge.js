import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Pie, Circle, Bar } from "react-native-progress";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import Colors from "../../Shared/Colors";

export default function SpeedGauge({
  currAcc,
  maxAcc,
  motion,
  runTime,
  setRunTime,
  setMaxAcc,
}) {
  const [duration, setDuration] = useState(60);
  const [input, setInput] = useState("");
  const [fontsLoaded] = useFonts({
    "raleway-bold": require("../../../assets/Fonts/Raleway-SemiBold.ttf"),
    raleway: require("../../../assets/Fonts/Raleway-Regular.ttf"),
  });
  const changeDuration = () => {
    setDuration(parseFloat(input) * 60);
  };

  useEffect(() => {
    if (duration > 0 && runTime == duration) {
      showalertWin();
    }
  }, [runTime, duration]);

  const showalertWin = () => {
    Alert.alert(
      "Walaoeh! Not bad sia ...",
      `It was very difficult, but you kept running for ${Math.floor(
        runTime / 60
      )} minutes & ${runTime % 60} seconds at the max speed of ${maxAcc.toFixed(
        2
      )} ms^-2.\n\nFantastic , keep it up and please tekan yourself everday!`,
      [
        {
          text: "Back",
          onPress: () => {
            setRunTime(0);
            setMaxAcc(0);
          },
          style: "cancel",
        },
      ]
      // {
      //   cancelable: true,
      //   onDismiss: () => Alert.alert("Good job!"),
      // }
    );
  };

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.speedcontainer}>
      <View style={styles.innercontainer}>
        <Ionicons
          style={styles.icon}
          name={
            currAcc <= 1
              ? "bed"
              : currAcc <= 5
              ? "walk"
              : currAcc <= 10
              ? "bicycle"
              : currAcc <= 15
              ? "car-sport"
              : "rocket"
          }
          color={
            currAcc <= 1
              ? "red"
              : currAcc <= 5
              ? "orange"
              : currAcc <= 10
              ? "blue"
              : currAcc <= 15
              ? "blue"
              : "green"
          }
        />
        <Text>
          {currAcc <= 1
            ? "Hello! Are you sleeping? Keep running!"
            : currAcc <= 5
            ? "You have to go faster!"
            : currAcc <= 10
            ? "Ok! Keep it up!"
            : currAcc <= 15
            ? "Eh, not bad ah, that's fast!"
            : "Awesome work!"}{" "}
        </Text>
      </View>

      <View style={styles.wordcontainer}>
        <Text style={styles.heading}>Target:</Text>
        <Text style={styles.timer}>
          {duration && duration != null
            ? Math.floor(duration / 60).toString()
            : "0"}{" "}
          m
        </Text>
        <Text style={styles.timer}>
          {duration && duration != null ? (duration % 60).toString() : "0"} s
        </Text>
        <Text style={styles.heading}>RunTime:</Text>
        <Text style={styles.timer}>
          {runTime && runTime != null
            ? Math.floor(runTime / 60).toString()
            : "0"}{" "}
          m
        </Text>
        <Text style={styles.timer}>
          {runTime && runTime != null ? (runTime % 60).toString() : "0"} s
        </Text>
      </View>

      <Bar
        animated={true}
        progress={runTime / duration}
        borderWidth={3}
        borderRadius={3}
        height={5}
        width={300}
        color={
          runTime / duration <= 0.1
            ? "rgba(255,0,0,1)"
            : runTime / duration <= 0.5
            ? "rgba(0,0,255,1)"
            : "rgba(34,139,34,1)"
        }
      />

      <View style={styles.innercontainer}>
        <Text style={styles.heading}>
          Acceleration: {Math.round(currAcc)} ms^-2
        </Text>
        <Circle
          size={125}
          progress={currAcc / 20}
          borderWidth={3}
          animated={true}
          showsText={true}
          color={
            currAcc <= 0.2
              ? "rgba(255,0,0,1)"
              : currAcc <= 10
              ? "rgba(0,0,255,1)"
              : "rgba(34,139,34,1)"
          }
        />
      </View>

      <View style={styles.innercontainer}>
        <Text style={styles.heading}>
          Max Acceleration: {Math.round(maxAcc)} ms^-2
        </Text>
        <Text>
          {maxAcc <= 1
            ? "Even a tree can outrun you"
            : maxAcc <= 5
            ? "Snail on a stroll"
            : maxAcc <= 10
            ? "Running chicken"
            : maxAcc <= 15
            ? "Cheetah on the loose"
            : "Superman"}{" "}
        </Text>
        <Pie
          size={125}
          progress={maxAcc / 20}
          borderWidth={3}
          animated={true}
          showsText={true}
          color={
            currAcc <= 0.2
              ? "rgba(255,0,0,1)"
              : currAcc <= 10
              ? "rgba(0,0,255,1)"
              : "rgba(34,139,34,1)"
          }
        />
      </View>

      <View style={styles.inputcontainer}>
        <TextInput
          style={styles.input}
          value={input}
          placeholder={"Key in runtime (min)"}
          keyboardType="numeric"
          onChangeText={(text) => setInput(text)}
        />
        <TouchableOpacity onPress={changeDuration} style={styles.button}>
          <Text style={styles.buttontext}>Set runtime(min)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  speedcontainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  innercontainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
  },
  inputcontainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  wordcontainer: {
    flex: 1,
    flexDirection: "row",
    gap: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 16,
    fontFamily: "raleway-bold",
    lineHeight: 18,
  },
  timer: {
    color: "blue",
    fontSize: 18,
    fontFamily: "raleway-bold",
  },
  icon: {
    fontSize: 80,
  },
  input: {
    height: 40,
    margin: 12,
    width: 150,
    borderWidth: 1,
    padding: 10,
    fontFamily: "raleway",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.MAIN,
    borderRadius: 5,
    padding: 5,
    height: 45,
  },
  buttontext: {
    color: Colors.BLACK,
    fontFamily: "raleway-bold",
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
});
