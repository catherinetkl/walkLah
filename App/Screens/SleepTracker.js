import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { useFonts } from "expo-font";
import Colors from "../Shared/Colors";
import { Audio } from "expo-av";

const SleepTracker = () => {
  const [startTime, setStartTime] = useState(null);
  const [alarmTime, setAlarmTime] = useState(null);
  const [greeting, setGreeting] = useState("");
  const [sleepDuration, setSleepDuration] = useState(0);
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(
    require("../../assets/sleep.jpg")
  );
  const [fontsLoaded] = useFonts({
    raleway: require("../../assets/Fonts/Raleway-Regular.ttf"),
    "raleway-bold": require("../../assets/Fonts/Raleway-SemiBold.ttf"),
  });
  const [currentTimeColor, setCurrentTimeColor] = useState(Colors.PRIMARY);
  const [greetingTextColor, setGreetingTextColor] = useState(Colors.WHITE);
  const [toggleSleepButtonTextColor, setToggleSleepButtonTextColor] = useState(
    Colors.WHITE
  );
  const [alarmTimeValueTextColor, setAlarmTimeValueTextColor] = useState(
    Colors.PRIMARY
  );
  const [sound, setSound] = useState();

  useEffect(() => {
    (async () => {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/Sound/alarm.mp3")
      );
      setSound(sound);
    })();
  }, []);

  const showDateTimePicker = () => setIsDateTimePickerVisible(true);
  const hideDateTimePicker = () => setIsDateTimePickerVisible(false);

  const handleDatePicked = (date) => {
    setAlarmTime(date);
    hideDateTimePicker();
  };

  const handleToggleSleep = () => {
    if (startTime) {
      // Stop the alarm sound if it's playing
      if (sound) {
        sound.stopAsync();
      }

      // Calculate sleep duration
      const endTime = new Date();
      setSleepDuration(Math.floor((endTime - startTime) / (1000 * 60))); // Duration in minutes

      // Show summary
      Alert.alert(
        "Sleep Summary",
        `You have slept for ${sleepDuration} minutes. ${
          sleepDuration >= 420
            ? "Great job! You got enough sleep."
            : "You need more sleep."
        }`,
        [{ text: "OK", onPress: () => setStartTime(null) }]
      );
    } else {
      // Start tracking sleep
      setStartTime(new Date());
    }
  };

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour >= 7 && currentHour < 20) {
      setBackgroundImage(require("../../assets/wake-up.jpg"));
      setCurrentTimeColor(Colors.BLACK);
      setGreetingTextColor(Colors.BLACK);
      setToggleSleepButtonTextColor(Colors.BLACK);
      setAlarmTimeValueTextColor(Colors.BLACK);
    } else {
      setBackgroundImage(require("../../assets/sleep.jpg"));
      setCurrentTimeColor(Colors.PRIMARY);
      setGreetingTextColor(Colors.WHITE);
      setToggleSleepButtonTextColor(Colors.WHITE);
      setAlarmTimeValueTextColor(Colors.PRIMARY);
    }

    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Good morning");
    } else if (currentHour >= 12 && currentHour < 17) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }

    // Start inactivity timer
    const inactivityTimeout = setTimeout(() => {
      // Assume the user is sleeping after a certain duration of inactivity
      if (startTime) {
        handleToggleSleep();
      }
    }, 60000); // Check for inactivity every 1 minute

    return () => clearTimeout(inactivityTimeout);
  }, [startTime]);

  useEffect(() => {
    if (alarmTime && new Date().getTime() >= alarmTime.getTime()) {
      if (sound) {
        sound.replayAsync();
      }
    }
  }, [alarmTime, sound]);

  return (
    <ImageBackground
      source={backgroundImage}
      style={[styles.backgroundImage, { opacity: 0.8 }]}
    >
      <View style={styles.container}>
        <View style={styles.greetingContainer}>
          <Text style={{ ...styles.greetingText, color: greetingTextColor }}>
            {greeting}, Siti! 😄
          </Text>
        </View>
        <View style={styles.currentTimeContainer}>
          <Text style={[styles.currentTimeText, { color: currentTimeColor }]}>
            {moment().format("h:mm A")}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.alarmTimeContainer}
          onPress={showDateTimePicker}
        >
          <Text style={styles.alarmTimeText}>🔔 Set Alarm</Text>
          <Text
            style={{ ...styles.alarmTimeValue, color: alarmTimeValueTextColor }}
          >
            {alarmTime ? moment(alarmTime).format("h:mm A") : "Set Alarm"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toggleSleepButton}
          onPress={handleToggleSleep}
        >
          <Text
            style={{
              ...styles.toggleSleepButtonText,
              color: toggleSleepButtonTextColor,
            }}
          >
            {startTime ? "Stop Tracking" : "Start Tracking"}
          </Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDateTimePickerVisible}
          mode="time"
          onConfirm={handleDatePicked}
          onCancel={hideDateTimePicker}
          style={Colors.PRIMARY}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  greetingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  greetingText: {
    fontSize: 30,
    fontFamily: "raleway-bold",
    color: Colors.WHITE,
  },
  currentTimeContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  currentTimeText: {
    fontFamily: "raleway-bold",
    fontSize: 65,
    color: Colors.PRIMARY,
    textAlign: "center",
    alignSelf: "center",
  },
  alarmTimeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderTopWidth: 1,
    borderColor: "#79919D",
  },
  alarmTimeText: {
    fontSize: 25,
    color: Colors.WHITE,
    fontFamily: "raleway-bold",
  },
  alarmTimeValue: {
    fontSize: 25,
    fontFamily: "raleway-bold",
    color: Colors.PRIMARY,
    marginTop: 10,
  },
  toggleSleepButton: {
    backgroundColor: Colors.MAIN,
    padding: 15,
    borderRadius: 10,
    margin: 20,
  },
  toggleSleepButtonText: {
    fontSize: 18,
    fontFamily: "raleway-bold",
    color: Colors.WHITE,
    textAlign: "center",
  },
});

export default SleepTracker;
