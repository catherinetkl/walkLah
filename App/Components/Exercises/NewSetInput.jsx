import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { gql, request } from "graphql-request";
import graphqlClient from "../../../graphqlClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ProgressGraph from "./ProgressGraph";
import { useAuth } from "../../Context/AuthContext";

const mutationDocument = gql`
  mutation MyMutation($newSet: NewSet!) {
    insertSet(
      document: $newSet
      dataSource: "Cluster1"
      database: "workouts"
      collection: "sets"
    ) {
      insertedId
    }
  }
`;

const NewSetInput = ({ exerciseName }) => {
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  const { username } = useAuth();
  const queryClient = useQueryClient();

  const { mutate, error, isError, isPending } = useMutation({
    mutationFn: (newSet) => graphqlClient.request(mutationDocument, { newSet }),
    onSuccess: () => {
      setReps("");
      setWeight("");
      queryClient.invalidateQueries({ queryKey: ["sets", exerciseName] });
    },
  });
  const addSet = () => {
    const newSet = {
      username,
      exercise: exerciseName,
      reps: Number.parseInt(reps),
    };
    if (Number.parseFloat(weight)) {
      newSet.weight = Number.parseFloat(weight);
    }
    mutate(newSet);
  };

  console.log(error);
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TextInput
          value={reps}
          onChangeText={setReps}
          placeholder="Reps"
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          value={weight}
          onChangeText={setWeight}
          placeholder="Weight"
          style={styles.input}
          keyboardType="numeric"
        />
        <Button title={isPending ? "Adding..." : "Add"} onPress={addSet} />
      </View>
      {isError && <Text style={{ color: "red" }}>Failed to add the set</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    gap: 5,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gainsboro",
    padding: 10,
    flex: 1,
    borderRadius: 5,
  },
});

export default NewSetInput;
