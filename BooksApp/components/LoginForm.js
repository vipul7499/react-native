import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { COLORS, FONTS, SIZES, icons, images } from "../constants";

export default class LoginForm extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput 
          placeholder="Username" 
          autoCorrect={false}
          value={this.props.st.loginid}
          onChangeText={(text) => this.props.setst({ loginid: text })}
          style={styles.input} 
        />
        <TextInput
          placeholder="Password"
          autoCorrect={false}
          style={styles.input}
          value={this.props.st.password}
          onChangeText={(text) => this.props.setst({ password: text })}
          secureTextEntry
        />
        <TouchableOpacity style={styles.buttonContainer} onPress = {this.props.but}>
          <Text style={styles.buttontext}>Log In</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    height: 40,
    backgroundColor: COLORS.lightGray,
    marginBottom: 20,
    color: "#fff",
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  buttonContainer: {
    backgroundColor: COLORS.secondary,
    borderRadius: 100,
    paddingVertical: 15,
  },
  buttontext: {
    textAlign: "center",
    color: "white",
    justifyContent: "center",
  },
});
