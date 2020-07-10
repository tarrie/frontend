import React from "react"
import {TouchableOpacity, StyleSheet, View} from "react-native"
import {StyledText} from "../../../components/StyledText";
import {normalize,colors} from "../../../constants/styles";
import {
    MaterialIcons
} from '@expo/vector-icons';

const TakePictureButton = ({onPress, content}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.5}
        >
            <View style={styles.button}>
                <MaterialIcons name={'add-a-photo'} size={55} color={colors.secondary.main}/>
            </View>
        </TouchableOpacity>
    )
};

TakePictureButton.defaultProps = {
    content: "A"
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#EBECF0',
        height: 100,
        width: 100,
        borderRadius: 100 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,.7)',
        shadowOpacity: .5,
        shadowRadius: 2,
        shadowColor: '#000000',
        textShadowOffset: {width: 5, height: 2},
        textShadowRadius: 10,
        shadowOffset: {
            width: 1,            // Same rules apply from above
            height: 0,           // Can't both be 0
        }
    }
});

export default TakePictureButton