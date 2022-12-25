import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Assets } from "react-navigation-stack";
import MapView, { Heatmap, PROVIDER_GOOGLE } from "react-native-maps";
import Heatmapy from "./Heatmapy";

// import { StackedAreaChart } from "react-native-svg-charts";
// import * as shape from "d3-shape";

//

// class StackedAreaExample extends React.PureComponent {
//   render() {
//     const data = [
//       {
//         month: new Date(2015, 0, 1),
//         apples: 3840,
//         bananas: 1920,
//         cherries: 960,
//         dates: 400,
//       },
//       {
//         month: new Date(2015, 1, 1),
//         apples: 1600,
//         bananas: 1440,
//         cherries: 960,
//         dates: 400,
//       },
//       {
//         month: new Date(2015, 2, 1),
//         apples: 640,
//         bananas: 960,
//         cherries: 3640,
//         dates: 400,
//       },
//       {
//         month: new Date(2015, 3, 1),
//         apples: 3320,
//         bananas: 480,
//         cherries: 640,
//         dates: 400,
//       },
//     ];

//     const colors = ["#084c58", "#0e8bab", "#56abbb", "#d8d8d8"];
//     const keys = ["apples", "bananas", "cherries", "dates"];
//     const svgs = [
//       { onPress: () => console.log("apples") },
//       { onPress: () => console.log("bananas") },
//       { onPress: () => console.log("cherries") },
//       { onPress: () => console.log("dates") },
//     ];

//     return (
//       <StackedAreaChart
//         style={{ height: 200, paddingVertical: 16 }}
//         data={data}
//         keys={keys}
//         colors={colors}
//         curve={shape.curveNatural}
//         showGrid={false}
//         svgs={svgs}
//       />
//     );
//   }
// }

//
const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleBar}></View>

        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image
              source={require("../../assets/icon.png")}
              style={styles.image}
              resizeMode="center"
            ></Image>
          </View>
          {/* <View style={styles.dm}>
            <MaterialIcons
              name="chat"
              size={18}
              color="#DFD8C8"
            ></MaterialIcons>
          </View> */}
          {/* <View style={styles.active}></View>
          <View style={styles.add}>
            <Ionicons
              name="ios-add"
              size={48}
              color="#DFD8C8"
              style={{ marginTop: 6, marginLeft: 2 }}
            ></Ionicons>
          </View> */}
        </View>

        <View style={styles.infoContainer}>
          <Text
            style={[
              styles.text,
              { color: "#FFFFFF", fontWeight: "200", fontSize: 25 },
            ]}
          >
            Dark banded Fusilier
          </Text>
          <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>
            lorem ipsum/lorem ipsum
          </Text>
        </View>

        {/* <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <Text style={[styles.text, { fontSize: 24 }]}>483</Text>
            <Text style={[styles.text, styles.subText]}>Posts</Text>
          </View>
          <View
            style={[
              styles.statsBox,
              {
                borderColor: "#DFD8C8",
                borderLeftWidth: 1,
                borderRightWidth: 1,
              },
            ]}
          >
            <Text style={[styles.text, { fontSize: 24 }]}>45,844</Text>
            <Text style={[styles.text, styles.subText]}>Followers</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={[styles.text, { fontSize: 24 }]}>302</Text>
            <Text style={[styles.text, styles.subText]}>Following</Text>
          </View>
        </View> */}

        <View style={{ marginTop: 32 }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.mediaImageContainer}>
              <Image
                source={require("../../assets/icon.png")}
                style={styles.image}
                resizeMode="cover"
              ></Image>
            </View>
            <View style={styles.mediaImageContainer}>
              <Image
                source={require("../../assets/icon.png")}
                style={styles.image}
                resizeMode="cover"
              ></Image>
            </View>
            <View style={styles.mediaImageContainer}>
              <Image
                source={require("../../assets/icon.png")}
                style={styles.image}
                resizeMode="cover"
              ></Image>
            </View>
          </ScrollView>
          {/* <View style={styles.mediaCount}>
            <Text
              style={[
                styles.text,
                { fontSize: 24, color: "#DFD8C8", fontWeight: "300" },
              ]}
            >
              70
            </Text>
            <Text
              style={[
                styles.text,
                { fontSize: 12, color: "#DFD8C8", textTransform: "uppercase" },
              ]}
            >
              Media
            </Text>
          </View> */}
        </View>
        <View
          style={{
            marginTop: 30,
            marginLeft: 20,
            marginRight: 20,
            borderBottomColor: "white",
            borderBottomWidth: 1,
            opacity: 0.5,
          }}
        ></View>
        <Text style={[styles.BasicInfo, styles.recent]}>Basic Information</Text>
        <View style={{ alignItems: "center" }}>
          {/* <View style={styles.recentItem}>
            <View style={styles.activityIndicator}></View>
            <View style={{ width: 250 }}>
              <Text
                style={[styles.text, { color: "#41444B", fontWeight: "300" }]}
              >
                Started following{" "}
                <Text style={{ fontWeight: "400" }}>Jake Challeahe</Text> and{" "}
                <Text style={{ fontWeight: "400" }}>Luis Poteer</Text>
              </Text>
            </View>
          </View>

          <View style={styles.recentItem}>
            <View style={styles.activityIndicator}></View>
            <View style={{ width: 250 }}>
              <Text
                style={[styles.text, { color: "#41444B", fontWeight: "300" }]}
              >
                Started following{" "}
                <Text style={{ fontWeight: "400" }}>Luke Harper</Text>
              </Text>
            </View>
          </View> */}

          <View style={{ width: 350, marginTop: 10 }}>
            <Text
              style={[
                styles.text,
                { color: "#ffffff", fontWeight: "300", lineHeight: 22 },
              ]}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </Text>
            <View
              style={{
                marginTop: 30,
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 30,
                borderBottomColor: "white",
                borderBottomWidth: 1,
                opacity: 0.5,
              }}
            ></View>
            <View style={{ height: 400, marginBottom: 30 }}>
              {/* <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                }}
              ></MapView> */}
              <Heatmapy></Heatmapy>
            </View>
            <View
              style={{
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 30,
                borderBottomColor: "white",
                borderBottomWidth: 1,
                opacity: 0.5,
              }}
            ></View>
            <Text
              style={{
                color: "white",
                fontSize: 18,
                marginLeft: 15,
                marginBottom: 10,
              }}
            >
              Species Graph
            </Text>
            <View style={{ marginTop: 20, marginBottom: 20 }}>
              {/* <StackedAreaExample></StackedAreaExample> */}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0080FF",
  },
  text: {
    color: "#52575D",
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
    marginHorizontal: 16,
  },
  subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
  },
  dm: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    backgroundColor: "#34FFB9",
    position: "absolute",
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16,
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32,
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
  },
  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10,
  },
  mediaCount: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: "50%",
    marginTop: -50,
    marginLeft: 30,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    shadowColor: "rgba(0, 0, 0, 0.38)",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 1,
  },
  recent: {
    marginLeft: 30,
    marginTop: 32,
    marginBottom: 6,
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  activityIndicator: {
    backgroundColor: "#CABFAB",
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20,
  },
  BasicInfo: {
    color: "#ffffff",
    fontSize: 18,
  },
  containers: {
    height: 100,
    width: 350,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFill,
  },
});

export default HomeScreen;
