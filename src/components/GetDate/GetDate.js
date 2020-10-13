import React, {useState, useEffect} from 'react';
import {View, Button, Platform, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Collapsible from 'react-native-collapsible';
import {Calendar} from "../Calendar";
import moment from "moment";
import moment_tz from 'moment-timezone';
import {StyledText} from "../StyledText";
import {colors, normalize, SCREEN_HEIGHT} from "../../constants/styles";
import {Feather} from "@expo/vector-icons";
import {Switch} from 'react-native-paper';
import jstz from "jstz";
import {oneButtonAlert} from "../../utils";


/******************* GETS THE TIME ZONE TO DISPLAY **************/

// determines local timezone
const localTimeZone = jstz.determine().name();
const longFormattedTimeZone = moment().tz(localTimeZone).format('zz');

// All Timezones
// ToDo: Implement timezone choose option
const timeZonesList = moment_tz.tz.names();

const getCalendarFormatDate = (dateString, timeZone) => {
    // moment('2010-10-20T08:40'); // should parse to local time
    // moment.utc('2010-10-20T08:40'); // should parse to utc time
    const today = moment_tz.tz(dateString, timeZone);
    return {
        dateString: today.format("YYYY-MM-DD"),
        month: today.month() + 1,
        year: today.year(),
        day: today.date(),
        timestamp: today.unix()
    }
};

const getTimeFromIsoString = (dateTimeIso) => {
    return dateTimeIso.match(/\d\d:\d\d/)[0];
};

const getDateFromIsoString = (dateTimeIso) => {
    return dateTimeIso.split("T")[0];
};


const getFormattedDate = (dateString, timeZone) => {
    const momentDate = moment_tz(dateString).tz(timeZone);

    if (moment_tz(dateString).year() !== momentDate.year()) {
        return momentDate.format('dddd, MMM D, YYYY');
    }
    return momentDate.format('dddd, MMM D');
};

const type = {start: 0, end: 1};

/**
 * Returns the initial date as specified by the app
 * @return {{start: *, end: *}}
 */
export const initialDate = (timeZone) => {
    //const utcOffset = moment().utcOffset();
    return {
        start: (moment_tz().tz(timeZone).endOf('h').add(1, 'm').format()),
        end: (moment_tz().tz(timeZone).endOf('h').add(1, 'h').add(1, 'm').format())
    };
};

const GetDate = ({datetimeChangedCallback}) => {
    const TIMEZONE = localTimeZone;
    const TIMEZONE_OFFSET = moment_tz.tz(TIMEZONE).utcOffset();

    const [dateTime, setDateTime] = useState(initialDate(TIMEZONE));
    const [hide, setHide] = useState(
        {start: {'datePicker': true, 'timePicker': true}, end: {'datePicker': true, 'timePicker': true}});
    const [isAllDay, setIsAllDay] = useState(false);

    const [isEndDateBeforeStart, setEndDateBeforeStart] = useState(false);

    useEffect(() => {
        datetimeChangedCallback(dateTime);

    }, []);

    useEffect(() => {
        datetimeChangedCallback(dateTime, isEndDateBeforeStart);

    }, [hide, dateTime, isAllDay]);


    const handleTimePicker = (dateType) => {
        if (dateType === type.start) {
            // hide the opposite picker's and take complement of whatever is set for timePicker
            setHide({
                end: {timePicker: true, datePicker: true},
                start: {timePicker: !hide.start.timePicker, datePicker: true}
            });

        }
        if (dateType === type.end) {
            // hide the opposite picker's and take complement of whatever is set for timePicker
            setHide({
                start: {timePicker: true, datePicker: true},
                end: {timePicker: !hide.end.timePicker, datePicker: true}
            });

        }

    };

    const handleDatePicker = (dateType) => {
        if (dateType === type.start) {
            // hide the opposite picker's and take complement of whatever is set for datePicker
            setHide({
                end: {timePicker: true, datePicker: true},
                start: {datePicker: !hide.start.datePicker, timePicker: true}
            });

        }
        if (dateType === type.end) {
            // hide the opposite picker's and take complement of whatever is set for datePicker
            setHide({
                start: {timePicker: true, datePicker: true},
                end: {datePicker: !hide.end.datePicker, timePicker: true}
            });

        }
    };

    const allDaySwitchHandler = () => {
        if (!isAllDay) {
            if (!hide.end.timePicker) {
                setHide({
                    end: {timePicker: true, datePicker: false},
                    start: {timePicker: true, datePicker: true}
                });
            } else if (!hide.start.timePicker) {
                setHide({
                    end: {timePicker: true, datePicker: true},
                    start: {timePicker: true, datePicker: false}
                });
            } else if (!hide.end.datePicker) {
                // do nothing all good
            } else {
                setHide({
                    end: {timePicker: true, datePicker: true},
                    start: {timePicker: true, datePicker: false}
                });
            }
        }
        setIsAllDay(!isAllDay);
    };

    const newDayCallBack_start = (day) => {


        let start = moment_tz.tz(`${day.dateString} ${getTimeFromIsoString(dateTime.start)}`, TIMEZONE);
        let end = moment_tz(dateTime.end);
        if (start > end) {
            setDateTime({start: start.format(), end: start.add(1, 'h').format()})
        } else {
            setDateTime({...dateTime, start: start.format()});
            setEndDateBeforeStart(false);
        }

    };

    const newTimeCallBack_start = (event, selectedTime) => {
        let start = moment_tz(selectedTime);
        let end = moment_tz(dateTime.end);

        if (start > end) {
            setDateTime({start: start.format(), end: start.add(1, 'h').format()})
        } else {
            setDateTime({...dateTime, start: start.format()});
            setEndDateBeforeStart(false);
        }
    };

    const newDayCallBack_end = (day) => {
        let end = moment_tz.tz(`${day.dateString} ${getTimeFromIsoString(dateTime.end)}`, TIMEZONE);
        let start = moment_tz(dateTime.start);

        if (end < start) {
            setEndDateBeforeStart(true);
        } else {
            setEndDateBeforeStart(false);
        }
        setDateTime({...dateTime, end: end.format()});

    };

    const newTimeCallBack_end = (event, selectedTime) => {
        let end = moment_tz(selectedTime);
        let start = moment_tz(dateTime.start);

        if (end < start) {
            setEndDateBeforeStart(true);
        } else {
            setEndDateBeforeStart(false);
        }
        setDateTime({...dateTime, end: end.format()});
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
                    <TouchableWithoutFeedback onPress={() => handleDatePicker(type.start)}>
                        <StyledText size={17} type={'semibold'} style={styles.date}>
                            {getFormattedDate(dateTime.start, TIMEZONE)}
                        </StyledText>
                    </TouchableWithoutFeedback>
                    {!isAllDay &&
                    <TouchableWithoutFeedback onPress={() => handleTimePicker(type.start)}>
                        <StyledText size={17} type={'semibold'} style={styles.time}>
                            {moment(dateTime.start).format('h:mm A')}
                        </StyledText>
                    </TouchableWithoutFeedback>}
                </View>


                <Collapsible collapsed={hide.start.timePicker}>
                    <DateTimePicker
                        testID="dateTimePicker_start"
                        timeZoneOffsetInMinutes={TIMEZONE_OFFSET}
                        value={new Date(dateTime.start)}
                        mode={'time'}
                        is24Hour={true}
                        display="default"
                        onChange={newTimeCallBack_start}
                    />
                </Collapsible>
                <Collapsible collapsed={hide.start.datePicker}>
                    <Calendar newDayCallBack={newDayCallBack_start}
                              selectedDay={getCalendarFormatDate(dateTime.start, TIMEZONE)}/>
                </Collapsible>

                {/*End Date*/}
                <View style={styles.container_datetime}>
                    <TouchableWithoutFeedback onPress={() => handleDatePicker(type.end)}>
                        <StyledText size={17} type={'semibold'}
                                    style={isEndDateBeforeStart ? styles.datetime_error : styles.date}>
                            {getFormattedDate(dateTime.end, TIMEZONE)}
                        </StyledText>
                    </TouchableWithoutFeedback>
                    {!isAllDay &&
                    <TouchableWithoutFeedback onPress={() => handleTimePicker(type.end)}>
                        <StyledText size={17} type={'semibold'}
                                    style={isEndDateBeforeStart ? styles.datetime_error : styles.time}>{moment(dateTime.end).format('h:mm A')}</StyledText>


                    </TouchableWithoutFeedback>}
                </View>

                <Collapsible collapsed={hide.end.timePicker}>
                    <DateTimePicker
                        testID="dateTimePicker_end"
                        timeZoneOffsetInMinutes={TIMEZONE_OFFSET}
                        value={new Date(dateTime.end)}
                        mode={'time'}
                        is24Hour={true}
                        display="default"
                        onChange={newTimeCallBack_end}
                    />
                </Collapsible>
                <Collapsible collapsed={hide.end.datePicker}>
                    <Calendar newDayCallBack={newDayCallBack_end}
                              selectedDay={getCalendarFormatDate(dateTime.end, TIMEZONE)}/>
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
    },
    datetime_error: {
        color: colors.secondary.light,
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        textDecorationColor: colors.general.red
    }
});


export default GetDate;