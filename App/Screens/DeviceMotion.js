import { DeviceMotion } from "expo-sensors";
import React, { useEffect, useRef, useState } from "react";
import {
    LogBox,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

//import components
import DeviceMotionData from "../Components/Motion/DeviceMotionData";
import Linegraph from "../Components/Motion/Linegraph";
import SpeedGauge from "../Components/Motion/SpeedGauge";

LogBox.ignoreLogs(["new NativeEventEmitter"]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function DeviceMotionScreen() {
  // const InitialDeviceMotionOrientation= Object.freeze({
  //   LeftLanodscape:-90,
  //   Portrait:0,
  //   RightLandscape:90,
  //   UpsideDown:180,
  // });

  //usestate initial condition for SDK
  const initialData = {
    acceleration: {
      x: 0,
      y: 0,
      z: 0,
    },
    accelerationIncludingGravity: {
      x: 0,
      y: 0,
      z: 0,
    },
    interval: 0,
    orientation: null,
    rotation: {
      alpha: 0,
      beta: 0,
      gamma: 0,
    },
    rotationRate: {
      alpha: 0,
      beta: 0,
      gamma: 0,
    },
  };

  //useState hooks

  //SDK operation
  const [data, setData] = useState(initialData);
  const [permission, setPermission] = useState(null);
  const [speed, setSpeed] = useState(1000);
  const [currSpeed, setCurrSpeed] = useState(1000);

  //show settings
  const [show, setShow] = useState(false);

  //data
  const [currAcc, setcurrAcc] = useState(0);
  const [maxAcc, setMaxAcc] = useState(0);
  const [motion, setMotion] = useState(false);

  //timerhooks
  const [runTime, setRunTime] = useState(0);
  const timerOneSec = useRef();
  //~ timerGraph cannot be used here due to too many signals
  // const timerGraph = useRef();

  //linechart data
  const [arrayAcc, setArrayAcc] = useState([0]);

  // SDK logics
  const getPermission = async () => {
    if (permission === null) {
      const response = await DeviceMotion.requestPermissionsAsync();
      if (response.granted === true) {
        setPermission(response.granted);
        console.log("Approved! " + response.status + " " + response.status);
      } else {
        console.log("Denied! " + response.status + " " + response.status);
      }
    }
  };

  const checkAvail = async () => {
    const avail = await DeviceMotion.isAvailableAsync();
    if (avail === false) {
      getPermission();
    }
    console.log("Device is available? " + avail);
  };

  useEffect(() => {
    getPermission();
    console.log("Device is available=" + checkAvail());
    console.log("Permissions is " + permission);
    DeviceMotion.addListener(setData);
    DeviceMotion.setUpdateInterval(speed);
  }, []);

  const changeSpeed = () => {
    DeviceMotion.setUpdateInterval(parseInt(speed));
    setCurrSpeed(speed);
  };

  const handleCheck = () => {
    console.log("Permission=" + permission);
    checkAvail();
    console.log("Check listeners=" + DeviceMotion.getListenerCount());
    console.log("Check orientation=" + data.orientation);
  };

  // app logics
  useEffect(() => {
    if (
      data.acceleration.x != null &&
      data.acceleration.y != null &&
      data.acceleration.x != null
    ) {
      const measuredAcc = Math.max(
        Math.abs(data.acceleration.x),
        Math.abs(data.acceleration.y),
        Math.abs(data.acceleration.z)
      );
      setcurrAcc(measuredAcc);
      if (measuredAcc > maxAcc) {
        setMaxAcc(measuredAcc);
      }
      if (measuredAcc <= 0.15) {
        setTimeout(() => {
          setMotion(false);
        }, 4000);
        //~ timerGraph cannot be used here due to too many signals
        // clearInterval(timerGraph.current);
      } else {
        setMotion(true);
        // console.log("measuredAcc is above 0.15 "+ measuredAcc );
        //~ timerGraph cannot be used here due to too many signals
        // timerGraph.current = setInterval(() => {
        //   console.log("measuredAcc=" + measuredAcc);
        //   setArrayAcc((array) => [...array, measuredAcc]);
        // }, 5000);
        setArrayAcc((array) => [...array, measuredAcc]);
      }
    }
    //~ timerGraph cannot be used here due to too many signals
    // return () =>
    //   clearInterval(timerGraph.current);
  }, [data.acceleration]);

  useEffect(() => {
    if (motion) {
      timerOneSec.current = setInterval(() => {
        setRunTime((time) => time + 1);
      }, 1000);
    } else {
      clearInterval(timerOneSec.current);
      setRunTime(0);
      setMaxAcc(0);
    }
    return () => clearInterval(timerOneSec.current);
  }, [motion]);

  return (
    <SafeAreaView style={styles.viewcontainer}>
      <ScrollView
        style={currAcc >= 1 ? styles.scrollViewRun : styles.scrollViewStop}
      >
        {show == true ? (
          <DeviceMotionData
            data={data}
            speed={speed}
            setSpeed={setSpeed}
            changeSpeed={changeSpeed}
            currSpeed={currSpeed}
            handleCheck={handleCheck}
          />
        ) : (
          <SpeedGauge
            currAcc={currAcc}
            maxAcc={maxAcc}
            motion={motion}
            runTime={runTime}
            setRunTime={setRunTime}
            setMaxAcc={setMaxAcc}
          />
        )}
        {!show && <Linegraph arrayAcc={arrayAcc} setArrayAcc={setArrayAcc} />}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => setShow(!show)}
            style={styles.button}
          >
            <Text style={{ fontFamily: "raleway"}}>Toggle View</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

styles = StyleSheet.create({
  viewcontainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollViewRun: {
    backgroundColor: "#abf7b1",
    borderRadius: 5,
  },
  scrollViewStop: {
    backgroundColor: "white",
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
});
