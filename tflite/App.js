import React, {Component} from 'react';
    import {StyleSheet, Text, View } from 'react-native';
    import { RNCamera } from 'react-native-tflite-camera';

    export default class App extends Component {
      constructor(props) {
        super(props);
        this.state = {
          output: false
        };
      }
    processOutput({data}) {
      const confidence = parseFloat(data).toFixed(3) > 0.85
      this.setState(() => {
        output: confidence
      })
    }

      render() {
        const modelParams = {
          file: "ssd_mobilenet.tflite",
          inputDimX: 300, //Model input dimension
          inputDimY: 300, //Model input dimension
          isQuantized: false, // set to true if quantized
          freqms: 0
        };
        return (
          <View style={styles.container}>
            <RNCamera
                ref={ref => {
                    this.camera = ref;
                  }}
                style = {styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.on}
                permissionDialogTitle={'Permission to use camera'}
                permissionDialogMessage={'We need your permission to use your camera phone'}
                onModelProcessed={data => this.processOutput(data)}
                modelParams={modelParams}
            >
              <Text style={styles.cameraText}>"Hello World"</Text>
            </RNCamera>
          </View>
        );
      }
    }

 const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
      },
      preview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      cameraText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold'
      }
    });