import React from "react";
import {
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Swipeable } from "react-native-gesture-handler";
import Colors from "../../Shared/Colors";

let row = [];

export default function Calorie({
  index,
  title,
  calories,
  openEdit,
  removeCalorie,
  type,
}) {
  const LeftActions = () => {
    return (
      <TouchableOpacity
        style={[
          styles.action,
          { alignItems: "flex-start", backgroundColor: Colors.MAIN},
        ]}
        onPress={() => {
          openEdit();
          row[index].close();
        }}
      >
        <Text style={styles.actionText}>Edit</Text>
      </TouchableOpacity>
    );
  };

  const RightActions = () => {
    return (
      <TouchableOpacity
        style={[
          styles.action,
          { alignItems: "flex-end", backgroundColor: "red" },
        ]}
        onPress={() => {
          removeCalorie(index);
          if (row[index]) {
            row[index].close();
          }
        }}
      >
        <Text style={styles.actionText}>Remove</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.calorieContainer}>
      <Swipeable
        ref={(ref) => (row[index] = ref)}
        renderLeftActions={() => <LeftActions />}
        renderRightActions={() => <RightActions />}
        friction={0.25}
      >
        <View style={styles.calorieInfo}>
          {type === "Burned" ? (
            <>
              <Text style={[styles.red, styles.calorieFont]}>{title}</Text>
              <Text style={[styles.red, styles.calorieFont]}>-{calories}</Text>
            </>
          ) : (
            <>
              <Text style={[styles.green, styles.calorieFont]}>{title}</Text>
              <Text style={[styles.green, styles.calorieFont]}>
                +{calories}
              </Text>
            </>
          )}
        </View>
      </Swipeable>
    </View>
  );
}

const styles = StyleSheet.create({
  calorieContainer: {
    width: "98%",
    marginTop: 9 * PixelRatio.getFontScale(),
  },
  calorieInfo: {
    width: "100%",
    backgroundColor: "#99D5F3",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    padding: 10 * PixelRatio.getFontScale(),
  },
  action: {
    width: "100%",
    backgroundColor: "#F7BE7D",
    borderWidth: 1,
    justifyContent: "center",
    padding: 10 * PixelRatio.getFontScale(),
  },
  actionText: {
    color: "white",
  },
  green: {
    color: "green",
  },
  red: {
    color: "red",
  },
  calorieFont: {
    fontFamily: "raleway",
    fontSize: 15 * PixelRatio.getFontScale(),
  },
});
