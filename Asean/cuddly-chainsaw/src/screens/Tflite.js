import React from 'react';
import {View, StyleSheet} from 'react-native';
import Tflite from "tflite-react-native";
import ImagePicker from "react-native-image-picker";

let tflite = new Tflite();

const func=()=>{
    tflite.loadModel(
        {
          model: modelFile,
          labels: labelsFile,
        },
        (err, res) => {
          if (err) console.log(err);
          else console.log(res);
        }
      );
      tflite.runModelOnImage({
        path: "./images/a.jpeg",  // required
      },
      (err, res) => {
        if(err)
          console.log(err);
        else
          console.log(res);
      });
    return (
        <View>
            <Text>HI</Text>
        </View>
    );
}

export default func;