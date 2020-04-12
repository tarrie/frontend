import React, {useEffect, useState,useContext} from "react"
import {View, StyleSheet, TouchableWithoutFeedback, Keyboard} from "react-native"
import {SafeAreaView} from "react-native-safe-area-context"
import {colors, normalize} from "../../../constants/styles";
import PostPhoto from "./PostPhoto";
import {UserContext} from "../../../contex/UserContext";
import EventTopNavBar from "../EventTopNavBar/EventTopNavBar";


// The actual post page
const UploadPicture = ({route, navigation}) => {
    const [eventImg, setEventImg] = useState({uri: undefined, base64: undefined});


    useEffect(() => {
        // Set the tabbar to visible just in case - we remove this for the camera
        navigation.setOptions({
            tabBarVisible: true
        });

        // get data for the options
        // use the `uri' to display data
        // use the `base64' to send data
        if( (route.params !== undefined) && ('uri' in route.params)) {
            setEventImg({uri: route.params.uri, base64: route.params.base64});
        }

    }, [route]);

    /**
     * Called when picture is closed
     */
    const onPictureCloseCallback = () => {
        setEventImg({uri: undefined, base64: undefined})
        };


    /**
     * Called after user hits the post button - clean up state
     */
    const onPostFinished = () => {
        setEventImg({uri: undefined, base64: undefined});
    };

    return (
            <SafeAreaView style={styles.container}>

                <EventTopNavBar navigation={navigation}/>
                <View style={styles.photos_container}>
                    <PostPhoto img={eventImg} onCloseCallback={onPictureCloseCallback} />
                </View>
            </SafeAreaView>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor:  colors.background_color.grey_tablet
    },

    photos_container: {
        flexDirection: 'row',
        width: '100%',
        height: '30%',
        justifyContent: 'space-around',
        marginBottom: normalize(100)
    },

    title_container: {
        borderColor: colors.general.black,
        height: '15%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }

});

export default UploadPicture;
