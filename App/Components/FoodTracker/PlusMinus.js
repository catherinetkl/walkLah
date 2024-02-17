import {
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import NewCalorieButton from "./NewCalorieButton";

export default function PlusMinus({
  setEditMode,
  setInput,
  setType,
  setServings,
  setCaloriesPerServing,
  setTitle,
}) {
  const onPress = (type) => {
    setEditMode(false);
    setInput("Calories");
    setType(type);
    setTitle("");
    setServings("1");
    setCaloriesPerServing("");
  };

  return (
    <View style={styles.body}>
      <NewCalorieButton
        onPress={() => onPress("Burned")}
        styleButton={styles.redOperatorView}
        styleOperator={styles.red}
        operator="-"
      />
      <NewCalorieButton
        onPress={() => onPress("Consumed")}
        styleButton={styles.greenOperatorView}
        styleOperator={styles.green}
        operator="+"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "grey",
    justifyContent: "space-evenly",
    flexDirection: "row",
    padding: 10,
  },
  green: {
    color: "lime",
    fontSize: 40 * PixelRatio.getFontScale(),
  },
  red: {
    color: "red",
    fontSize: 40 * PixelRatio.getFontScale(),
  },
  greenOperatorView: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "lime",
    borderRadius: 10,
    width: "45%",
  },
  redOperatorView: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 10,
    width: "45%",
  },
});
