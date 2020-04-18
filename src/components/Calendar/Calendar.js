import React, {useState, useEffect} from "react";
import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';
import {StyleSheet, Text, View} from "react-native";
import {colors, SCREEN_WIDTH} from "../../constants/styles";
import {CALENDAR_HEIGHT} from "../../constants/parameters";
import {SwipeLeft, SwipeRight} from "../../assets/icons";
import moment from "moment";

LocaleConfig.locales['fr'] = {
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthNamesShort: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
};
LocaleConfig.defaultLocale = 'fr';

const vacation = {key: 'vacation', color: 'red', selectedDotColor: 'blue'};
const massage = {key: 'massage', color: 'blue', selectedDotColor: 'blue'};
const workout = {key: 'workout', color: 'green'};


const theme = {
    backgroundColor: colors.background_color.grey_tablet,
    calendarBackground: colors.background_color.grey_tablet,
    textSectionTitleColor: '#b6c1cd',
    selectedDayBackgroundColor: colors.secondary.main,
    selectedDayTextColor: '#ffffff',
    todayFontWight: 'bold',
    todayTextColor: colors.secondary.main,
    dayTextColor: '#2d4150',
    textDisabledColor: '#d9e1e8',
    dotColor: '#00adf5',
    selectedDotColor: '#ffffff',
    disabledArrowColor: 'pink',
    indicatorColor: colors.secondary.main,
    textDayFontFamily: 'source-sans-pro-regular',
    textMonthFontFamily: 'source-sans-pro-regular',
    textDayHeaderFontFamily: 'source-sans-pro-regular',
    textDayFontWeight: '300',
    textDayHeaderFontWeight: '300',
    textDayFontSize: 13,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 16,


    "stylesheet.calendar.main": {
        'monthView': {
            borderWidth: 0
        }
    },

    "stylesheet.calendar.header": {
        header: {
            margin: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: 5,
            alignItems: 'center',
        },
        monthText: {
            opacity: 0,
        },
        dayHeader: {
            fontFamily: 'airbnb-black',
            fontSize: 13,
            width: 15,
            textAlign: 'center',
            color: 'rgba(47,79,79,0.50)',
        }
    }
};

/**
 *  Converts a date to proper format
 * @param momentDate a moment date
 * @return {{month: *, year: *, dateString: *, day: *}}
 */
const generateDay = (momentDate) => {
    return {
        dateString: momentDate.format("YYYY-MM-DD"),
        month: momentDate.month()+1,
        year: momentDate.year(),
        day: momentDate.date(),
        timestamp: momentDate.unix()
    }
};


// https://github.com/wix/react-native-calendars/issues/732
const EventCalendar = ({selectedDay, newDayCallBack, canGoIntoPast}) => {

    /**
     * Converts a date returned from the calendar as a marked date
     * @param calendarDate
     * @return {{}}
     */
    const convertToMarkedDate = (calendarDate) => {
        return {[calendarDate.dateString]: {selected: true}}
    };


    const incrementMonth = (incr)=>{
      // console.log(nextMonth);

       let nextMonth = moment(selectedDay.dateString).startOf('month').add(1, 'M');

       newDayCallBack(generateDay(nextMonth))
        incr();

    };

    const decrementMonth = (decr)=>{
        let prevMonth = moment(selectedDay.dateString).startOf('month').subtract(1, 'M');
        //console.log(prevMonth);
        decr();
       // newDayCallBack(generateDay(prevMonth))
    };

    const getNextMonth = (month) =>{


        if (month.length===1){
            const today = moment();
            if ((today.year() === month[0].year) && (today.month()+1 === month[0].month)){
                newDayCallBack(generateDay(today))
            }else{
                let nextMonth = moment(month[0].dateString).startOf('month');
                newDayCallBack(generateDay(nextMonth))
            }
        }

    };


    return (

        <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', height: CALENDAR_HEIGHT}}>
            <CalendarList
                style={[styles.calendar]}
                // onDayLongPress={this.onDayLongPress}
                theme={theme}
                horizontal={true}
                markingType={'multi-dot'}
                markedDates={convertToMarkedDate(selectedDay)}
                pagingEnabled
                onDayPress={(day) => {
                    newDayCallBack(day)
                }}
                current={selectedDay.dateString}

                scrollEnabled={true}
                pastScrollRange={canGoIntoPast?undefined:0}
                removeClippedSubviews={false}
                calendarWidth={SCREEN_WIDTH}
                onVisibleMonthsChange={getNextMonth}

                hideArrows={true}
                // Replace default arrows with custom ones (direction can be 'left' or 'right')
                //renderArrow={(direction) => direction === 'left' ?
                  //  <SwipeLeft color={colors.secondary.main} size={70} style={{marginLeft: -23}}/> :
                  //  <SwipeRight color={colors.secondary.main} size={70} style={{marginRight: -23}}/>}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    calendar: {
        width: SCREEN_WIDTH,
        borderWidth: 1,
        flex: 1
    },
    text: {
        textAlign: 'center',
        padding: 10,
        backgroundColor: 'lightgrey',
        fontSize: 16
    }
});

EventCalendar.defaultProps = {
    selectedDay: generateDay(moment()),
    newDayCallBack: ()=>{},
    canGoIntoPast: false
};


export default EventCalendar;