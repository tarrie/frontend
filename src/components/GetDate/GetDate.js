import React, {useState, useEffect} from 'react';
import {View, Button, Platform, TouchableWithoutFeedback} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Collapsible from 'react-native-collapsible';
import {Calendar} from "../Calendar";
import moment from "moment";
import {StyledText} from "../StyledText";

const generateToday = () => {
    const today = moment();
    return {
        dateString: today.format("YYYY-MM-DD"),
        month: today.month(),
        year: today.year(),
        day: today.date()
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

    const [time, setTime] = useState(new Date(1598051730000));
    const [selectedDay, setSelectedDay] = useState(generateToday());
    const [hide, setHide] = useState({'datePicker': true, 'timePicker': true});



    const hidePicker = () => {
        setHide({timePicker:true, datePicker:true});
    };


    const handleTimePicker = ()=>{
        if (!(hide.timePicker)){
            hidePicker()
        }else{
            // showTimePicker
            setHide({timePicker:false, datePicker:true});
        }
    };

    const handleDatePicker = ()=>{
        if (!(hide.datePicker)){
            hidePicker()
        }else{
            // showDatePicker
            setHide({timePicker:true, datePicker:false});
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

    return (
        <View>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <TouchableWithoutFeedback onPress={handleDatePicker}>
                    <StyledText>{getFormattedDate(selectedDay)}</StyledText>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={handleTimePicker} >
                 <StyledText>{moment.utc(time).format('h:mm A')}</StyledText>
                </TouchableWithoutFeedback>
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