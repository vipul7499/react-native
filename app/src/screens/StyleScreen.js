import React from 'react';
import { View, StyleSheet } from 'react-native';

const StyleScreen = () => {
  return (
    
    <View style={styles.main}>
        <View style={styles.view1}></View>
        <View style = {styles.view2p}>
            <View style={styles.view2}></View>
        </View>
        <View style={styles.view3}></View>
    </View>
  );
};

const styles = StyleSheet.create({
    main:{
        borderWidth: 3,
        height: 150,
        flexDirection:'row',
        justifyContent: 'space-between'
    },
    view1:{
        height: 100, 
        width: 100,
        backgroundColor: 'red'
    },
    view2:{
        height: 100, 
        width: 100,
        backgroundColor: 'green',
        
    },
    view2p:{
        justifyContent: 'flex-end',
    },
    view3:{
        height: 100, 
        width: 100,
        backgroundColor: 'blue',
        
    }
});

export default StyleScreen;
