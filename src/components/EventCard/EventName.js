import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from "react-native";
import {StyledText} from "../StyledText";
import {colors, normalize,SCREEN_HEIGHT} from "../../constants/styles";
import {Avatar} from "react-native-elements";


const EventName = ({name, coordinators, imgPath}) => {

    let _coordinators;
    if (!coordinators || !coordinators.length){
        _coordinators='';
    }
    else if (coordinators.length ===2){
        _coordinators = `Coordinators: ${coordinators[0]} & ${coordinators[1]}`
    }else{
        _coordinators = "Coordinators: "+ coordinators.join(', ')
    }

    return <View style={styles.container}>
        <Avatar rounded source={{uri: imgPath}}/>
        <View style={styles.name_container}>
            <StyledText type={'semibold'} size={SCREEN_HEIGHT/40}>{name}</StyledText>
            <StyledText  size={SCREEN_HEIGHT/60} style={{color:colors.text.primary.light}}>{_coordinators}</StyledText>
        </View>
    </View>
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems:'center',
        marginLeft: normalize(10),
        height: SCREEN_HEIGHT/12
    },
    name_container:{
        flexDirection: 'column',
        marginLeft: normalize(5)
    },
    event_loc:{
        color:colors.text.primary.light
    },
    event_time:{
        color:colors.general.hot_purple

    }
});


//"yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
EventName.defaultProps = {
    name: 'Boogo Party Get Fucked',
    coordinators: ['Lala', 'Tom' ],
    imgPath:'https://picsum.photos/700'
};


export default EventName;