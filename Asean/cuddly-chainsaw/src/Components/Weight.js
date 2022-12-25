import {
  Platform,
  StyleSheet,
  View,
  Text,
  Modal,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";

const Weight = () => {
  return <View style={styles.Alert_Main_View}></View>;
};

export default Weight;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  Alert_Main_View: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#009688",
    height: 200,
    width: "90%",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 7,
  },

  Alert_Title: {
    fontSize: 25,
    color: "#fff",
    textAlign: "center",
    padding: 10,
    height: "28%",
  },

  Alert_Message: {
    fontSize: 22,
    color: "#fff",
    textAlign: "center",
    padding: 10,
    height: "42%",
  },

  buttonStyle: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  TextStyle: {
    color: "#fff",
    textAlign: "center",
    fontSize: 22,
    marginTop: -5,
  },
});
