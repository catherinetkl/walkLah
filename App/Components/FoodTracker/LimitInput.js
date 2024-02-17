import React, { useEffect, useState } from "react";

import {
  PixelRatio,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";

import InputHeader from "./InputHeader";
import InputButton from "./InputButton";

export default function LimitInput({
  setInput,
  setOpenType,
  limit,
  setNewLimit,
}) {
  const [value, setValue] = useState(null);

  useEffect(() => {
    setValue(limit);
  }, [limit]);

  return (
    <>
      <InputHeader
        backPress={() => {
          setInput(null);
          setOpenType(false);
        }}
        headerText={"Set Limit"}
      />
      <TextInput
        style={styles.limitInput}
        defaultValue={limit ? limit.toString() : "0"}
        onChangeText={(text) =>
          text ? setValue(parseFloat(text)) : setValue(0)
        }
        keyboardType="number-pad"
        returnKeyType="done"
      />
      <InputButton
        onPress={() => {
          value ? setNewLimit(value) : setNewLimit(0);
          setInput(null);
        }}
        buttonText={"Set Limit"}
      />
    </>
  );
}

const styles = StyleSheet.create({
  limitInput: {
    backgroundColor: "white",
    borderWidth: 1,
    padding: 5 * PixelRatio.getFontScale(),
    width: "100%",
  },
  white: {
    color: "white",
  },
});
