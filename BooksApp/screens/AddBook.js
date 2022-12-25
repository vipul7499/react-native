import React, { Component} from 'react';
import {View, TextInput , Button, SafeAreaView, StyleSheet,} from 'react-native';
import { COLORS, FONTS, SIZES, icons, images } from "../constants";
import firebase from 'firebase';

class LogIn extends Component{

    state = {
        bookName: '',
        bookCover: images.theTinyDragon,
        rating: '',
        language: '',
        pageNo: '',
        author: '',
        strGenre : '',
        genre : [],
        description: ''
    }
    
    componentWillMount() {
        if (!firebase.apps.length) {
            firebase.initializeApp({
            apiKey: "AIzaSyA0DXFjSgcfkfI0XFNzcxrBgKI8abnJcQo",
            authDomain: "bookstore-7af50.firebaseapp.com",
            projectId: "bookstore-7af50",
            storageBucket: "bookstore-7af50.appspot.com",
            messagingSenderId: "892232425094",
            appId: "1:892232425094:web:74a4a4664f96e211c4bb07",
            measurementId: "G-VQXHMY0LM7"});
        }
        else{
            firebase.app();
        }
    }

    onButtonPress(){

        // const navigation = useNavigation();

        const bookName = this.state.bookName;
        const rating = this.state.rating;
        const language =  this.state.language;
        const pageNo =  this.state.pageNo;
        const author =  this.state.author;
        const strGenre =  this.state.strGenre;
        const genre = strGenre.split(',') ;
        const description = this.state.rating;
        
        this.setState({genre : genre});

        const db = firebase.app().database();
        
        db.ref('/Books').push({
            email : this.props.route.params['email'],
            bookName : bookName,
            rating : rating,
            language : language,
            pageNo : pageNo,
            author : author,
            genre : genre,
            description : description,
        });
        this.props.navigation.pop();
    }
    render()  {
        return(
            <SafeAreaView style={styles.container}>
                {/* <Text>hi</Text> */}
                <View>
                    <TextInput 
                        placeholder="Name of the book"
                        autoCorrect={false}
                        style={styles.input} 
                        value = {this.state.loginid} 
                        onChangeText={text => this.setState({bookName : text})}
                    />
                    <TextInput 
                        placeholder="Rating"
                        autoCorrect={false}
                        style={styles.input} 
                        value = {this.state.loginid} 
                        onChangeText={text => this.setState({rating : text})}
                    />
                    <TextInput 
                        placeholder="Language"
                        autoCorrect={false}
                        style={styles.input} 
                        value = {this.state.loginid} 
                        onChangeText={text => this.setState({language : text})}
                    />
                    <TextInput 
                        placeholder="No of pages"
                        autoCorrect={false}
                        style={styles.input} 
                        value = {this.state.loginid} 
                        onChangeText={text => this.setState({pageNo : text})}
                    />
                    <TextInput 
                        placeholder="Author"
                        autoCorrect={false}
                        style={styles.input} 
                        value = {this.state.loginid} 
                        onChangeText={text => this.setState({author : text})}
                    />
                    <TextInput 
                        placeholder="Genre(Seperated by comma)"
                        autoCorrect={false}
                        style={styles.input} 
                        value = {this.state.loginid} 
                        onChangeText={text => this.setState({strGenre : text})}
                    />
                    <TextInput 
                        placeholder="Description"
                        autoCorrect={false}
                        style={styles.input} 
                        value = {this.state.loginid} 
                        onChangeText={text => this.setState({description : text})}
                    />
                    <Button title="Confirm" onPress = {this.onButtonPress.bind(this)} />
                </View>
            </SafeAreaView>
        )
    }
}

export default LogIn;

const styles = StyleSheet.create({
    container: {
         padding: 20,
         flex: 1,
         backgroundColor : "black" ,
         alignContent:"center",
         justifyContent:"center",
        },
    input: {
        height: 40,
        backgroundColor: COLORS.lightGray,
        marginBottom: 20,
        color: "#fff",
        paddingHorizontal: 10,
        borderRadius: 15,
      },
    buttontext:{
        color: "red",
        fontSize:30,
        // backgroundColor:"red",
    }
  });
  