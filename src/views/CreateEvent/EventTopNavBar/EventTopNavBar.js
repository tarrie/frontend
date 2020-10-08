import React from "react"
import {StyledText} from "../../../components/StyledText";
import {View, StyleSheet, TouchableOpacity} from "react-native"
import {colors, normalize, SCREEN_HEIGHT} from "../../../constants/styles";
import {
    FontAwesome5,
    Ionicons
} from '@expo/vector-icons';

const EventTopNavBar = ({navigation, createEventCallback}) => {

    const doneFn = () => {
        createEventCallback().then(() => {
                console.log("[EventTopNavBar.js::doneFN] createEventCallback finished");
                navigation.goBack();
            }
        )
    };

    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>

                    <View style={{
                        width: SCREEN_HEIGHT / 17,
                        height: SCREEN_HEIGHT / 30,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <StyledText type={"bold"} size={18}
                                    style={{color: colors.primary.extra_dark}}>Cancel</StyledText>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={doneFn}>

                    <View style={{
                        width: SCREEN_HEIGHT / 20,
                        height: SCREEN_HEIGHT / 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <StyledText type={"bold"} size={18} style={{color: colors.primary.extra_dark}}>Done</StyledText>
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