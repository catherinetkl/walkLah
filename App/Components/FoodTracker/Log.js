import {
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Calorie from "./Calorie";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Log({
  added,
  limit,
  setEditMode,
  removeCalorie,
  setIndex,
  setInput,
  setType,
  setTitle,
  setServings,
  setCaloriesPerServing,
}) {
  const renderCalories = () => {
    return added.map((element, index) => (
      <Calorie
        key={element.id}
        index={index}
        title={element.title}
        calories={element.servings * element.caloriesPerServing}
        openEdit={() => {
          setIndex(index);
          setEditMode(true);
          setInput(element.type);
          setTitle(element.title);
          setType(element.type);
          setServings(element.servings);
          setCaloriesPerServing(element.caloriesPerServing);
        }}
        removeCalorie={removeCalorie}
        type={element.type}
      />
    ));
  };

  return (
    <View style={styles.body}>
      <TouchableOpacity
        style={styles.limitContainer}
        onPress={() => setInput("Limit")}
      >
        <Text style={styles.limitText}>Limit</Text>
        <Text style={styles.limitText}>{limit}</Text>
      </TouchableOpacity>
      <GestureHandlerRootView style={styles.alignCenter}>
        {renderCalories()}
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  white: {
    color: "white",
  },
  body: {
    padding: 10,
    paddingHorizontal: 20,
  },
  limitContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  limitText: {
    fontSize: 25 * PixelRatio.getFontScale(),
    color: "white",
  },
  alignCenter: {
    alignItems: "center",
  },
});
