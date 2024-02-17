import { PixelRatio, StyleSheet, Text, View } from "react-native";
import Colors from "../../Shared/Colors";

export default function Title() {
  return (
    <View style={styles.headerWrapper}>
      <Text style={styles.headerText}>FoodTracker</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    color: Colors.BLACK,
    fontSize: 20 * PixelRatio.getFontScale(),
  },
  headerWrapper: {
    alignItems: "center",
    borderBottomWidth: 1,
    backgroundColor: Colors.MAIN,
    padding: 10 * PixelRatio.getFontScale(),
  },
});
