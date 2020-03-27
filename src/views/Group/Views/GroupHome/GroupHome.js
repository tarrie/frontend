import React, {useRef, useEffect, useState} from "react"
import {StyledText} from "../../../../components/StyledText";
import {View, StyleSheet, ScrollView, TouchableOpacity, TouchableWithoutFeedback} from "react-native"
import {colors, normalize, sizes, SCREEN_HEIGHT} from "../../../../constants/styles";
import {useGroup} from "../../../../contex";
import {GroupNavigationBar} from "../../routes";
import {GroupHeader} from "../../components";
import {ChatHeader, ChatHeaderActive} from "../../components/Chat";
import {useNavigation} from "@react-navigation/native"
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {FadeOut} from "../../components/Animations";


const GroupHomeForeground = ({groupState, navigation, searchActiveCallback}) => {
    return (
        <View style={{width: '100%', height: '100%', borderWidth: 1, flexDirection: "column"}}>
            <View style={styles.container_groupHeader}>
                <GroupHeader groupState={groupState}/>
            </View>

            <View style={{...styles.container_groupNavBar, borderWidth: 1}}>
                <GroupNavigationBar groupState={groupState} navigation={navigation}/>
            </View>
            <View style={styles.container_groupChatHeader}>
                <ChatHeader groupState={groupState} activeCallback={searchActiveCallback}/>
            </View>
        </View>
    )
};


const StickyHeader = ({groupState, searchActiveCallback, isSearchActive, isSearchUp, cancelCallback}) => {
    return (
        <View style={{width: '100%', height: '100%', borderWidth: 1}}>
            <ChatHeaderActive
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
            ref.current.scrollTo({x: 0, y: SCREEN_HEIGHT / 2.2 - SCREEN_HEIGHT / 15, animated: true});
            setIsSearchUp(true);
        }

        if (!isSearchUp) {
            ref.current.scrollTo({x: 0, y: 0, animated: true});
            setIsSearchActive(false);
        }
    }, [isSearchActive, isSearchUp]);


    useEffect(()=>{
        if (scrollPosnOutOfBounds && !isScrolling && isSearchUp && !fingerTouching){
            ref.current.scrollTo({x: 0, y: SCREEN_HEIGHT / 2.2 - SCREEN_HEIGHT / 15, animated: true});
            isScrolling=true;
        }
    },[scrollPosnOutOfBounds,fingerTouching]);

    const processScroll = ({nativeEvent}) => {
        //console.log(isScrolling,nativeEvent.contentOffset.y,SCREEN_HEIGHT/2.2-SCREEN_HEIGHT/15,(Math.abs(nativeEvent.contentOffset.y -(SCREEN_HEIGHT/2.2-SCREEN_HEIGHT/15))))
        if ((isSearchUp && nativeEvent.contentOffset.y < SCREEN_HEIGHT / 2.2 - SCREEN_HEIGHT / 15)) {
            setScrollPosnOutOfBounds(true);
        }else{
            setScrollPosnOutOfBounds(false);
            isScrolling = false;
        }
    };

    const cancelCallback = (_bool) => {
        setIsSearchUp(_bool)
    };


    return (
        <View style={styles.container}>

            <ParallaxScrollView

                onScroll={processScroll}
                scrollEventThrottle={300}
                ref={ref}
                backgroundColor={colors.background_color.grey_tablet}
                contentBackgroundColor="pink"
                parallaxHeaderHeight={SCREEN_HEIGHT / 2.2}
                stickyHeaderHeight={SCREEN_HEIGHT / 15}
                renderStickyHeader={() => <StickyHeader isSearchActive={isSearchActive}
                                                        searchActiveCallback={setIsSearchActive}
                                                        groupState={groupState}
                                                        isSearchUp={isSearchUp}
                                                        cancelCallback={cancelCallback}/>
                }
                renderForeground={() => (
                    !isSearchUp?<GroupHomeForeground searchActiveCallback={setIsSearchActive} groupState={groupState}
                                         navigation={navigation} />:
                        <FadeOut><GroupHomeForeground searchActiveCallback={setIsSearchActive} groupState={groupState}
                                         navigation={navigation} /></FadeOut>
                )}>
                <View
                    style={{height: SCREEN_HEIGHT}}
                    onTouchStart={() => {
                        setIsSearchActive(false);
                        setFingerTouching(true)
                    }}
                    onTouchEnd={() => {
                        setFingerTouching(false)
                    }}
                >
                    <StyledText>CHATS</StyledText>
                </View>
            </ParallaxScrollView>

        </View>


    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        width: "100%",
        height: '100%',
        backgroundColor: colors.background_color.grey_tablet
    },
    container_groupHeader: {
        width: "100%",
        height: "65%",
        alignSelf: 'flex-start',
    },
    container_groupNavBar: {
        width: "100%",
        height: "15%",
        margin: 0
    },
    container_groupChatHeader: {
        width: "100%",
        // 20% of the viewbox
        height: .20 * SCREEN_HEIGHT / 2.2
    }
});

export default GroupHome;