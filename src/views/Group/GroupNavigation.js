import React, {useEffect, useContext} from "react"
import {createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import {screens} from "./routes/constants";
import {Events, Announcements, Members, GroupHome, Chats} from "./Views";
import {getGroupId, GroupContext} from "@context/GroupContext";
//import {CreateEvent} from "../../CreateEvent";
import {CreateEventNavigator} from "../CreateEvent/routes";
import {getUserId, UserContext} from "@context/UserContext";
import PropTypes from 'prop-types';

const Stack = createStackNavigator();

const GroupNavigation = ({group}) => {

    const {user} = useContext(UserContext);
    const {groupState} = useContext(GroupContext);

    /// By construction GroupNavigation is never called without both parameters filled out, but we verify this anyway
    useEffect(() => {
        console.log(`[GroupNavigation] loadGroup (groupId=${getGroupId(group)}, userId=${getUserId(user)})`);
        groupState.loadGroup({group, userId: getUserId(user)});

    }, [group]);


    return (
        <Stack.Navigator
            initialRouteName={screens.GROUP_HOME}
            gestureDirection="vertical"
            screenOptions={
                {
                    gestureEnabled: true,
                }
            }>
            <Stack.Screen name={screens.GROUP_CHAT} component={Chats}/>
            <Stack.Screen name={screens.GROUP_EVENTS} component={Events}/>
            <Stack.Screen name={screens.GROUP_ANNOUNCEMENTS} component={Announcements}/>
            <Stack.Screen name={screens.GROUP_MEMBERS} component={Members}/>
            <Stack.Screen name={screens.GROUP_HOME} component={GroupHome} options={{title: 'My home'}}/>
            <Stack.Screen name={screens.EVENT_CREATE} component={CreateEventNavigator} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
};

GroupNavigation.propTypes = {
    group: PropTypes.object.isRequired,
};

export default GroupNavigation;