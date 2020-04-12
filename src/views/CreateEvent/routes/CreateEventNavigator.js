import React from "react"
import { CameraApp } from "../../../components/CameraApp";
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import UploadPicture from "../UploadPicture/UploadPicture";
import {screens} from "./screens";
import CreateEventHome from "../CreateEventHome/CreateEventHome";
const Stack = createStackNavigator();


const CreateEventNavigator = () => {
    return (
        <Stack.Navigator gestureDirection="vertical"
            initialRouteName={screens.ImgUpload}
            screenOptions={
                {
                    gestureDirection: 'vertical-inverted',
                    gestureEnabled: true,
                    headerShown: false,
                    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
                }
            }>
            <Stack.Screen name={screens.ImgUpload} component={UploadPicture} />
            <Stack.Screen name={screens.CameraApp} component={CameraApp} options={{headerShown: false}} />
            <Stack.Screen name={screens.CreateEventHome} component={CreateEventHome} />

        </Stack.Navigator>
    )
};



export default CreateEventNavigator;