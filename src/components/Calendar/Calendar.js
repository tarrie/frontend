import React from "react";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {StyleSheet} from "react-native";
import {colors} from "../../constants/styles";

const vacation = {key:'vacation', color: 'red', selectedDotColor: 'blue'};
const massage = {key:'massage', color: 'blue', selectedDotColor: 'blue'};
const workout = {key:'workout', color: 'green'};
const theme = { backgroundColor: '#ffffff',
    calendarBackground: '#ffffff',
    textSectionTitleColor: '#b6c1cd',
    selectedDayBackgroundColor: colors.general.hot_purple,
    selectedDayTextColor: '#ffffff',
    todayTextColor: '#00adf5',
    dayTextColor: '#2d4150',
    textDisabledColor: '#d9e1e8',
    dotColor: '#00adf5',
    selectedDotColor: '#ffffff',
    arrowColor: 'orange',
    disabledArrowColor: '#d9e1e8',
    monthTextColor: 'blue',
    indicatorColor: 'blue',
    textDayFontFamily: 'source-sans-pro-regular',
    textMonthFontFamily: 'source-sans-pro-regular',
    textDayHeaderFontFamily: 'source-sans-pro-regular',
    textDayFontWeight: '300',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '300',
    textDayFontSize: 16,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 16
  }
const EventCalendar = ({style}) =>{
    return (
        <Calendar
          style={[styles.calendar,style]}
         // onDayLongPress={this.onDayLongPress}
          theme={theme}
          current={'2018-03-01'}
          minDate={'2018-03-01'}
          markingType={'multi-dot'}
          markedDates={{
            '2018-03-01': {
              customStyles: {
                container: {
                  backgroundColor: 'white',
                  elevation: 2
                },
                text: {
                  color: 'red'
                }
              }
            },
            '2018-03-08': {
              selected: true,
                dots: [vacation, massage, workout]
            }
          }}
        />
    )
};

const styles = StyleSheet.create({
  calendar: {
    marginBottom: 10
  },
  text: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'lightgrey',
    fontSize: 16
  }
});

EventCalendar.defaultProps = {
    style: {}
};


export default EventCalendar;