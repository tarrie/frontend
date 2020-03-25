import React from "react"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import {Platform} from 'react-native';
import {Chats, Announcements, Events} from "../views";
import {screens} from "./constants";
import {colors,normalize,sizes} from "../constants/styles";
import {
    FontAwesome,
    Ionicons
} from '@expo/vector-icons';
import StyledText from "../components/StyledText/StyledText";

const BottomTab = createBottomTabNavigator();


const BottomTabText = ({ focused, children})=>{
    return (
        <StyledText
            type={'black'}
            size={normalize(9)}
            style={{color:focused ? colors.primary.main : colors.text.secondary.light}}>
            {children}
        </StyledText>
    )
};

const BottomNavigation = () => {
    return (
        <BottomTab.Navigator
        tabBarOptions ={{
            inactiveTintColor: colors.text.primary.light,
            style: {backgroundColor:'rgba(0,0,0,.1)', borderTopWidth:1,borderTopColor:'rgba(0,0,0,.1)'},
            activeTintColor:colors.primary.main,
        }}
        >
            <BottomTab.Screen
                name={screens.ANNOUNCEMENTS}
                component={Announcements}
                options={{
                    tabBarLabel:({focused})=> <BottomTabText focused={focused}> ALERTS</BottomTabText>,
                    tabBarIcon: ({focused, size}) => (
                        <FontAwesome
                            name="bullhorn"
                            size={size}
                            color={focused ? colors.primary.main : colors.text.secondary.light}
                        />
                    )
                }}
            />

            <BottomTab.Screen
                name={screens.CHATS}
                component={Chats}
                options={{
                    tabBarLabel: ({focused})=> <BottomTabText focused={focused}> CHATS</BottomTabText>,
                    tabBarIcon: ({focused, size}) => (
                        <FontAwesome
                            name={"comments-o" }
                            size={size}
                            color={focused ? colors.primary.main : colors.text.secondary.light}
                        />
                    )
                }}
            />

            <BottomTab.Screen
                name={screens.Events}
                component={Events}
                options={{
                    tabBarLabel: ({focused})=> <BottomTabText focused={focused}> EVENTS</BottomTabText>,
                    tabBarIcon: ({focused, size}) => (
                        <Ionicons
                            name="md-calendar"
                            size={size}
                            color={focused ? colors.primary.main : colors.text.secondary.light}
                        />
                    )
                }}
            />
        </BottomTab.Navigator>
    );
};

export default BottomNavigation;