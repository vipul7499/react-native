import React from 'react';
import {Text,View,StyleSheet,FlatList,Image} from 'react-native';

const list=(props)=>{
    console.log(props.data);
    return(
        <View>
            <Text style={styles.title}>{props.title}</Text>
            <FlatList
            horizontal
            data = {props.data}
            keyExtractor={(element)=>{
                return element.id;
            }}
            renderItem = {({item})=>{
                return(
                    <View>
                        <Text>{item.name}</Text>
                        <Image source={{uri:item.image_url}} style={styles.image}></Image>
                        <Text>{item.rating} stars, {item.review_count} Review</Text>
                    </View>)}
                }
            >    
            </FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    title:{
        fontSize:18,
    },
    image:{
        height:200,
        width:200,
        border:20
    }
})
export default list;