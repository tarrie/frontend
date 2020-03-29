import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from "react-native";
import {StyledText} from "../StyledText";
import moment from "moment-timezone";
import {textSecondaryColor} from "react-native-calendars/src/style";
import jstz from "jstz";
import {colors, normalize} from "../../constants/styles";
import {
    MaterialIcons,
    FontAwesome,
    Ionicons,
    SimpleLineIcons,
    AntDesign,
    Feather

} from '@expo/vector-icons';
//shield - ADMIN

const ShareSaveRSVP = () => {

    return <View style={styles.container}>

        <View style={{flex:.3, flexDirection:'row'}}>
            <View style={{flexDirection: 'column',alignItems:'center',justifyContent:'center',marginRight:normalize(5)}}>
                <Feather name={'bookmark'} size={25}/>
                <StyledText size={10}>Save</StyledText>
            </View>

            <View style={{flexDirection: 'column',alignItems:'center',justifyContent:'center',marginRight:normalize(5)}}>
                <Ionicons name={'ios-checkmark-circle-outline'} size={25}/>
                <StyledText size={9}>RSVP</StyledText>
            </View>
        </View>

        <View style={{ flex:1,flexDirection:'row', justifyContent:'flex-end'}}>
            <View style={{alignSelf:'flex-end', flexDirection: 'column',alignItems:'center',justifyContent:'center', marginRight:normalize(5)}}>
                <Feather name={'share'} size={25}/>
                <StyledText size={10}>Share</StyledText>
            </View>
        </View>
    </View>
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        backgroundColor: 'rgb(248,248,248)',
        paddingVertical: 5,
        flexDirection: 'row',
    }
});


//"yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
ShareSaveRSVP.defaultProps = {};


export default ShareSaveRSVP;