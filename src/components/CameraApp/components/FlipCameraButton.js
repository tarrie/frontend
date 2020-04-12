import React from 'react';
import {TouchableOpacity,StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {colors, sizes} from "../../../constants/styles";

const FlipCameraButton = ({cameraFlipCallBack}) => {
    return (
        <TouchableOpacity onPress={cameraFlipCallBack}>
            <Ionicons
                name="md-reverse-camera"
                color='white'
                size={45}
                style={styles.icon}
            />
        </TouchableOpacity>)
};

const styles =  StyleSheet.create({
   icon:{
        marginRight: sizes.mini.fontSize,
        shadowOpacity: .5,
        shadowRadius: 2,
       shadowColor:'#000000',
        textShadowOffset:{width: 5,height: 2},
        textShadowRadius: 10,
        shadowOffset: {
            width: 1,            // Same rules apply from above
            height: 0,           // Can't both be 0
        }
    }
});

export default FlipCameraButton;