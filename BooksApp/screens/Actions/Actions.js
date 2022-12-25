import firebase from 'firebase';
// import {Actions} fro
import EmployeeFetchSucess from './types.js';

export const employeesFetch = () =>{
    // const {currentUser} = firebase.auth();
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
    return (dispatch) =>{
        // dispatch({type : 'EmployeeFetchSucess' , payload : {da:'hi'}});
        firebase.database().ref('/Users')
        .on('value', snapshot => {
            dispatch({type : 'EmployeeFetchSucess' , payload : snapshot.val()});
        })
    }
}

export const booksFetch = () =>{
    // const {currentUser} = firebase.auth();
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
    return (dispatch) =>{
        // dispatch({type : 'EmployeeFetchSucess' , payload : {da:'hi'}});
        firebase.database().ref('/Books')
        .on('value', snapshot => {
            dispatch({type : 'BookFetchSucess' , payload : snapshot.val()});
        })
    }
}