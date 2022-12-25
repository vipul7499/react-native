import React, { Component } from "react";
import { View, StyleSheet, Image, Button, Text, SafeAreaView } from "react-native";
import firebase from "firebase";
import Profile from "./Profile";
import Spinner from "../components/Spinner";
import RegisterUI from "./RegisterUI";
import LoginUI from "./LoginUI";
class LogIn extends Component {
  state = {
    loginid: "",
    password: "",
    error: "",
    logged: false,
    loading: false,
    signName: "",
    signEmail: "",
    signPassword: "",
    signPhone: "",
    signAbout: "",
    register : false,
  };

  componentWillMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyA0DXFjSgcfkfI0XFNzcxrBgKI8abnJcQo",
        authDomain: "bookstore-7af50.firebaseapp.com",
        projectId: "bookstore-7af50",
        storageBucket: "bookstore-7af50.appspot.com",
        messagingSenderId: "892232425094",
        appId: "1:892232425094:web:74a4a4664f96e211c4bb07",
        measurementId: "G-VQXHMY0LM7",
      });
    } else {
      firebase.app();
    }
  }

  onButtonPress = () => {
    // const {email, password} = this.state;
    const email = this.state.loginid;
    const password = this.state.password;

    this.setState({ error: "", loading: true });

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ logged: true, loading: false });
      })
      .catch(() => {
        this.setState({ error: "Authentication Failed", loading: false });
      });
  };

  onSignUpButtonPress = () => {
    const name = this.state.signName;
    const email = this.state.signEmail;
    const password = this.state.signPassword;
    const phone = this.state.signPhone;
    const about = this.state.signAbout;

    const db = firebase.app().database();

    this.setState({ error: "", loading: true });

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(this.setState({ logged: true, loading: false }))
      .catch((err) => {
        this.setState({ error: "Authentication Failed", loading: false });
      });

    db.ref("/Users").push({
      name: name,
      email: email,
      password: password,
      phone: phone,
      about: about,
    });
  };

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    } else {
      return <Button title="LogIn" onPress={this.onButtonPress.bind(this)} />;
    }
  }

  signrenderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    } else {
      return (
        <Button title="Sign Up" onPress={this.onSignUpButtonPress.bind(this)} />
      );
    }
  }

  renderContent() {
    if (this.state.logged) {
      var email = this.state.signEmail || this.state.loginid;
      return (
        <View style={{ flex: 1 }}>
          <Profile
            logOut={firebase.auth()}
            loggedState={this.setState.bind(this)}
            email={email}
          ></Profile>
        </View>
      );
    } else {
        if(!this.state.register)
        {
          return(
            <LoginUI 
            st = {this.state} 
            setst = {this.setState.bind(this)} 
            but={this.onButtonPress.bind(this)} >
          </LoginUI>
          )
        }
        else{
          return(<RegisterUI
            st = {this.state} 
            setst = {this.setState.bind(this)} 
            but={this.onSignUpButtonPress.bind(this)}>
              </RegisterUI>)
        }
    }
  }
  render() {
    return <View style = {{flex : 1}}>{this.renderContent()}</View>;
  }
}

const styles = StyleSheet.create({
  artContainer: {
    justifyContent: "center",
    flexGrow: 1,
    alignItems: "center",
  },
  logo: {
    width: 250,
    height: 375,
    borderRadius: 10,
    alignSelf: "center",
  },
});


export default LogIn;
