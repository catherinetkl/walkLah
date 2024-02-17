import {
    ActivityIndicator,
  Alert,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../Shared/Colors";
import { useFonts } from "expo-font";

function Button({ title, onPress }) {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const confirmRemoval = (alertTitle, alertMessage, removalFunction) => {
  Alert.alert(alertTitle, "Are you sure that you want to " + alertMessage, [
    {
      text: "Cancel",
      style: "cancel",
    },
    { text: "OK", onPress: () => removalFunction() },
  ]);
};

const reset = (setAdded, addedKey, setData) => {
  setAdded([]);
  setData(addedKey, []);
};

const removeCalories = (added, setAdded, addedKey, setData, label) => {
  let array = [];

  for (let i = 0; i < added.length; i++) {
    if (added[i].type !== label) {
      array.push(added[i]);
    }
  }

  setAdded(array);
  setData(addedKey, array);
};

export default function Settings({
  added,
  setAdded,
  addedKey,
  setData,
  consumedLabel,
  burnedLabel,
}) {
  const [loaded] = useFonts({
    "raleway": require("../../../assets/Fonts/Raleway-Regular.ttf"),
  });

  if (!loaded) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <View style={styles.body}>
        <Text style={styles.limitText}>Delete Calories</Text>
        <View>
          <TouchableOpacity
            title="Delete ALL"
            onPress={() =>
              confirmRemoval("Delete ALL", "reset your calories?", () => {
                reset(setAdded, addedKey, setData);
              })
            }
          />
          <TouchableOpacity
            title="Delete CONSUMED"
            onPress={() =>
              confirmRemoval(
                "Delete CONSUMED",
                "delete all of your consumed (-) calories?",
                () => {
                  removeCalories(
                    added,
                    setAdded,
                    addedKey,
                    setData,
                    consumedLabel
                  );
                }
              )
            }
          />
          <TouchableOpacity
            title="Delete BURNED"
            onPress={() =>
              confirmRemoval(
                "Delete BURNED",
                "delete all of your burned (+) calories?",
                () => {
                  removeCalories(
                    added,
                    setAdded,
                    addedKey,
                    setData,
                    burnedLabel
                  );
                }
              )
            }
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    paddingTop: 10 * PixelRatio.getFontScale(),
    height: 55 * PixelRatio.getFontScale(),
    marginBottom: 5 * PixelRatio.getFontScale(),
  },
  button: {
    verticalAlign: "center",
    backgroundColor: Colors.PRIMARY,
    borderRadius: 40,
    width: "98%",
    height: "100%",
    justifyContent: "center",
  },
  text: {
    color: Colors.WHITE,
    fontFamily: "raleway", // Apply the "raleway" font family
    paddingLeft: 20,
    fontSize: 15 * PixelRatio.getFontScale(),
  },
  limitText: {
    fontSize: 25 * PixelRatio.getFontScale(),
    color: Colors.BLACK,
  },
  body: {
    padding: 10,
    paddingHorizontal: 20,
  },
});
