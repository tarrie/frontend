import React from "react"
import {StyledText} from "../../../components/StyledText";
import {View, StyleSheet, TouchableOpacity} from "react-native"
import {colors, normalize, SCREEN_HEIGHT} from "../../../constants/styles";
import {
    FontAwesome5,
    Ionicons
} from '@expo/vector-icons';

const EventTopNavBar = ({navigation}) => {

    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>

                    <View style={{
                        width: SCREEN_HEIGHT / 30,
                        height: SCREEN_HEIGHT / 30,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Ionicons name={"ios-arrow-back"} size={SCREEN_HEIGHT / 28} style={{color: '#5E6C84'}}/>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.goBack()}>

                    <View style={{
                        width: SCREEN_HEIGHT / 30,
                        height: SCREEN_HEIGHT / 30,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <FontAwesome5 name={"trash-alt"} size={SCREEN_HEIGHT / 40} style={{color: '#5E6C84'}}/>
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    )
};


//trash-2
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: normalize(5),
        width: "100%",
        justifyContent: 'flex-end',
        height: SCREEN_HEIGHT / 25,
    }
});

export default EventTopNavBar;