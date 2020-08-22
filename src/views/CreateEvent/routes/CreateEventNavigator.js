import React from "react"
import {CameraApp} from "../../../components/CameraApp";
import {createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import {screens} from "./screens";
import CreateEventHome from "../CreateEventHome";
import {Location} from "../LocationSearch";
import {HashTags} from "../HashTags";

const Stack = createStackNavigator();

const CreateEventNavigator = ({route}) => {
    return (
        <Stack.Navigator gestureDirection="vertical"
                         initialRouteName={screens.CreateEventHome}
                         screenOptions={
                             {
                                 gestureDirection: 'vertical-inverted',
                                 gestureEnabled: true,
                                 headerShown: false,
                                 cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
                             }
                         }>
            <Stack.Screen name={screens.CreateEventHome} component={CreateEventHome} initialParams={route.params}/>
            <Stack.Screen name={screens.CameraApp} component={CameraApp} options={{headerShown: false}}/>
            <Stack.Screen name={screens.Location} component={Location} options={
                {
                    headerShown: false,
                    gestureDirection: 'horizontal',
                    gestureEnabled: true,
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                }
            }/>

            <Stack.Screen name={screens.HashTags} component={HashTags} options={
                {
                    headerShown: false,
                    gestureDirection: 'horizontal',
                    gestureEnabled: true,
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                }
            }/>

            </Stack.Navigator>
    )
};


export default CreateEventNavigator;