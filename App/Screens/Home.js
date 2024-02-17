import { SearchBar } from "@rneui/themed";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { StatusBar } from "expo-status-bar";
import { gql } from "graphql-request";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import graphqlClient from "../../graphqlClient";
import ExerciseListItem from "../Components/Exercises/ExerciseListItem";
import { useAuth } from "../Context/AuthContext";

const exercisesQuery = gql`
  query exercises($muscle: String, $name: String, $offset: Int) {
    exercises(muscle: $muscle, name: $name, offset: $offset) {
      name
      muscle
      equipment
    }
  }
`;

export default function Home() {
  const [search, setSearch] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false); // State to toggle search bar visibility
  const debouncedSearchTerm = useDebounce(search.trim(), 1000);
  const { username } = useAuth();

  const { data, isLoading, error, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["exercises", debouncedSearchTerm],
      queryFn: ({ pageParam }) =>
        graphqlClient.request(exercisesQuery, {
          offset: pageParam,
          name: debouncedSearchTerm,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, pages) => pages.length * 10,
    });

  const loadMore = () => {
    if (isFetchingNextPage) {
      return;
    }
    fetchNextPage();
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const exercises = data?.pages.flatMap((page) => page.exercises);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
          <SearchBar
            platform="android"
            style={styles.searchInput}
            placeholder="Search..."
            value={search}
            onChangeText={(text) => setSearch(text)}
            hideWhenScrolling={false}
          />
      </View>
      <FlatList
        data={exercises}
        contentContainerStyle={{ gap: 5 }}
        style={{ padding: 10 }}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item }) => <ExerciseListItem item={item} />}
        onEndReachedThreshold={1}
        onEndReached={loadMore}
        contentInsetAdjustmentBehavior="automatic"
      />
      <Button title="Load More" onPress={loadMore} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f8fc",
    justifyContent: "center",
    padding: 10,
  },
});
