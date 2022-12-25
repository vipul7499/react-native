import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { COLORS, FONTS, SIZES, icons, images } from "../constants";
import RegisterForm from "../components/RegisterForm";
export default class LoginUI extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
        <View
          style={{
            alignItems: "center",
            paddingVertical: 25,
          }}
        >
          <Text style={{ ...FONTS.h1, color: COLORS.white }}>Sign Up</Text>
        </View>
        <View styles={styles.artContainer}>
          <Image source={images.otherWordsForHome} style={styles.logo} />
        </View>
        <RegisterForm 
          st = {this.props.st} 
          setst = {this.props.setst} 
          but = {this.props.but} >
        </RegisterForm>
        <TouchableOpacity onPress = {()=>{this.props.setst({register : false})}}>
          <Text
              style={{
                ...FONTS.body3,
                color: COLORS.white,
                alignSelf: "center",
              }}
            >
              Login Existing User
            </Text>
          </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  artContainer: {
    justifyContent: "center",
    flexGrow: 1,
    alignItems: "center",
  },
  logo: {
    width: 180,
    height: 240,
    borderRadius: 10,
    alignSelf: "center",
  },
});
