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
const GroupHomeForeground = ({groupState, navigation, searchActiveCallback}) => {
    return (
        <View style={
            {
                width: '100%',
                height: '100%',
                borderBottomWidth: 1,
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
                <EventsHeader groupState={groupState} activeCallback={searchActiveCallback}/>
            </View>
        </View>
    )
};


const StickyHeader = ({groupState, searchActiveCallback, isSearchActive, isSearchUp, cancelCallback}) => {
    return (
        <View style={{width: '100%', height: '100%', borderWidth: 1}}>
            <EventsHeaderActive
                isFocused={isSearchActive}
                groupState={groupState}
                activeCallback={searchActiveCallback}
                isSearchUp={isSearchUp}
                setIsSearchUp={cancelCallback}
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
    let isScrolling = false;

    useEffect(() => {
        if (isSearchActive) {
            ref.current.scrollTo({x: 0, y: SCREEN_HEIGHT / 2 - SCREEN_HEIGHT / 15, animated: true});
            setIsSearchUp(true);
        }

        if (!isSearchUp) {
            ref.current.scrollTo({x: 0, y: 0, animated: true});
            setIsSearchActive(false);
        }
    }, [isSearchActive, isSearchUp]);


    useEffect(() => {
        if (scrollPosnOutOfBounds && !isScrolling && isSearchUp && !fingerTouching) {
            ref.current.scrollTo({x: 0, y: SCREEN_HEIGHT / 2 - SCREEN_HEIGHT / 15, animated: true});
            isScrolling = true;
        }
    }, [scrollPosnOutOfBounds, fingerTouching]);

    const processScroll = ({nativeEvent}) => {
        //console.log(isScrolling,nativeEvent.contentOffset.y,SCREEN_HEIGHT/2.2-SCREEN_HEIGHT/15,(Math.abs(nativeEvent.contentOffset.y -(SCREEN_HEIGHT/2.2-SCREEN_HEIGHT/15))))
        if ((isSearchUp && nativeEvent.contentOffset.y < SCREEN_HEIGHT / 2 - SCREEN_HEIGHT / 15)) {
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

            <View style={{height:'100%',backgroundColor:'#dedede'}}>

                <View style={{flex:1}}>
                    <ParallaxScrollView
                        style={{flex: 1}}
                        onScroll={processScroll}
                        scrollEventThrottle={300}
                        ref={ref}
                         stickyHeaderIndices={[0,3]}
                        backgroundColor={'transparent'}
                        contentBackgroundColor={'transparent'}
                        parallaxHeaderHeight={SCREEN_HEIGHT / 2}
                        stickyHeaderHeight={SCREEN_HEIGHT / 15}
                        renderStickyHeader={() => <StickyHeader isSearchActive={isSearchActive}
                                                                searchActiveCallback={setIsSearchActive}
                                                                groupState={groupState}
                                                                isSearchUp={isSearchUp}
                                                                cancelCallback={cancelCallback}/>
                        }
                        renderForeground={() => (
                            !isSearchUp ? <GroupHomeForeground searchActiveCallback={setIsSearchActive} groupState={groupState}
                                                               navigation={navigation}/> :
                                <FadeOut><GroupHomeForeground searchActiveCallback={setIsSearchActive} groupState={groupState}
                                                              navigation={navigation}/></FadeOut>
                        )}>
                        <StickyDate isActiveDate={true} key={336} marginTop={SCREEN_HEIGHT / 15} />
                        <EventCard key={1}/>
                        <StickyDate key={33} marginTop={SCREEN_HEIGHT / 15} />

                        <EventCard key={2}/>
                        <EventCard key={3}/>
                        <EventCard key={4} />
                        <EventCard key={5}/>
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
        height: .18 * SCREEN_HEIGHT / 2
    }
});

export default GroupHome;