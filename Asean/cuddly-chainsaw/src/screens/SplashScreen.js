import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";

const Splash = (props) => {
  console.log(props);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0080FF" />
      <TouchableOpacity
        onPress={() => {
          props.func();
        }}
      >
        <Image
          source={require("../../assets/adaptive-icon.png")}
          style={{ width: 300, height: 300 }}
        />
      </TouchableOpacity>
      <Text style={styles.welcome}>Project Fisheye</Text>
      <Text style={styles.instructions}>Press on the fish to continue!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0080FF",
  },
  welcome: {
    fontSize: 33,
    fontFamily: "monospace",
    textAlign: "center",
    margin: 20,
    color: "#FFFFFF",
  },
  instructions: {
    textAlign: "center",
    color: "#F5FCFF",
    marginBottom: 5,
  },
});

export default Splash;
