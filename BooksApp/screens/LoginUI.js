import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import { COLORS, FONTS, SIZES, icons, images } from "../constants";
import LogInForm from "../components/LoginForm";
export default class LoginUI extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
        <View
          style={{
            alignItems: "center",
            paddingVertical: SIZES.padding2,
          }}
        >
          <Text style={{ ...FONTS.h1, color: COLORS.white }}>LogIn</Text>
        </View>
        <View styles={styles.artContainer}>
          <Image source={images.otherWordsForHome} style={styles.logo} />
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.white,
              paddingVertical: 15,
              alignSelf: "center",
            }}
          >
            Find Books like this, and More!
          </Text>
        </View>
        <LogInForm 
          st = {this.props.st} 
          setst = {this.props.setst} 
          but = {this.props.but} 
          >
          </LogInForm>
          <TouchableOpacity onPress = {()=>{this.props.setst({register : true})}}>
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.white,
                alignSelf: "center",
              }}
            >
              Register a new User
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
    height: 305,
    borderRadius: 10,
    alignSelf: "center",
  },
});
