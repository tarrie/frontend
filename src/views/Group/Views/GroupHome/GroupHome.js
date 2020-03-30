import React, {useRef, useEffect, useState} from "react"
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
import {colors, normalize, sizes, SCREEN_HEIGHT} from "../../../../constants/styles";
import {useGroup} from "../../../../contex";
import {GroupNavigationBar} from "../../routes";
import {GroupHeader} from "../../components";
import {EventsHeader, EventsHeaderActive} from "../../components/Events";
import {useNavigation} from "@react-navigation/native"
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {FadeOut} from "../../components/Animations";
import {EventCard} from "../../../../components/EventCard";
import {StickyDate} from "../../../../components/StickyDate";
import {Calendar} from "../../../../components/Calendar";
import {
    CALENDAR_HEIGHT,
    CARD_HEIGHT,
    GROUP_STICKY_HEADER_HEIGHT,
    GROUP_PARALLAX_HEADER_HEIGHT
} from "../../../../constants/parameters";
import {Expandable, DisappearDelay} from "../../../../components/Animations";

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d721',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d722',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d723',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d724',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d725',
        title: 'Third Item',
    },
];

/*
class CustomScrollView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {loadLoader: false}
    }

    render() {
        return (
            (
                  <FlatList
                      style={{height:null}}
                     stickyHeaderIndices={[1]}
                    data={DATA}
                    renderItem={({ item }) => <EventCard key={item.id} />}
                  />
            )
        );
    }
}
*/
const AnimatedCustomScrollView = Animated.createAnimatedComponent(FlatList);

// https://ethercreative.github.io/react-native-shadow-generator/
const GroupHomeForeground = ({groupState, navigation, searchActiveCallback, isCalendarDown, setIsCalendarDown}) => {
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
                <GroupHeader groupState={groupState}/>
            </View>

            <View style={{...styles.container_groupNavBar, borderBottomWidth: 1, borderColor: 'rgba(0,0,0,.2)'}}>
                <GroupNavigationBar groupState={groupState} navigation={navigation}/>
            </View>
            <View style={styles.container_groupChatHeader}>
                <EventsHeader groupState={groupState} activeCallback={searchActiveCallback}
                              isCalendarDown={isCalendarDown} setIsCalendarDown={setIsCalendarDown}/>
            </View>
        </View>
    )
};


const StickyHeader = ({groupState, searchActiveCallback, isSearchActive, isSearchUp, cancelCallback, isCalendarDown, setIsCalendarDown}) => {
    return (
        <View style={{width: '100%', height: '100%'}}>
            <EventsHeaderActive
                isFocused={isSearchActive}
                groupState={groupState}
                activeCallback={searchActiveCallback}
                isSearchUp={isSearchUp}
                setIsSearchUp={cancelCallback}
                isCalendarDown={isCalendarDown}
                setIsCalendarDown={setIsCalendarDown}
            />
        </View>
    )
};

const GroupHome = () => {
    const ref = useRef(null);
    const groupState = useGroup({groupId: 'groupId'});
    const navigation = useNavigation();
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [isSearchUp, setIsSearchUp] = useState(false);
    const [scrollPosnOutOfBounds, setScrollPosnOutOfBounds] = useState(false);
    const [fingerTouching, setFingerTouching] = useState(false);
    const [isCalendarDown, setIsCalendarDown] = useState(true);
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
        if (scrollPosnOutOfBounds && !isScrolling && !fingerTouching) {
            ref.current.scrollTo({x: 0, y: 0, animated: true});
            isScrolling = true;
        }
    }, [scrollPosnOutOfBounds, fingerTouching]);

    // adjust the scrollview when calendar is clicked.
    useEffect(() => {


        if (isCalendarDown) {
            ref.current.scrollTo({x: 0, y: currentYPosn.current+CALENDAR_HEIGHT, animated: true});
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

    const cancelCallback = (_bool) => {
        setIsSearchUp(_bool)
    };


    return (
        <View style={styles.container}>

            {/*Show this iff calendar is down*/}
            <View style={{height: '100%', backgroundColor: '#dedede'}}>


                <DisappearDelay isShowing={!isCalendarDown} style={{
                    height: GROUP_STICKY_HEADER_HEIGHT,
                    width: '100%',
                    position: 'absolute',
                    top: 0,
                    zIndex: 2
                }}>
                    <EventsHeaderActive
                        isFocused={isSearchActive}
                        groupState={groupState}
                        activeCallback={setIsSearchActive}
                        isSearchUp={isSearchUp}
                        setIsSearchUp={cancelCallback}
                        isCalendarDown={isCalendarDown}
                        setIsCalendarDown={setIsCalendarDown}
                    />
                </DisappearDelay>

                <Expandable goDown={!isCalendarDown} style={{zIndex: 1, width: '100%'}}
                            startPosn={-GROUP_STICKY_HEADER_HEIGHT - CALENDAR_HEIGHT}
                            endPosn={GROUP_STICKY_HEADER_HEIGHT}>
                    <Calendar/>
                </Expandable>


                <View style={{flex: 1, zIndex: 0}}>
                    <ParallaxScrollView
                        onTouchStart={() => {
                            setIsSearchActive(false);
                            setFingerTouching(true)
                        }}
                        onTouchEnd={() => {
                            setFingerTouching(false)
                        }}

                        contentInset={{top:SCREEN_HEIGHT/11, left:0,bottom:0,right:0}}
                        style={{flex: 1}}
                        onScroll={processScroll}
                        scrollEventThrottle={16}
                        ref={ref}
                        stickyHeaderIndices={[1, 4]}
                        backgroundColor={'transparent'}
                        contentBackgroundColor={'transparent'}
                        parallaxHeaderHeight={GROUP_PARALLAX_HEADER_HEIGHT}
                        stickyHeaderHeight={GROUP_STICKY_HEADER_HEIGHT}
                        renderStickyHeader={() => <StickyHeader isSearchActive={isSearchActive}
                                                                searchActiveCallback={setIsSearchActive}
                                                                groupState={groupState}
                                                                isSearchUp={isSearchUp}
                                                                isCalendarDown={isCalendarDown}
                                                                setIsCalendarDown={setIsCalendarDown}
                                                                cancelCallback={cancelCallback}
                        />
                        }
                        renderForeground={() => (
                            !isSearchUp ?
                                <GroupHomeForeground searchActiveCallback={setIsSearchActive} groupState={groupState}
                                                     navigation={navigation} setIsCalendarDown={setIsCalendarDown}
                                                     isCalendarDown={isCalendarDown}/> :
                                <FadeOut><GroupHomeForeground searchActiveCallback={setIsSearchActive}
                                                              groupState={groupState}
                                                              navigation={navigation}
                                                              setIsCalendarDown={setIsCalendarDown}
                                                              isCalendarDown={isCalendarDown}/></FadeOut>
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