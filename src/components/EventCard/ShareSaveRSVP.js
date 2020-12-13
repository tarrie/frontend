import React, {useEffect, useState} from 'react';
import {View, StyleSheet,TouchableOpacity} from "react-native";
import {StyledText} from "../StyledText";
import {colors, normalize, SCREEN_HEIGHT} from "@constants/styles";
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
            <TouchableOpacity style={{flexDirection: 'column',alignItems:'center',justifyContent:'center',marginRight:normalize(5)}}>
                <Feather name={'bookmark'} size={SCREEN_HEIGHT/30}/>
                <StyledText size={SCREEN_HEIGHT/90}>Save</StyledText>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection: 'column',alignItems:'center',justifyContent:'center',marginRight:normalize(5)}}>
                <Ionicons name={'ios-checkmark-circle-outline'} size={SCREEN_HEIGHT/30}/>
                <StyledText size={SCREEN_HEIGHT/90}>RSVP</StyledText>
            </TouchableOpacity>
        </View>

        <View style={{ flex:1,flexDirection:'row', justifyContent:'flex-end'}}>
            <TouchableOpacity style={{alignSelf:'flex-end', flexDirection: 'column',alignItems:'center',justifyContent:'center', marginRight:normalize(5)}}>
                <Feather name={'share'} size={SCREEN_HEIGHT/30}/>
                <StyledText size={SCREEN_HEIGHT/90}>Share</StyledText>
            </TouchableOpacity>
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