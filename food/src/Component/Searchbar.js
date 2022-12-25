import React from 'react';
import {View,TextInput, StyleSheet,Image} from 'react-native';
import {Feather} from '@expo/vector-icons';

const Search =(props)=>{
    return(
        <View style={styles.bar}>
            <Feather name="search"  style={styles.search}></Feather>
            <TextInput value = {props.term} 
            onChangeText = {(newt) =>props.update(newt)}
            placeholder="Search" 
            style={{flex:1}}
            onEndEditing = {props.onPress}
            >
            </TextInput>
        </View>
    );
}

const styles = StyleSheet.create({
    bar:{
        backgroundColor:'#F0EEEE',
        height:50,
        borderRadius:20,
        marginHorizontal:10,
        flexDirection:'row',
        marginTop:10
    },
    search:{
        fontSize:35,
        alignSelf:'center',
        marginHorizontal:10
    }
});
export default Search;