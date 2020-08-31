import React, {useState, useEffect} from 'react';
import {View, Button, Platform, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Collapsible from 'react-native-collapsible';
import {Calendar} from "../Calendar";
import moment from "moment";
import {StyledText} from "../StyledText";
import {colors, normalize, SCREEN_HEIGHT} from "../../constants/styles";
import {Feather} from "@expo/vector-icons";
import {Switch} from 'react-native-paper';
import jstz from "jstz";

/******************* GETS THE TIME ZONE TO DISPLAY **************/
let abbrs = {
    EST: 'Eastern Standard Time',
    EDT: 'Eastern Daylight Time',
    CST: 'Central Standard Time',
    CDT: 'Central Daylight Time',
    MST: 'Mountain Standard Time',
    MDT: 'Mountain Daylight Time',
    PST: 'Pacific Standard Time',
    PDT: 'Pacific Daylight Time',
};
// formatting for timezone -- overrides defaults
//moment.fn.zoneName = function () {
    //let abbr = this.zoneAbbr();
    //return abbrs[abbr] || abbr;
//};

const timeZone = jstz.determine().name();
const longFormattedTimeZone = moment().tz(timeZone).format('zz');



const getCalendarFormatDate = (dateString) => {
    // moment('2010-10-20T08:40'); // should parse to local time
    // moment.utc('2010-10-20T08:40'); // should parse to utc time
    const today = moment.utc(dateString);
    return {
        dateString: today.format("YYYY-MM-DD"),
        month: today.month() + 1,
        year: today.year(),
        day: today.date(),
        timestamp: today.unix()
    }
};


const getFormattedDate = (dateString) => {
    const momentDate = moment(dateString);

    if (moment().year() !== momentDate.year()) {
        return momentDate.utcOffset(0).format('dddd, MMM D, YYYY')
    }
    return momentDate.utcOffset(0).format('dddd, MMM D')
};

const type = {start:0, end:1};


const GetDate = ({datetimeChangedCallback}) => {
    const utcOffset = moment().utcOffset();
    const [dateTime, setDateTime] = useState(
        {
            start:(moment().add(utcOffset, 'm').endOf('h').add(1, 'm').toISOString()),
            end: (moment().add(utcOffset, 'm').add(1,'h').endOf('h').add(1, 'm').toISOString())
        }
    );
    const [hide, setHide] = useState(
        {start:{'datePicker': true, 'timePicker': true},end:{'datePicker': true, 'timePicker': true}});
    const [isAllDay, setIsAllDay] = useState(false);


    useEffect(() => {
        datetimeChangedCallback({dateTime:{dateTime:dateTime,isAllDay}})

    }, []);

    useEffect(() => {
        datetimeChangedCallback({dateTime:{dateTime:dateTime,isAllDay}})
    }, [hide,dateTime,isAllDay]);


    const handleTimePicker = (dateType) => {
        if (dateType === type.start){
             // hide the opposite picker's and take complement of whatever is set for timePicker
            setHide({
                end:{timePicker: true, datePicker: true},
                start: {timePicker: !hide.start.timePicker, datePicker: true}
            });

        }
        if (dateType === type.end){
             // hide the opposite picker's and take complement of whatever is set for timePicker
            setHide({
                start:{timePicker: true, datePicker: true},
                end: {timePicker: !hide.end.timePicker, datePicker: true}
            });

        }

    };

    const handleDatePicker = (dateType) => {
        if (dateType === type.start){
             // hide the opposite picker's and take complement of whatever is set for datePicker
            setHide({
                end:{timePicker: true, datePicker: true},
                start: {datePicker: !hide.start.datePicker, timePicker: true}
            });

        }
        if (dateType === type.end){
             // hide the opposite picker's and take complement of whatever is set for datePicker
            setHide({
                start:{timePicker: true, datePicker: true},
                end: {datePicker: !hide.end.datePicker, timePicker: true}
            });

        }
    };

    const allDaySwitchHandler = () => {
        if (!isAllDay) {
            if (!hide.end.timePicker){
                setHide({
                    end:{timePicker: true, datePicker: false},
                    start: {timePicker: true, datePicker: true}
                });
            }else if (!hide.start.timePicker){
                setHide({
                    end:{timePicker: true, datePicker: true},
                    start: {timePicker: true, datePicker: false}
                });
            }else if (!hide.end.datePicker) {
                // do nothing all good
            }else{
                setHide({
                    end:{timePicker: true, datePicker: true},
                    start: {timePicker: true, datePicker: false}
                });
            }
        }
        setIsAllDay(!isAllDay);
    };

    const newDayCallBack_start = (day) => {
        setDateTime({...dateTime, start: `${day.dateString}T${dateTime.start.split("T")[1]}`});

    };



    const newDayCallBack_end = (day) => {
        setDateTime({...dateTime, end: `${day.dateString}T${dateTime.end.split("T")[1]}`});
    };

    const newTimeCallBack_start = (event, selectedTime) => {

        setDateTime({...dateTime, start:`${dateTime.start.split("T")[0]}T${selectedTime.toISOString().split("T")[1]}` ||dateTime.start});
    };

    const newTimeCallBack_end = (event, selectedTime) => {
        setDateTime({...dateTime, end:`${dateTime.end.split("T")[0]}T${selectedTime.toISOString().split("T")[1]}` ||dateTime.end} );
    };

    /**
    useEffect(() => {
        setSelectedDay(generateToday());
        return () => clearTimeout(hasDayEndedTimeOut);
    }, []);


     * Once the day ends it makes sure the calendar reflects this, then loops over itself.

    const checkIfDayEnded = () => {
        // '2020-04-20':{selected: true,selectedColor:'orange', textColor:'pink', color:'purple'}
        const msTillEndOfDay = moment().endOf('day').add(1, 'seconds').diff(moment(), 'milliseconds');
        hasDayEndedTimeOut = setTimeout(() => {
            setSelectedDay(generateToday());
        }, msTillEndOfDay);
        checkIfDayEnded();
    };
     */


    return (
        <View>

            <View style={{marginVertical: 5, borderWidth: 1}}>

                {/*The Header*/}
                <View
                    style={{flexDirection: 'row', marginVertical: 5, borderWidth: 1, alignItems: 'center', height: 60}}>
                    <Feather name={'clock'} size={25} style={{
                        marginLeft: normalize(5),
                        marginRight: normalize(15),
                        color: colors.primary.dark
                    }}/>
                    <View
                        style={{flexDirection: 'row', borderWidth: 1, width: '86%', justifyContent: 'space-between'}}>
                        <StyledText size={SCREEN_HEIGHT / 50} style={{color: colors.text.primary.light}}
                                    type={'semibold'}>
                            All-day
                        </StyledText>
                        <Switch
                            value={isAllDay}
                            onValueChange={allDaySwitchHandler}
                        />
                    </View>
                </View>

                {/*Start Date*/}
                <View style={styles.container_datetime}>
                    <TouchableWithoutFeedback onPress={()=>handleDatePicker(type.start)}>
                        <StyledText size={17} type={'semibold'} style={styles.date}>
                            {getFormattedDate(dateTime.start)}
                        </StyledText>
                    </TouchableWithoutFeedback>
                    {!isAllDay &&
                    <TouchableWithoutFeedback onPress={()=>handleTimePicker(type.start)}>
                        <StyledText size={17} type={'semibold'} style={styles.time}>
                            {moment.utc(dateTime.start).format('h:mm A')}
                        </StyledText>
                    </TouchableWithoutFeedback>}
                </View>


                <Collapsible collapsed={hide.start.timePicker}>
                    <DateTimePicker
                        testID="dateTimePicker_start"
                        timeZoneOffsetInMinutes={0}
                        value={moment(dateTime.start).toDate()}
                        mode={'time'}
                        is24Hour={true}
                        display="default"
                        onChange={newTimeCallBack_start}
                    />
                </Collapsible>
                <Collapsible collapsed={hide.start.datePicker}>
                    <Calendar newDayCallBack={newDayCallBack_start} selectedDay={getCalendarFormatDate(dateTime.start)}/>
                </Collapsible>

                {/*End Date*/}
                <View style={styles.container_datetime}>
                    <TouchableWithoutFeedback onPress={()=>handleDatePicker(type.end)}>
                        <StyledText size={17} type={'semibold'} style={styles.date}>
                            {getFormattedDate(dateTime.end)}
                        </StyledText>
                    </TouchableWithoutFeedback>
                    {!isAllDay &&
                    <TouchableWithoutFeedback onPress={()=>handleTimePicker(type.end)}>
                        <StyledText size={17} type={'semibold'}
                                    style={styles.time}>{moment.utc(dateTime.end).format('h:mm A')}</StyledText>
                    </TouchableWithoutFeedback>}
                </View>

                <Collapsible collapsed={hide.end.timePicker}>
                    <DateTimePicker
                        testID="dateTimePicker_end"
                        timeZoneOffsetInMinutes={0}
                        value={moment(dateTime.end).toDate()}
                        mode={'time'}
                        is24Hour={true}
                        display="default"
                        onChange={newTimeCallBack_end}
                    />
                </Collapsible>
                <Collapsible collapsed={hide.end.datePicker}>
                    <Calendar newDayCallBack={newDayCallBack_end} selectedDay={getCalendarFormatDate(dateTime.end)}/>
                </Collapsible>


            </View>

        </View>
    );
};


const styles = StyleSheet.create({
    container_datetime: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: normalize(40),
        marginRight: normalize(5)
    },
    date: {
        color: colors.text.primary.light
    },
    time: {
        color: colors.text.primary.light
    }
});


export default GetDate;