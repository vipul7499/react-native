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
          style={styles.input}
          returnKeyType="next"
          value={this.props.st.signName}
          onChangeText={(text) => this.props.setst({ signName: text })}
          onSubmitEditing={() => this.emailInput.focus()}
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          returnKeyType="next"
          keyboardType="email-address"
          ref={(input) => (this.emailInput = input)}
          value={this.props.st.signEmail}
          onChangeText={(text) => this.props.setst({ signEmail: text })}
          onSubmitEditing={() => this.phoneInput.focus()}
        />
        <TextInput
          placeholder="Phone Number"
          style={styles.input}
          returnKeyType="next"
          ref={(input) => (this.phoneInput = input)}
          value={this.props.st.signPhone}
          onChangeText={(text) => this.props.setst({ signPhone: text })}
          onSubmitEditing={() => this.passwordInput.focus()}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          returnKeyType="next"
          ref={(input) => (this.passwordInput = input)}
          value={this.props.st.signPassword}
          onChangeText={(text) => this.props.setst({ signPassword: text })}
          onSubmitEditing={() => this.confpasswordInput.focus()}
        />
        <TouchableOpacity style={styles.buttonContainer} onPress = {this.props.but} >
          <Text style={styles.buttontext}>Sign Up</Text>
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
