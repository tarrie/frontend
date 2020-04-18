import React, {useState, useEffect} from 'react';
import {View, Button, Platform, TouchableWithoutFeedback} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Collapsible from 'react-native-collapsible';
import {Calendar} from "../Calendar";
import moment from "moment";
import {StyledText} from "../StyledText";
import {colors, normalize, SCREEN_HEIGHT} from "../../constants/styles";
import {Feather} from "@expo/vector-icons";
import {Switch} from 'react-native-paper';

const generateToday = () => {
    const today = moment();
    return {
        dateString: today.format("YYYY-MM-DD"),
        month: today.month() + 1,
        year: today.year(),
        day: today.date(),
        timestamp: today.unix()
    }
};


const getFormattedDate = (selectedDay) => {
    const momentDate = moment(selectedDay.dateString);

    if (moment().year() !== selectedDay.year) {
        return momentDate.format('dddd, MMM D, YYYY')
    }
    return momentDate.format('dddd, MMM D')

};

const GetDate = () => {
    let hasDayEndedTimeOut;

    const [time, setTime] = useState(moment().subtract(5, 'h').endOf('h').add(1, 'm').toDate());
    const [selectedDay, setSelectedDay] = useState(generateToday());
    const [hide, setHide] = useState({'datePicker': true, 'timePicker': true});
    const [isAllDay, setIsAllDay] = useState(false);

    const hidePicker = () => {
        setHide({timePicker: true, datePicker: true});
    };


    const handleTimePicker = () => {
        if (!(hide.timePicker)) {
            hidePicker()
        } else {
            // showTimePicker
            setHide({timePicker: false, datePicker: true});
        }
    };

    const handleDatePicker = () => {
        if (!(hide.datePicker)) {
            hidePicker()
        } else {
            // showDatePicker
            setHide({timePicker: true, datePicker: false});
        }
    };


    const newDayCallBack = (day) => {
        setSelectedDay(day);
    };

    const newTimeCallBack = (event, selectedDate) => {
        setTime(selectedDate || time);
    };

    useEffect(() => {
        setSelectedDay(generateToday());
        return () => clearTimeout(hasDayEndedTimeOut);
    }, []);

    /**
     * Once the day ends it makes sure the calendar reflects this, then loops over itself.
     */
    const checkIfDayEnded = () => {
        // '2020-04-20':{selected: true,selectedColor:'orange', textColor:'pink', color:'purple'}
        const msTillEndOfDay = moment().endOf('day').add(1, 'seconds').diff(moment(), 'milliseconds');
        hasDayEndedTimeOut = setTimeout(() => {
            setSelectedDay(generateToday());
        }, msTillEndOfDay);
        checkIfDayEnded();
    };

    const allDaySwitchHandler = ()=>{
      setIsAllDay(!isAllDay);
      if (!isAllDay){
          setHide({timePicker: true, datePicker: false});
      }

    };
    return (
        <View>

            <View style={{marginVertical: 5, borderWidth: 1}}>

                <View
                    style={{flexDirection: 'row', marginVertical: 5, borderWidth: 1, alignItems: 'center', height: 60}}>
                    <Feather name={'clock'} size={25} style={{
                        marginLeft: normalize(5),
                        marginRight: normalize(15),
                        color:colors.primary.dark
                    }}/>
                    <View
                        style={{flexDirection: 'row', borderWidth: 1, width: '86%', justifyContent: 'space-between'}}>
                        <StyledText size={SCREEN_HEIGHT / 50} style={{color: colors.text.primary.light}} type={'semibold'}>
                            All-day
                        </StyledText>
                        <Switch
                            value={isAllDay}
                            onValueChange={allDaySwitchHandler}
                        />
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginLeft: normalize(40),
                    marginRight: normalize(5)
                }}>
                    <TouchableWithoutFeedback onPress={handleDatePicker}>
                        <StyledText size={17} type={'semibold'}
                                    style={{color: colors.text.primary.light}}>{getFormattedDate(selectedDay)}</StyledText>
                    </TouchableWithoutFeedback>
                    {!isAllDay&&
                    <TouchableWithoutFeedback onPress={handleTimePicker}>
                        <StyledText size={17} type={'semibold'}
                                    style={{color: colors.text.primary.light}}>{moment.utc(time).format('h:mm A')}</StyledText>
                    </TouchableWithoutFeedback>}
                </View>
            </View>

            <Collapsible collapsed={hide.timePicker}>
                <DateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                    value={time}
                    mode={'time'}
                    is24Hour={true}
                    display="default"
                    onChange={newTimeCallBack}
                />
            </Collapsible>
            <Collapsible collapsed={hide.datePicker}>
                <Calendar newDayCallBack={newDayCallBack} selectedDay={selectedDay}/>
            </Collapsible>


        </View>
    );
};

export default GetDate;