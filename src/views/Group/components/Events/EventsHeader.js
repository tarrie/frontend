import React, {useState, useRef, useEffect, useContext} from "react"
import {StyledText} from "../../../../components/StyledText";
import {View, StyleSheet, ScrollView, TouchableOpacity, TouchableWithoutFeedback} from "react-native"
import {colors, normalize, sizes, SCREEN_HEIGHT} from "../../../../constants/styles";
import {
    FontAwesome,
    Ionicons
} from '@expo/vector-icons';
import {Searchbar, Modal} from 'react-native-paper';
import {SearchBar} from 'react-native-elements';
import CalendarDown from "../../../../assets/icons/CalendarDown";
import CalendarUp from "../../../../assets/icons/CalendarUp";
import {Calendar} from "../../../../components/Calendar";
import {GroupContext} from "../../../../context/GroupContext";
import {screens} from "../../routes/constants";
import moment from "moment";

const getFormattedDate = (selectedDay) => {
    const momentDate = moment(selectedDay.dateString);

    if (moment().year() !== selectedDay.year) {
        return momentDate.format('MMM YYYY')
    }
    return momentDate.format('MMMM')

};


const EventsHeaderActive = ({selectedDay}) => {

    const [firstQuery, setFirstQuery] = useState('');
    const search_ref = useRef(null);

    const {groupHomeState} = useContext(GroupContext);
    const {
        isSearchActive,
        setIsSearchActive,
        isSearchUp,
        setIsSearchUp,
        isCalendarDown,
        setIsCalendarDown
    } = groupHomeState;


    useEffect(() => {
        if (isSearchActive && search_ref.current) {
            search_ref.current.focus();
        }
    }, [isSearchActive, isSearchUp]);


    const onCancel = () => {
        search_ref.current.blur();
        setIsSearchUp(false);
        setIsSearchActive(false);
    };

    return (
        <View style={{height: '100%'}}>

            <View style={styles.container_2}>
                <View style={{
                    width: '100%',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 5,
                    backgroundColor: 'transparent'
                }}>
                    <View style={{...styles.edit_container}}>
                        <TouchableOpacity
                            style={{width: '50%'}}
                            onPress={() => setIsCalendarDown(!isCalendarDown)}
                        >

                            <View style={styles.calendar_container}>
                                <StyledText style={{alignSelf: 'center', color: '#1f1f1f'}} size={SCREEN_HEIGHT / 32}
                                            type={'semibold'}>{getFormattedDate(selectedDay)}</StyledText>
                                {isCalendarDown ?
                                    <CalendarUp
                                        color={colors.primary.main}
                                        size={SCREEN_HEIGHT / 19}
                                        style={{alignSelf: 'center', paddingLeft: normalize(60)}}/>
                                    :
                                    <CalendarDown
                                        color={colors.primary.main}
                                        size={SCREEN_HEIGHT / 19}
                                        style={{alignSelf: 'center', paddingLeft: normalize(60)}}/>
                                }


                            </View>
                        </TouchableOpacity>

                        <Searchbar
                            ref={search_ref}
                            lightTheme={true}
                            // onFocus={() => activeCallback(true)}
                            // onBlur={() => activeCallback(false)}
                            placeholder="Search"
                            showCancel={true}
                            onChangeText={query => setFirstQuery(query)}
                            value={firstQuery}
                            style={{
                                borderWidth: .5,
                                borderRadius: 5,
                                borderColor: 'rgba(0,0,0,.05)',
                                width: '100%',//isSearchUp exapandable
                                height: '100%',
                                backgroundColor: 'rgba(0,0,0,.08)'
                            }}
                        />
                    </View>
                </View>

                <View style={{
                    borderTopWidth: .5,
                    borderBottomWidth: 1,
                    width: '100%',
                    flex: .65,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgb(244,244,244)',
                    borderColor: 'rgba(0,0,0,.2)'

                }}>
                    <View style={{
                        width: '90%',
                        height: '60%',
                        borderWidth: 1.5,
                        flexDirection: 'row',
                        borderRadius: 5,
                        borderColor: colors.primary.extra_dark
                    }}>
                        <View style={{
                            width: '50%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: colors.primary.extra_dark,
                            borderBottomLeftRadius: 3,
                            borderTopLeftRadius: 3
                        }}>
                            <StyledText adjustsFontSizeToFit size={sizes.mini.fontSize}
                                        style={{color: colors.background_color.white}}> All
                                Events</StyledText>
                        </View>
                        <View style={{
                            width: '50%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderBottomRightRadius: 5,
                            borderTopRightRadius: 5
                        }}>
                            <StyledText adjustsFontSizeToFit size={sizes.mini.fontSize}
                                        style={{color: colors.primary.extra_dark}}> Events
                                Coordinating</StyledText>
                        </View>
                    </View>
                </View>
            </View>

        </View>
    )
};


const EventsHeader = ({navigation}) => {
    const [firstQuery, setFirstQuery] = useState('');
    const search_ref = useRef(null);
    const {groupHomeState} = useContext(GroupContext);
    const {
        isSearchUp,
        setIsSearchUp
    } = groupHomeState;


    useEffect(() => {
        if (isSearchUp && search_ref.current) {
            search_ref.current.focus();
        }

        if (!isSearchUp) {
            setIsSearchUp(false);
        }

    }, [isSearchUp]);

    const createEventTrigger = () => {
        navigation.navigate(screens.EVENT_CREATE, {group: true})
    };

    return (
        <View style={styles.container}>
            <View style={styles.newchat_container}>
                <StyledText type={'bold'} size={SCREEN_HEIGHT / 23}
                            style={{letterSpacing: .5, color: 'rgba(0,0,0,.85)'}}>
                    Events
                </StyledText>
            </View>

            <TouchableOpacity onPress={createEventTrigger}
                              style={{...styles.newchat_container, paddingBottom: SCREEN_HEIGHT / 300}}>
                <FontAwesome name={'edit'} size={28} color={'#5E6C84'}/>
            </TouchableOpacity>

        </View>
    )
};

const styles = StyleSheet.create({
    container_2: {
        borderColor: colors.text.secondary.main,
        width: "100%",
        height: '100%',
        flexDirection: "column",
        backgroundColor: 'rgb(253,253,253)',
    },
    container: {
        borderColor: colors.text.secondary.main,
        width: "100%",
        height: "100%",
        flexDirection: "row",
        backgroundColor: '#F0F0F0',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        paddingVertical: 5
    },
    calendar_container: {
        width: '100%',
        flexDirection: 'row',
        height: '100%',
        alignItems: 'center'
    },
    newchat_container: {
        height: "100%",
        flexDirection: "row",
        justifyContent: 'flex-end',
        backgroundColor: 'transparent',
        alignItems: 'flex-end'
    },
    edit_container: {
        backgroundColor: 'transparent',
        width: '100%',
        height: '60%',
        flexDirection: "row",
        borderColor: colors.text.secondary.main,
        justifyContent: 'space-between',
    }
});


export {EventsHeader, EventsHeaderActive}