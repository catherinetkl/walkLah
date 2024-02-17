import { useState } from "react";
import {
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Equation({ limit, added }) {
  const [displayIndex, setDisplayIndex] = useState(0);
  const placeholders = ["Limit", "Consumed", "Burned", "Remaining"];

  const getCalories = (type) => {
    let value = 0;
    if (added) {
      for (let i = 0; i < added.length; i++) {
        if (added[i].type === type) {
          value += added[i].servings * added[i].caloriesPerServing;
        }
      }
    }
    return value;
  };

  const getRemaining = (limit) => {
    let remaining = 0;
    if (added) {
      for (let i = 0; i < added.length; i++) {
        if (added[i].type === placeholders[1]) {
          remaining -= added[i].servings * added[i].caloriesPerServing;
        } else {
          remaining += added[i].servings * added[i].caloriesPerServing;
        }
      }
    }
    return limit + remaining;
  };

  return (
    <View style={styles.equationWrapper}>
      <View>
        <Text style={styles.equationText}>Remaining</Text>
        <Text style={styles.equationText}>Consumed</Text>
        <Text style={styles.equationText}>Burned</Text>
        <Text style={styles.equationText}>Difference</Text>
      </View>
      <View style={styles.alignItemsRight}>
        <Text style={styles.equationText}>{getRemaining(limit)}</Text>
        <Text style={styles.equationText}>{getCalories(placeholders[1])}</Text>
        <Text style={styles.equationText}>{getCalories(placeholders[2])}</Text>
        <Text style={styles.equationText}>
          {getCalories(placeholders[1]) - getCalories(placeholders[2])}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  equationWrapper: {
    backgroundColor: "royalblue",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 13 * PixelRatio.getFontScale(),
    borderTopWidth: 1,
    borderTopColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  equationText: {
    color: "white",
    fontSize: 15 * PixelRatio.getFontScale(),
  },
  alignItemsRight: {
    alignItems: "flex-end",
  },
});
