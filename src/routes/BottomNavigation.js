import React, {useContext,useEffect} from "react"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import {Platform,View} from 'react-native';
import {Inbox,Calendar,Group} from "../views";
import {screens} from "./constants";
import {colors, normalize, sizes, SCREEN_HEIGHT,SCREEN_WIDTH} from "@constants/styles";
import {
    FontAwesome,
    Ionicons,
    SimpleLineIcons,
    AntDesign,
    Entypo

} from '@expo/vector-icons';
import StyledText from "../components/StyledText/StyledText";
import {  StyleSheet } from "react-native"
import {UserContext} from "@context/UserContext";
import {getGroupId} from "../context/GroupContext";
import {TEST_GROUP} from "@context/GroupContext/useGroup";
import {getFormattedUserId} from "@context/UserContext/UserContext";
const BottomTab = createBottomTabNavigator();

const BottomTabText = ({focused, children}) => {


    return (
        <StyledText
            type={focused ? 'black' : 'book'}
            size={normalize(8)}
            style={{color: focused ?  colors.secondary.light : colors.text.primary.main}}>
            {children}
        </StyledText>
    )
};


const BottomNavigation = () => {

    // ToDo: On login make sure we get user info
  const { isLoggedIn, user} = useContext(UserContext);

    return (
        <BottomTab.Navigator
            tabBarOptions={{
                inactiveTintColor: colors.text.primary.light,
                style: {backgroundColor: 'rgba(0,0,0,.08)', borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,.1)'},
                activeTintColor: colors.secondary.light,
            }}
        >

            <BottomTab.Screen
                name={screens.CALENDAR}
                component={Calendar}
                options={{
                    tabBarLabel: ({focused}) => <BottomTabText focused={focused}> YOUR CALENDAR</BottomTabText>,
                    tabBarIcon: ({focused, size}) => (
                        <Entypo
                            name="calendar"
                            size={size*1.2}
                            color={focused ?  colors.secondary.light : colors.text.primary.main}
                        />
                    )
                }}
            />



            <BottomTab.Screen
                name={screens.HOME}
                component={Group}
                initialParams={{group:TEST_GROUP}}
                options={{
                    tabBarLabel: ({focused}) => <BottomTabText focused={focused}> {isLoggedIn?getFormattedUserId(user):'HOME' }</BottomTabText>,
                    tabBarIcon: ({focused, size}) => (
                        <View style={[styles.fab,focused?styles.fab_active:styles.fab_inactive]}>
                        <SimpleLineIcons name={"home"} size={size} style={focused? styles.fab_icon_active: styles.fab_icon_inactive}/>
                        </View>
                    )
                }}
            />

            <BottomTab.Screen
                name={screens.INBOX}
                component={Inbox}
                options={{
                    tabBarLabel: ({focused}) => <BottomTabText focused={focused}> INBOX</BottomTabText>,
                    tabBarIcon: ({focused, size}) => (
                        <AntDesign
                            name="mail"
                            size={size}
                            color={focused ?  colors.secondary.light : colors.text.primary.main}
                        />
                    )
                }}
            />

        </BottomTab.Navigator>
    );
};

const styles = StyleSheet.create({
    fab: {
        alignSelf:'center',
        marginBottom: 35,
        width:normalize(50),
        height: normalize(50),
        borderRadius: normalize(50)/2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fab_active:{
        backgroundColor: colors.primary.extra_dark,
        color: colors.background_color.white
    },
    fab_inactive:{
        borderWidth:1.5,
        borderColor: 'rgba(0,0,0,.1)',
        backgroundColor: '#F4F5F7'
    },
    fab_icon_active:{
        color: colors.background_color.white
    },
    fab_icon_inactive:{
        color: colors.secondary.main
    }
});

export default BottomNavigation;