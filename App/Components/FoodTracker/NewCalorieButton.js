import { Text, TouchableOpacity } from "react-native";

export default function NewCalorieButton({
  onPress,
  styleButton,
  styleOperator,
  operator,
}) {
  return (
    <TouchableOpacity style={styleButton} onPress={onPress}>
      <Text style={styleOperator}>{operator}</Text>
    </TouchableOpacity>
  );
}
