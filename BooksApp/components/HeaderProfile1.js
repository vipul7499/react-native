import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from '@react-navigation/native';

import { COLORS, FONTS, SIZES } from "../constants";

import { Avatar } from "react-native-elements";

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
          <Text style={{ ...FONTS.h2, color: COLORS.white }}> Profile</Text>
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
