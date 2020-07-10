import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {StyledText} from "../../../components/StyledText";
import {normalize, SCREEN_HEIGHT, colors, SCREEN_WIDTH} from "../../../constants/styles";
import {Octicons} from "@expo/vector-icons";


const ActualLocation = ({location, callbackFN, style }) => {



    const onPress = ()=>{
        callbackFN(location);
    };
    // marginVertical: 5 for mainscreen
    return (
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center',minHeight: 60, width:'100%', ...style}} onPress={onPress}>
            <Octicons name={'location'} size={SCREEN_WIDTH/14} style={styles.icon}/>

            <View style={styles.info_textbox}>

                <StyledText style={{color:colors.text.primary.light}} type={'bold'}>
                    {location.name}
                </StyledText>

                {'formatted_address' in location &&
                <StyledText style={{color:colors.text.primary.main}}>
                    {location.formatted_address}
                </StyledText>}
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    info_textbox: {
        width: '86%',
        minHeight: 35,
        fontFamily: 'source-sans-pro-semibold',
        color: colors.text.primary.main,
        fontSize: SCREEN_HEIGHT / 45,
        marginLeft: normalize(30)
    },
    icon:{
        left:0,
        top:15,
        position: "absolute",
        marginLeft: normalize(5),
        marginRight: normalize(15),
        color: colors.primary.dark
    }
});


export default ActualLocation;