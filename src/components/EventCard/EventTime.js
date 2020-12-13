import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from "react-native";
import {StyledText} from "../StyledText";
import moment from "moment-timezone";
import jstz from "jstz";
import {colors, normalize,SCREEN_HEIGHT} from "@constants/styles";

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/******************* GETS THE TIME ZONE TO DISPLAY **************/
let abbrs = {
    EST: 'EST',
    EDT: 'EDT',
    CST: 'CST',
    CDT: 'CDT',
    MST: 'MST',
    MDT: 'MDT',
    PST: 'PST',
    PDT: 'PDT',
};
// formatting for timezone -- overrides defaults
moment.fn.zoneName = function () {
    let abbr = this.zoneAbbr();
    return abbrs[abbr] || abbr;
};

const timeZone = jstz.determine().name();
const longFormattedTimeZone = moment().tz(timeZone).format('zz');


const EventTime = ({loc, startTime, endTime}) => {
    const [_startTime] = useState(moment(startTime));
    const [_endTime] = useState(moment(endTime));
    let formattedDay;
    let formattedTime;


    if (!(_endTime)) {
        formattedDay = _startTime.format("ddd, MMM Do");
        formattedTime = _startTime.format("h:mm A");
    } else if (_endTime.date() === _startTime.date()) {
        formattedDay = _startTime.format("ddd, MMM Do");
        formattedTime = `${_startTime.format("h:mm A")} - ${_endTime.format("h:mm A")}`
    } else {
        formattedDay = `${_startTime.format("ddd, MMM Do")} - ${_endTime.format("ddd, MMM Do")}`
        formattedTime = `${_startTime.format("h:mm A")} - ${_endTime.format("h:mm A")}`

    }


    return <View style={styles.container}>
        <View style={{width: '25%'}}>
            <StyledText size={SCREEN_HEIGHT/45} type={'black'} >WHEN:</StyledText>
        </View>
        <View style={styles.event_DateAndTime}>
            <StyledText type={'semibold'} size={SCREEN_HEIGHT/47} style={styles.event_date} >{formattedDay}</StyledText>
            <StyledText type={'book'} size={SCREEN_HEIGHT/55} style={styles.event_time}
                        >{formattedTime} {longFormattedTimeZone}</StyledText>
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
    event_DateAndTime: {
        flexDirection: 'column',
        width: '75%'
    },
    event_date: {
        color: colors.text.primary.main
    },
    event_time: {
        color:'#686868'

    }
});


//"yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
EventTime.defaultProps = {
    loc: {
        state: 'IL',
        city: 'Chicago',
        zipCode: 60660,
        line1: '1623 W Columbia Ave',
        line2: 'Apt 2',
        locName: 'Boogo Party House'
    },
    startTime: moment().toISOString(),
    endTime: moment().add({'seconds': getRndInteger(3600 / 4, 86399)}).toISOString()
};


export default EventTime;