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
    selectedDayBackgroundColor: colors.general.hot_purple,
    selectedDayTextColor: '#ffffff',
    todayFontWight: 'bold',
    todayTextColor: colors.general.hot_purple,
    dayTextColor: '#2d4150',
    textDisabledColor: '#d9e1e8',
    dotColor: '#00adf5',
    selectedDotColor: '#ffffff',
    disabledArrowColor: '#d9e1e8',
    indicatorColor: colors.general.hot_purple,
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
            height: 40,
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

const generateToday = () => {
    const today = moment();
    return {
        dateString: today.format("YYYY-MM-DD"),
        month: today.month(),
        year: today.year(),
        day: today.day()
    }
};


// https://github.com/wix/react-native-calendars/issues/732
const EventCalendar = ({selectedDay, newDayCallBack}) => {

    /**
     * Converts a date returned from the calendar as a marked date
     * @param calendarDate
     * @return {{}}
     */
    const convertToMarkedDate = (calendarDate) => {
        return {[calendarDate.dateString]: {selected: true}}
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
                
                scrollEnabled={true}
                pastScrollRange={0}
                removeClippedSubviews={false}
                calendarHeight={50}
                calendarWidth={SCREEN_WIDTH}
                hideArrows={false}
                onVisibleMonthsChange={(month) => {console.log('month changed', month)}}
                onPressArrowLeft={(x) => x()}
                // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                onPressArrowRight={(x) => x()}
                // Replace default arrows with custom ones (direction can be 'left' or 'right')
                renderArrow={(direction) => direction === 'left' ?
                    <SwipeLeft color={colors.secondary.main} size={70} style={{marginLeft: -23}}/> :
                    <SwipeRight color={colors.secondary.main} size={70} style={{marginRight: -23}}/>}
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
    selectedDay: generateToday(),
    newDayCallBack: ()=>{}
};


export default EventCalendar;