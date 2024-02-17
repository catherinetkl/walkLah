import { StatusBar } from "expo-status-bar";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../Shared/Colors";
import { useFonts } from "expo-font";

//npm install @react-native-async-storage/async-storage

function Header() {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        paddingTop: 5,
      }}
    >
      <Image source={require("../../assets/home.png")} style={styles.home} />
      <Text style={styles.headerText}>Hello</Text>
      <Image
        source={require("../../assets/user.jpg")}
        style={styles.userImage}
      />
    </View>
  );
}
export default function Home() {
  const [calories, setCalories] = useState("");
  const [getValue, setValue] = useState(0);
  const [notes, setNotes] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fontsLoaded] = useFonts({
    raleway: require("../../assets/Fonts/Raleway-Regular.ttf"),
    "raleway-bold": require("../../assets/Fonts/Raleway-SemiBold.ttf"),
  });

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("dayValue");
      const jsonValue2 = JSON.parse(jsonValue);
      if (jsonValue2 !== null) {
        setNotes(jsonValue2);
      }
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
      console.log(notes);
    }
  };

  const storeData = async () => {
    if (!loading) {
      try {
        const jsonValue = await AsyncStorage.setItem(
          "dayValue",
          JSON.stringify(notes)
        );
        return jsonValue;
      } catch (e) {
        alert(e);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    storeData();
  }, [notes]);

  const handleAddTask = () => {
    const newNote = {
      id: Date.now(),
      getValue,
      date: Date().toLocaleString(),
    };
    setNotes([...notes, newNote]);
    setCalories("");
    closeShowDataInput();
  };

  const submitValues = () => {
    setValue(parseFloat(getValue) + parseFloat(calories));
    setCalories("");
  };

  const addWeightWorkout = () => {
    setValue(parseFloat(getValue) - 100);
  };

  const addRunWorkout = () => {
    setValue(parseFloat(getValue) - 250);
  };

  const addDanceWorkout = () => {
    setValue(parseFloat(getValue) - 300);
  };

  const addSkippingWorkout = () => {
    setValue(parseFloat(getValue) - 400);
  };

  const addSpinWorkout = () => {
    setValue(parseFloat(getValue) - 400);
  };
  const showDataInput = () => {
    setOpen(true);
  };

  const closeShowDataInput = () => {
    setOpen(false);
    setCalories("");
    setValue(0);
  };

  const removeDayValue = (note) => {
    const updateRemoveNote = notes.filter((item) => item.id !== note.id);
    console.log(updateRemoveNote);
    setNotes(updateRemoveNote);
  };

  if (open === true) {
    return (
      <View style={styles.farBackView}>
        <View style={styles.headerContainer}>
          <Header />
        </View>
        <View style={styles.container}>
          <View>
            <Text style={styles.calculatedNumber}>{getValue}</Text>
          </View>
          <TextInput
            style={styles.inputText}
            placeholder="Enter today's calories"
            value={calories}
            onChangeText={setCalories}
            keyboardType="number-pad"
          />
          <Pressable style={styles.basicButtons} onPress={submitValues}>
            <Text style={styles.submitText}>Save Calories</Text>
          </Pressable>
          <View style={styles.workoutButtonsContainer}>
            <Pressable
              style={({ pressed }) =>
                pressed
                  ? [styles.workoutButtons, styles.pressed]
                  : styles.workoutButtons
              }
              onPress={addWeightWorkout}
            >
              <View>
                <Image
                  source={require("../../assets/bench-press.png")}
                  style={{ width: 80, height: 80 }}
                />
              </View>
            </Pressable>
            <Pressable
              style={({ pressed }) =>
                pressed
                  ? [styles.workoutButtons, styles.pressed]
                  : styles.workoutButtons
              }
              onPress={addRunWorkout}
            >
              <View>
                <Image
                  source={require("../../assets/running.png")}
                  style={{ width: 80, height: 80 }}
                />
              </View>
            </Pressable>
          </View>
          <View style={styles.workoutButtonsContainer}>
            <Pressable
              style={({ pressed }) =>
                pressed
                  ? [styles.workoutButtons, styles.pressed]
                  : styles.workoutButtons
              }
              onPress={addDanceWorkout}
            >
              <View>
                <Image
                  source={require("../../assets/dancing.png")}
                  style={{ width: 80, height: 80 }}
                />
              </View>
            </Pressable>
            <Pressable
              style={({ pressed }) =>
                pressed
                  ? [styles.workoutButtons, styles.pressed]
                  : styles.workoutButtons
              }
              onPress={addRunWorkout}
            >
              <View>
                <Image
                  source={require("../../assets/soccer.png")}
                  style={{ width: 80, height: 80 }}
                />
              </View>
            </Pressable>
          </View>
          <View style={styles.workoutButtonsContainer}>
            <Pressable
              style={({ pressed }) =>
                pressed
                  ? [styles.workoutButtons, styles.pressed]
                  : styles.workoutButtons
              }
              onPress={addSkippingWorkout}
            >
              <View>
                <Image
                  source={require("../../assets/skipping-rope.png")}
                  style={{ width: 80, height: 80 }}
                />
              </View>
            </Pressable>
            <Pressable
              style={({ pressed }) =>
                pressed
                  ? [styles.workoutButtons, styles.pressed]
                  : styles.workoutButtons
              }
              onPress={addSpinWorkout}
            >
              <View>
                <Image
                  source={require("../../assets/bicycle.png")}
                  style={{ width: 80, height: 80 }}
                />
              </View>
            </Pressable>
          </View>
          <Pressable style={styles.basicButtons} onPress={handleAddTask}>
            <Text style={styles.submitText}>Submit Values</Text>
          </Pressable>
          <Pressable style={styles.basicButtons} onPress={closeShowDataInput}>
            <Text style={styles.submitText}>Close</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.farBackView}>
        <View style={styles.headerContainer}>
          <Header />
        </View>
        <View style={styles.container}>
          <Pressable style={styles.basicButtons} onPress={showDataInput}>
            <Text style={styles.submitText}>Add New Day</Text>
          </Pressable>
          <ScrollView style={styles.scrollViewStyle}>
            {notes.map((note) => (
              <Pressable
                style={styles.dataValue}
                key={`${note.id}`}
                onPress={() => removeDayValue(note)}
              >
                <View style={styles.finalCalcView}>
                  <Text style={styles.finalCalText}>Calories of the Day</Text>
                </View>
                <Text style={styles.dateText}>{note.date}</Text>
                <Text style={styles.calText}>{note.getValue}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
        <StatusBar style="light" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  home: {
    width: 80,
    height: 80,
    marginLeft: -10,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginLeft: -20,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  farBackView: {
    flex: 1,
    backgroundColor: colors.MAIN,
  },
  container: {
    paddingTop: 5,
    backgroundColor: colors.MAIN,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 20,
    marginLeft: -40,
    textAlign: "center",
    width: Dimensions.get("screen").width * 0.53,
    fontFamily: "raleway-bold",
    color: colors.BLACK,
  },
  basicButtons: {
    width: "83%",
    backgroundColor: colors.PRIMARY,
    borderRadius: 10,
    padding: 5,
    margin: 10,
  },
  submitText: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
    fontFamily: "raleway-bold",
  },
  headerContainer: {
    paddingTop: 10,
  },
  scrollViewStyle: {
    marginTop: 5,
  },
  dataValue: {
    margin: 20,
    backgroundColor: colors.DARK_GRAY,
    borderRadius: 10,
    padding: 5,
  },
  finalCalText: {
    margin: 10,
    textAlign: "center",
    fontSize: 25,
    fontFamily: "raleway-bold",
    color: colors.WHITE,
    width: 300,
  },
  dateText: {
    textAlign: "center",
    color: colors.BLACK,
    fontSize: 18,
    fontFamily: "raleway-bold",
  },
  calText: {
    textAlign: "center",
    fontSize: 25,
    fontFamily: "raleway-bold",
  },
  calculatedNumber: {
    backgroundColor: colors.GRAY,
    padding: 10,
    width: 300,
    fontSize: 50,
    textAlign: "center",
    color: colors.BLACK,
    fontFamily: "raleway-bold",
  },
  inputText: {
    fontSize: 20,
    backgroundColor: colors.GRAY,
    padding: 10,
    width: 300,
    textAlign: "center",
  },
  workoutButtonsContainer: {
    flexDirection: "row",
  },
  workoutButtons: {
    backgroundColor: colors.GRAY,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 8,
    margin: 8,
    marginHorizontal: 20,
  },
  pressed: {
    backgroundColor: colors.MAIN,
  },
  finalCalcView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 4,
  },
});
