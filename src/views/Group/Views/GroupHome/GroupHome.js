import React, {useRef, useEffect, useState, useContext} from "react"
import {StyledText} from "../../../../components/StyledText";
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    FlatList,
    Animated
} from "react-native"
import {colors, normalize, sizes, SCREEN_HEIGHT, SCREEN_WIDTH} from "../../../../constants/styles";
import {useGroup} from "../../../../contex";
import {GroupHeader} from "../../components/GroupHeader";
import {EventsHeader, EventsHeaderActive} from "../../components/Events";
import {GroupNavigationBar} from "../../components/GroupNavigationBar";
import {useNavigation} from "@react-navigation/native"
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {FadeOut} from "../../components/Animations";
import {EventCard} from "../../../../components/EventCard";
import {StickyDate} from "../../../../components/StickyDate";
import {Calendar, generateDay, generateToday} from "../../../../components/Calendar";
import {
    CALENDAR_HEIGHT,
    CARD_HEIGHT,
    GROUP_STICKY_HEADER_HEIGHT,
    GROUP_PARALLAX_HEADER_HEIGHT
} from "../../../../constants/parameters";
import {Expandable, DisappearDelay} from "../../../../components/Animations";
import {GroupContext} from "../../../../contex/GroupContext";
import {SwipeLeft} from "../../../../assets/icons";


// https://ethercreative.github.io/react-native-shadow-generator/
/**
 * Contains the group picture and the little chips and any relevant group info
 * @param navigation
 * @return {*}
 * @constructor
 */
const GroupHomeForeground = ({navigation}) => {
    return (
        <View style={
            {
                width: '100%',
                height: '100%',
                borderColor: 'rgba(0,0,0,.2)',
                flexDirection: "column",
            }
        }>
            <View style={styles.container_groupHeader}>
                <GroupHeader/>
            </View>

            <View style={{...styles.container_groupNavBar, borderBottomWidth: 1, borderColor: 'rgba(0,0,0,.2)'}}>
                <GroupNavigationBar navigation={navigation}/>
            </View>
            <View style={styles.container_groupChatHeader}>
                <EventsHeader navigation={navigation}/>
            </View>
        </View>
    )
};


const StickyHeader = ({selectedDay}) => {
    return (
        <View style={{width: '100%', height: '100%'}}>
            <EventsHeaderActive selectedDay={selectedDay}
            />
        </View>
    )
};

const GroupHome = () => {
    const ref = useRef(null);
    const {groupHomeState} = useContext(GroupContext);
    const navigation = useNavigation();

    const {
        setIsCalendarDown,
        isSearchActive,
        setIsSearchActive,
        isSearchUp,
        setIsSearchUp,
        isCalendarDown,
    } = groupHomeState;


    const [selectedDay, setSelectedDay] = useState(generateToday());
    const [scrollPosnOutOfBounds, setScrollPosnOutOfBounds] = useState(false);
    const [fingerTouching, setFingerTouching] = useState(false);
    const [isAtBasePosition, setIsAtBasePosition] = useState(true);
    const hasScrollCalAdjusted = useRef(false);
    const currentYPosn = useRef(0);

    let isScrolling = false;

    useEffect(() => {
        if (isSearchActive) {
            ref.current.scrollTo({x: 0, y: GROUP_PARALLAX_HEADER_HEIGHT - GROUP_STICKY_HEADER_HEIGHT, animated: true});
            setIsSearchUp(true);
        }

        if (!isSearchUp) {
            ref.current.scrollTo({x: 0, y: 0, animated: true});
            setIsSearchActive(false);
        }
    }, [isSearchActive, isSearchUp]);


    useEffect(() => {
        if (scrollPosnOutOfBounds && !isScrolling && !fingerTouching && isCalendarDown) {
            ref.current.scrollTo({x: 0, y: 0, animated: true});
            isScrolling = true;
        }
    }, [scrollPosnOutOfBounds, fingerTouching]);

    // adjust the scrollview when calendar is clicked.
    useEffect(() => {

        if (isCalendarDown) {
            ref.current.scrollTo({x: 0, y: currentYPosn.current + CALENDAR_HEIGHT, animated: true});
            hasScrollCalAdjusted.current = false;
        }

        if ((!isCalendarDown) && !hasScrollCalAdjusted.current) {
            hasScrollCalAdjusted.current = true;
            ref.current.scrollTo({x: 0, y: currentYPosn.current - CALENDAR_HEIGHT, animated: true});
        }
    }, [isCalendarDown]);

    const processScroll = ({nativeEvent}) => {

        currentYPosn.current = nativeEvent.contentOffset.y;
        //console.log(isScrolling,nativeEvent.contentOffset.y,SCREEN_HEIGHT/2.2-SCREEN_HEIGHT/15,(Math.abs(nativeEvent.contentOffset.y -(SCREEN_HEIGHT/2.2-SCREEN_HEIGHT/15))))
        if ((nativeEvent.contentOffset.y < 0)) {
            setScrollPosnOutOfBounds(true);
        } else {
            setScrollPosnOutOfBounds(false);
            isScrolling = false;
        }
    };

    const newDayCallBack = (day) => {
        setSelectedDay(day);
    };

    return (
        <View style={styles.container}>

            {/*Show this iff calendar is down*/}
            <View
                style={{height: '100%', backgroundColor: '#dedede'}}
            >

                <DisappearDelay isShowing={!isCalendarDown} style={{
                    height: GROUP_STICKY_HEADER_HEIGHT,
                    width: '100%',
                    position: 'absolute',
                    top: 0,
                    zIndex: 2
                }}>
                    <EventsHeaderActive selectedDay={selectedDay}/>
                </DisappearDelay>

                <Expandable goDown={!isCalendarDown} style={{zIndex: 1, width: '100%'}}
                            startPosn={-GROUP_STICKY_HEADER_HEIGHT - CALENDAR_HEIGHT}
                            endPosn={GROUP_STICKY_HEADER_HEIGHT}>
                    <Calendar canGoIntoPast={true} newDayCallBack={newDayCallBack} selectedDay={selectedDay}/>
                </Expandable>


                <View style={{flex: 1, zIndex: 0}}>
                    <ParallaxScrollView
                        onTouchStart={() => {
                            setIsSearchActive(false);
                            setFingerTouching(true);
                            // calendar goes back up when you touch this
                             if (!isCalendarDown){
                                 setIsCalendarDown(true)
                             }
                        }}
                        onTouchEnd={() => {
                            setFingerTouching(false)
                        }}

                        contentInset={{top: SCREEN_HEIGHT / 11, left: 0, bottom: 0, right: 0}}
                        style={{flex: 1}}
                        onScroll={processScroll}
                        scrollEventThrottle={16}
                        ref={ref}
                        stickyHeaderIndices={[1, 4]}
                        backgroundColor={'transparent'}
                        contentBackgroundColor={'transparent'}
                        parallaxHeaderHeight={GROUP_PARALLAX_HEADER_HEIGHT}
                        stickyHeaderHeight={GROUP_STICKY_HEADER_HEIGHT}
                        renderStickyHeader={() => <StickyHeader selectedDay={selectedDay}/>
                        }
                        renderForeground={() => (
                            !isSearchUp ?
                                <GroupHomeForeground navigation={navigation}/> :
                                <FadeOut><GroupHomeForeground navigation={navigation}/></FadeOut>
                        )}>

                        <StickyDate isActiveDate={true} key={336} marginTop={GROUP_STICKY_HEADER_HEIGHT} isFirst={true}
                                    isAtBasePosition={isAtBasePosition}/>
                        <EventCard key={1}/>

                        <EventCard key={2}/>
                        <StickyDate key={33} marginTop={GROUP_STICKY_HEADER_HEIGHT}/>

                        <EventCard key={3}/>
                        <EventCard key={4}/>
                        <EventCard key={5}/>

                        <EventCard key={6}/>
                        <EventCard key={7}/>
                        <EventCard key={8}/>
                    </ParallaxScrollView>


                </View>


            </View>
        </View>


    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background_color.black
    },
    container_groupHeader: {
        width: "100%",
        height: "70%",
        alignSelf: 'flex-start',
    },
    container_groupNavBar: {
        width: "100%",
        height: "12%",
        margin: 0
    },
    container_groupChatHeader: {
        width: "100%",
        // 20% of the viewbox
        height: .18 * GROUP_PARALLAX_HEADER_HEIGHT
    }
});

export default GroupHome;