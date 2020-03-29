import React from "react"
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
const Stack = createStackNavigator();
import {screens} from "./constants";
import {Events,Announcements,Members,GroupHome,Chats} from "../Views";

const GroupTopNavigation = () =>{
return (
        <Stack.Navigator
            initialRouteName={screens.GROUP_HOME}
            gestureDirection="vertical"
            screenOptions={
                {
                    gestureEnabled: true,
                }
            }>
            <Stack.Screen name={screens.GROUP_CHAT} component={Chats} />
            <Stack.Screen name={screens.GROUP_EVENTS} component={Events} />
            <Stack.Screen name={screens.GROUP_ANNOUNCEMENTS} component={Announcements} />
            <Stack.Screen name={screens.GROUP_MEMBERS} component={Members} />
            <Stack.Screen name={screens.GROUP_HOME} component={GroupHome} options={{ title: 'My home' }} />
        </Stack.Navigator>
    )
};

export default GroupTopNavigation;