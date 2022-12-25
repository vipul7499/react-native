import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import SplashScreen from "./src/screens/SplashScreen";
import FishProfile from "./src/screens/FishProfile";
import Test from "./src/screens/Test";
import Cam from "./src/screens/Cam";

import {
  createAppContainer,
  DrawerItems,
  SafeAreaView,
  contentOptions,
} from "react-navigation";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "react-navigation-drawer";
import Splash from "./src/screens/SplashScreen";
import HomeScreen from "./src/screens/HomeScreen";
import WeatherScreen from "./src/screens/Weather";
// import Weight from "./src/Components/weight";
import Rohit from "./src/screens/tflight";
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView style={{ justifyContent: center }}>
      <DrawerItemList />
    </DrawerContentScrollView>
  );
}

class Home extends React.Component {
  state = { splash: true };

  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        {this.state.splash ? (
          <Splash
            func={() => {
              this.setState({ splash: false });
            }}
          />
        ) : (
          <HomeScreen />
        )}
      </View>
    );
  }
}

class SettingScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Rohit></Rohit>
      </View>
    );
  }
}

class RendezVous extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <Weight></Weight> */}
        <Text>RENDEZVOUS</Text>
      </View>
    );
  }
}

class ParcoursDeSoin extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <WeatherScreen />
      </View>
    );
  }
}
class Login extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
      </View>
    );
  }
}

class APropos extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Cam></Cam>
      </View>
    );
  }
}

class Ordonnances extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Rate></Rate>
      </View>
    );
  }
}

class Profil extends React.Component {
  render() {
    return (
      <View>
        <Test></Test>
        <Text>Profil</Text>
      </View>
    );
  }
}

class Analyses extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FishProfile />
      </View>
    );
  }
}

const RouteConfigs = {
  Home: {
    screen: Home,
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (
        <Icon name="ios-home" size={20} color={tintColor} />
      ),
    },
  },

  Profile: {
    screen: Profil,
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (
        <Icon name="person" size={20} color={tintColor} />
      ),
    },
  },

  Log: {
    screen: RendezVous,
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (
        <Icon name="pencil" size={20} color={tintColor} />
      ),
    },
  },
  Weather: {
    screen: ParcoursDeSoin,
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (
        <Icon name="cloud" size={20} color={tintColor} />
      ),
    },
  },

  "Fish List": {
    screen: Analyses,
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (
        <Icon name="analytics-outline" size={20} color={tintColor} />
      ),
    },
  },
  "Rate us": {
    screen: Ordonnances,
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (
        <Icon name="heart" size={20} color={tintColor} />
      ),
    },
  },
  Help: {
    screen: APropos,
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (
        <Icon name="ios-home" size={20} color={tintColor} />
      ),
    },
  },
  Settings: {
    screen: SettingScreen,
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (
        <Icon name="ios-settings" size={20} color={tintColor} />
      ),
    },
  },
};

const DrawerNavigatorConfig = {
  intialRouteName: "Home",
  navigationOptions: {
    headerStyle: {
      backgroundColor: "#000000",
    },
    headerTintColor: "#000000",
    headerTitleStyle: {
      color: "white",
    },
  },
  contentOptions: {
    activeTintColor: "#FFFFFF",
    inactiveTintColor: "#FFFFFF",
    activeBackgroundColor: "#00245a",
    itemsContainerStyle: {
      marginVertical: 50,
    },
    itemStyle: {
      height: 70,
    },
    iconContainerStyle: {
      opacity: 1,
    },
  },
  drawerBackgroundColor: "#0080FF",
};

const Navigator = createDrawerNavigator(RouteConfigs, DrawerNavigatorConfig);

export default createAppContainer(Navigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#0080FF",
  },
});
