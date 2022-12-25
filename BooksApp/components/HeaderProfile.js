import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";

import { useNavigation } from '@react-navigation/native';

import { COLORS, FONTS, SIZES, icons, images } from "../constants";

import { Avatar } from "react-native-elements";
import { ShadowPropTypesIOS } from "react-native";

const LineDivider = () => {
  return (
    <View style={{ width: 1, paddingVertical: 18 }}>
      <View
        style={{
          flex: 1,
          borderLeftColor: COLORS.lightGray,
          borderLeftWidth: 1,
        }}
      ></View>
    </View>
  );
};

const HeaderProfile = (props) => {

  const navigation = useNavigation();
  console.log(navigation);
  function renderHeader() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
        }}
      >
        <View
          style={{
            borderRadius: 10,
            padding: SIZES.padding,
            height: 100,
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity onPress = {() => { 
                  props.ou1.signOut();
                  props.ou2({ logged: false });
                        }}>
            <Text style={{ ...FONTS.body4, color: COLORS.white }}> LogOut </Text>
          </TouchableOpacity >
          <Text style={{ ...FONTS.h2, color: COLORS.white }}> Profile</Text>
          <TouchableOpacity onPress={()=>{
            navigation.navigate("AddBook" , {"email" : props.data.email});
          }}>
            <Text style={{ ...FONTS.body4, color: COLORS.white }}> Add Book</Text>
          </TouchableOpacity>
          
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <View style={{ marginRight: SIZES.padding, alignItems: "center" }}>
              <Avatar
                size="large"
                title="UR"
                rounded
                overlayContainerStyle={{ backgroundColor: "grey" }}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}
              />
              <Text style={{ ...FONTS.h2, color: COLORS.white }}>
                {props.data.name}
              </Text>
              <Text style={{ ...FONTS.body4, color: COLORS.white }}>
                Phone No: {props.data.phone}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
      {/* Header Section */}
      <View>{renderHeader()}</View>
    </SafeAreaView>
  );
};

export default HeaderProfile;
