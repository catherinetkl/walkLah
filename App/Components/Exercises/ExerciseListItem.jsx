import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text } from "react-native";
import colors from "../../Shared/Colors";
import { useFonts } from "expo-font";

export default function ExerciseListItem({ item }) {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    "raleway": require("../../../assets/Fonts/Raleway-Regular.ttf"),
    "raleway-bold": require("../../../assets/Fonts/Raleway-SemiBold.ttf"),
  });

  const onPress = () => {
    // Navigate to ExerciseDetailsScreen and pass the exercise name as a parameter
    navigation.navigate("ExerciseDetailsScreen", { name: item.name });
  };

  return (
    <Pressable style={styles.exerciseContainer} onPress={onPress}>
      <Text style={styles.exerciseName}>{item.name}</Text>
      <Text style={styles.exerciseSubtitle}>
        <Text style={styles.subValue}>{item.muscle}</Text> |
        <Text style={styles.subValue}> Equipment: {item.equipment}</Text>
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  exerciseContainer: {
    backgroundColor: colors.PRIMARY,
    padding: 10,
    borderRadius: 10,
    gap: 5,
    marginHorizontal: 2,

    // shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  exerciseName: {
    fontSize: 20,
    fontFamily: "raleway-bold",
  },
  exerciseSubtitle: {
    color: colors.WHITE,
  },
  subValue: {
    textTransform: "capitalize",
    fontFamily: "raleway",
  },
});
