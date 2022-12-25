import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
} from "react-native";

import { COLORS, FONTS, SIZES, icons, images } from "../constants";
import HeaderProfile from "../components/HeaderProfile1";

const Home = (props) => {
  const profileData = {
    name: "Username",
  };

  
  function renderCategoryHeader() {
    return (
      <View style={{ flex: 1, paddingLeft: SIZES.padding }}>
        <View>
          <Text style={{ ...FONTS.h3, color: COLORS.white }}>
              My Books
            </Text>  
        </View> 
      </View>
    );
  }

  function renderCategoryData() {
    
    // console.log()
    const renderItem = ({ item }) => {
      return (
        <View style={{ marginVertical: SIZES.base }}>
          <View
            style={{ flex: 1, flexDirection: "row" }}
          >
            {/* Book Cover */}
            <Image
              source={images.otherWordsForHome}
              resizeMode="cover"
              style={{ width: 100, height: 150, borderRadius: 10 }}
            />

            <View style={{ flex: 1, marginLeft: SIZES.radius }}>
              {/* Book name and author */}
              <View>
                <Text
                  style={{
                    paddingRight: SIZES.padding,
                    ...FONTS.h3,
                    color: COLORS.white,
                  }}
                >
                  {item.bookName}
                </Text>
                <Text style={{ ...FONTS.h3, color: COLORS.lightGray }}>
                  {item.author}
                </Text>
              </View>

              {/* Book Info */}
              <View style={{ flexDirection: "row", marginTop: SIZES.radius }}>
                <Image
                  source={icons.page_filled_icon}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.lightGray,
                  }}
                />
                <Text
                  style={{
                    ...FONTS.body4,
                    color: COLORS.lightGray,
                    paddingHorizontal: SIZES.radius,
                  }}
                >
                  {item.pageNo}
                </Text>
              </View>

              {/* Genre */}
              <View style={{ flexDirection: "row", marginTop: SIZES.base }}>
                
                {item.genre[0] && (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      padding: SIZES.base,
                      marginRight: SIZES.base,
                      backgroundColor: COLORS.darkGreen,
                      height: 40,
                      borderRadius: SIZES.radius,
                    }}
                  >
                    <Text style={{ ...FONTS.body4, color: COLORS.lightGreen }}>
                      {item.genre[0]}
                    </Text>
                  </View>
                )}
                {item.genre[1] && (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      padding: SIZES.base,
                      marginRight: SIZES.base,
                      backgroundColor: COLORS.darkRed,
                      height: 40,
                      borderRadius: SIZES.radius,
                    }}
                  >
                    <Text style={{ ...FONTS.body4, color: COLORS.lightRed }}>
                      {item.genre[1]}
                    </Text>
                  </View>
                )}
                {item.genre[2] && (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      padding: SIZES.base,
                      marginRight: SIZES.base,
                      backgroundColor: COLORS.darkBlue,
                      height: 40,
                      borderRadius: SIZES.radius,
                    }}
                  >
                    <Text style={{ ...FONTS.body4, color: COLORS.lightBlue }}>
                      {item.genre[2]}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      );
    };

    return (
      <View
        style={{ flex: 1, marginTop: SIZES.radius, paddingLeft: SIZES.padding }}
      >
        <FlatList
          data={props.book}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
      {/* Header Section */}
      <View style={{ height: 275 }}>
        <HeaderProfile data = {props.data} 
          />
      </View>
      {/*Search */}
      {/* Body Section */}
      <ScrollView style={{ marginTop: SIZES.radius }}>
        {/* Categories Section */}
        <View style={{ marginTop: SIZES.padding }}>
          <View>{renderCategoryHeader()}</View>
          <View>{renderCategoryData()}</View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
