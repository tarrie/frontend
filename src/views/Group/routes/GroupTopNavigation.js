import React from "react"
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
const Stack = createStackNavigator();
import {screens} from "../../../routes/constants";
import {Events,Announcements,Members} from "../Views";

const GroupTopNavigation = () =>{
return (
        <Stack.Navigator gestureDirection="vertical"
            screenOptions={
                {
                    gestureDirection: 'vertical-inverted',
                    gestureEnabled: true,
                    headerShown: false,
                    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
                }
            }>
            <Stack.Screen name={screens.GROUP_EVENTS} component={Events} />
            <Stack.Screen name={screens.GROUP_ANNOUNCEMENTS} component={Announcements} />
            <Stack.Screen name={screens.GROUP_MEMBERS} component={Members} />

        </Stack.Navigator>
    )
};

export default GroupTopNavigation;