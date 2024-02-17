// React
import { useEffect, useState } from "react";

// React Native
import {
  ImageBackground,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

// Async Storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// Components
import AppBar from "../Components/FoodTracker/AppBar";
import Title from "../Components/FoodTracker/Title";
import Equation from "../Components/FoodTracker/Equation";
import CalorieInput from "../Components/FoodTracker/CalorieInput";
import Navbar from "../Components/FoodTracker/Navbar";
import Settings from "../Components/FoodTracker/Settings";
import Log from "../Components/FoodTracker/Log";
import PlusMinus from "../Components/FoodTracker/PlusMinus";
import foodPng from "../../assets/food.png";

// Objects
import CalorieObject from "../Objects/CalorieObject";
import LimitInput from "../Components/FoodTracker/LimitInput";

// Async Keys
const limitKey = "limit";
const addedKey = "added";

export default function FoodTracker() {
  // Async Storage
  const [limit, setLimit] = useState(0);
  const [added, setAdded] = useState([]);

  useEffect(() => {
    getData(limitKey, 0).then((data) => setLimit(data));
    getData(addedKey, []).then((data) => setAdded(data));
  }, []);

  // Add Calories
  const [input, setInput] = useState(null);
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [servings, setServings] = useState("");
  const [caloriesPerServing, setCaloriesPerServing] = useState("");
  const [openType, setOpenType] = useState(false);
  const [items, setItems] = useState([
    { label: "Consumed", value: "Consumed" },
    { label: "Burned", value: "Burned" },
  ]);

  // Edit Calories
  const [editMode, setEditMode] = useState(false);
  const [index, setIndex] = useState(null);

  // Main
  const [settings, setSettings] = useState(false);

  // Async Data Manipulation
  const getData = async (key, defaultValue) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : defaultValue;
    } catch (e) {
      console.log(e);
      return defaultValue;
    }
  };

  const setData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  // Limit Manipulation
  const setNewLimit = (value) => {
    setLimit(value);
    setData(limitKey, value);
  };

  // Calorie Manipulation
  const addCalorie = (type, title, servings, caloriesPerServing) => {
    let array = [];

    added.map((element, index) => {
      element.id = index;
      array = array.concat(element);
    });

    const newCalorie = new CalorieObject(
      array.length,
      type,
      title,
      servings,
      caloriesPerServing
    );
    array = array.concat(newCalorie);

    setAdded(added.concat(newCalorie));
    setData(addedKey, added.concat(newCalorie));
  };

  const editCalorie = (index, type, title, servings, caloriesPerServing) => {
    const editedCalorie = new CalorieObject(
      index,
      type,
      title,
      servings,
      caloriesPerServing
    );
    let array = [];

    for (let i = 0; i < added.length; i++) {
      if (i != index) {
        array.push(added[i]);
      } else {
        array.push(editedCalorie);
      }
    }

    setAdded(array);
    setData(addedKey, array);
  };

  const removeCalorie = (index) => {
    let array = [];

    for (let i = 0; i < added.length; i++) {
      if (i != index) {
        array.push(added[i]);
      }
    }

    setAdded(array);
    setData(addedKey, array);
  };

  return (
    <>
      <View>
        <AppBar />
        <Title />
      </View>
      {input ? (
        <View style={[styles.containerInput, styles.backgroundBlack]}>
          {input === "Limit" ? (
            <LimitInput
              setInput={setInput}
              setOpenType={setOpenType}
              limit={limit}
              setNewLimit={setNewLimit}
            />
          ) : (
            <CalorieInput
              setInput={setInput}
              addCalorie={addCalorie}
              editCalorie={editCalorie}
              editMode={editMode}
              index={index}
              openType={openType}
              setOpenType={setOpenType}
              type={type}
              setType={setType}
              items={items}
              setItems={setItems}
              title={title}
              servings={servings}
              caloriesPerServing={caloriesPerServing}
            />
          )}
        </View>
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.background}
          >
            {!settings ? (
              <>
                <View style={styles.center}>
                  <Text style={[styles.white, styles.header]}>
                    Calorie Tracker
                  </Text>
                </View>
                <Log
                  added={added}
                  limit={limit}
                  setEditMode={setEditMode}
                  removeCalorie={removeCalorie}
                  setIndex={setIndex}
                  setInput={setInput}
                  setType={setType}
                  setTitle={setTitle}
                  setServings={setServings}
                  setCaloriesPerServing={setCaloriesPerServing}
                />
              </>
            ) : (
              <>
                <View style={styles.center}>
                  <Text style={[styles.white, styles.header]}>Settings</Text>
                </View>
                <Settings
                  added={added}
                  setAdded={setAdded}
                  addedKey={addedKey}
                  setData={setData}
                  consumedLabel={items[0].label}
                  burnedLabel={items[1].label}
                />
              </>
            )}
          </ScrollView>
          <Equation limit={limit} added={added} />
          <PlusMinus
            setEditMode={setEditMode}
            setInput={setInput}
            setType={setType}
            setServings={setServings}
            setCaloriesPerServing={setCaloriesPerServing}
            setIndex={setIndex}
            setTitle={setTitle}
            removeCalorie={removeCalorie}
          />
          <Navbar setSettings={setSettings} />
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 5,
    resizeMode: "cover",
  },
  center: {
    alignItems: "center",
  },
  background: {
    backgroundColor: "#D8D8D8",
  },
  containerInput: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  white: {
    color: "#fff",
  },
  header: {
    color: "#f58653",
    fontFamily: "raleway",
    fontSize: 50 * PixelRatio.getFontScale(),
    marginTop: 10 * PixelRatio.getFontScale(),
  },
});
