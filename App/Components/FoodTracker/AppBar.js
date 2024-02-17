import { StatusBar, StyleSheet, View } from "react-native";
import Colors from "../../Shared/Colors";
const statusBarHeight = StatusBar.currentHeight;
const appBarHeight = 22;

export default function AppBar() {
  return (
    <>
      <StatusBar backgroundColor={Colors.MAIN} translucent={true} />
      <View style={styles.appBar} />
    </>
  );
}

const styles = StyleSheet.create({
  statusbar: {
    backgroundColor: Colors.MAIN,
    height: statusBarHeight,
  },
  appBar: {
    backgroundColor: Colors.MAIN,
    height: appBarHeight,
  },
});
