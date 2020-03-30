import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from "react-native";
import {StyledText} from "../StyledText";
import {colors, normalize, SCREEN_HEIGHT} from "../../constants/styles";



const EventLocation = ({loc}) => {


    return <View style={styles.container}>
        <View style={{width:'25%'}}>
            <StyledText size={SCREEN_HEIGHT/45} type={'black'}>WHERE:</StyledText>
        </View>
            <View style={styles.event_loc_container}>
            {'locName' in loc &&<StyledText style={{...styles.event_loc, color:colors.text.primary.main}} type={'semibold'} size={SCREEN_HEIGHT/47}>{loc.locName}</StyledText>}
            {'line1' in loc && <StyledText size={SCREEN_HEIGHT/55}  style={styles.event_loc} type={'book'}>{loc.line1}</StyledText>}
            {'line2' in loc && <StyledText size={SCREEN_HEIGHT/55}  style={styles.event_loc} type={'book'}>{loc.line2}</StyledText>}
            {'city' in loc && 'state' in loc && <StyledText size={SCREEN_HEIGHT/55}   style={styles.event_loc} type={'book'}>{`${loc.city}, ${loc.state}`}</StyledText>}
        </View>
    </View>
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
                marginLeft:normalize(5),
        marginTop:normalize(5)

    },
    event_loc_container:{
                flexDirection: 'column',
        width:'75%'
    },
    event_loc:{
        color:'#686868'
    },
    event_time:{
        color:colors.general.hot_purple

    }
});


//"yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
EventLocation.defaultProps = {
    loc: {
        state: 'IL',
        city: 'Chicago',
        zipCode: 60660,
        line1: '1623 W Columbia Ave',
        line2: 'Apt 2',
        locName: 'Boogo Party House'
    }
};


export default EventLocation;