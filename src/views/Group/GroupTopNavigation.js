import React, {useEffect,useContext} from "react"
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import {screens} from "./routes/constants";
import {Events,Announcements,Members,GroupHome,Chats} from "./Views";
import {GroupContext} from "../../contex/GroupContext";

const Stack = createStackNavigator();

const GroupTopNavigation = ({ groupId, userId }) =>{

    const {groupState} = useContext(GroupContext);

    useEffect(()=>{
        if (userId && groupId){
            groupState.loadGroup({groupId,userId});
        }
      },[groupId,userId]);


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