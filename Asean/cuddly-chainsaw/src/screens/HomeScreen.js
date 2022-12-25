import React, { Component } from "react";
import { StyleSheet, View, Alert, Button } from "react-native";

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        
        <Button
          title="Log"
          accessibilityLabel="Learn more about this purple button"
          onPress={() => Alert.alert("Log Karle Rohit")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
  },
});

export default HomeScreen;
