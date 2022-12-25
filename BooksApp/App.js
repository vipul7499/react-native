import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { BookDetail } from "./screens/";
import Tabs from "./navigation/tabs";
import Profile from "./screens/Profile";
import Profile1 from "./screens/Profile1";
import ListUsers from "./screens/ListUsers";
import AddBook from "./screens/AddBook";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./screens/Reducers";
import thunk from "redux-thunk";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: "transparent",
  },
};

const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducers, applyMiddleware(thunk))}>
        <NavigationContainer theme={theme}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName={"Home"}
          >
            {/* Tabs */}
            <Stack.Screen name="Home" component={Tabs} />

            {/* Screens */}
            <Stack.Screen
              name="BookDetail"
              component={BookDetail}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddBook"
              component={AddBook}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Profile1"
              component={Profile1}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ListUsers"
              component={ListUsers}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
