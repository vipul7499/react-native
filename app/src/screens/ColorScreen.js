import React, { useState } from 'react';
import { View, StyleSheet, Button, FlatList } from 'react-native';

const ColorScreen = () => {
  const [color,setcolor] = useState([]);
  console.log(color);
  return (
    
    <View>
      <Button title="add color" onPress = {()=>{
        setcolor([...color,randomRgb()]);
      }}></Button>

      <FlatList
        data={color}
        renderItem={({item}) => {
          return (
          <View style={{ height: 100, width: 100, backgroundColor: item }}></View>);
        }}
        >
        </FlatList>
        <View style={{ height: 100, width: 100, backgroundColor: "rgb(0,1,0)" }}></View>
    </View>
  );
};

const randomRgb = () => {
  const red = Math.floor(Math.random()*255);
  const green = Math.floor(Math.random()*255);
  const blue = Math.floor(Math.random()*255);

  return `rgb(${red}, ${green}, ${blue})`;
};

const styles = StyleSheet.create({});

export default ColorScreen;
