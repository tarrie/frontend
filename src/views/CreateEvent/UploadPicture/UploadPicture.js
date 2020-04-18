import React, {useEffect, useState, useContext} from "react"
import {View, StyleSheet, TouchableWithoutFeedback, Keyboard,TextInput,Text} from "react-native"
import {SafeAreaView} from "react-native-safe-area-context"
import {colors, fontTypes, normalize, SCREEN_WIDTH} from "../../../constants/styles";
import PostPhoto from "./PostPhoto";
import {UserContext} from "../../../contex/UserContext";
import EventTopNavBar from "../EventTopNavBar/EventTopNavBar";
import { Input } from 'react-native-elements';
import {StyledText} from "../../../components/StyledText";
import {Location} from "../../../components/Location";
import {GetDate} from "../../../components/GetDate";

// ToDo: purple is the new green
// The actual post page--
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
        if ((route.params !== undefined) && ('uri' in route.params)) {
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
            <View style={styles.photo_title_container}>
                <View style={styles.photos}>
                    <PostPhoto img={eventImg} onCloseCallback={onPictureCloseCallback}/>
                </View>
                <TextInput
                    style={styles.title}
                    multiline
                    maxLength={100}
                    numberOfLines={4}
                    placeholder='Event Title'
                    textAlignVertical={'top'}
                    textBreakStrategy={'highQuality'}
                    caretHidden={true}
                    selectionColor={colors.primary.dark}
                />
            </View>

            <View style={{borderWidth:1, width:'100%', flexDirection: 'column'}}>
                <Location/>
                <GetDate/>
            </View>


        </SafeAreaView>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: colors.background_color.grey_tablet
    },
    photo_title_container: {
        flexDirection:'row',
        marginVertical: 20,

    },
    title:{
        width: SCREEN_WIDTH/2.15,
        paddingLeft:normalize(15),
        paddingVertical:normalize(5),
        fontFamily: fontTypes['bold'],
        fontSize:20

    },
    text_inputContainer:{
        borderWidth:undefined
    },
    photos: {
        width: SCREEN_WIDTH/2.15,
        height: SCREEN_WIDTH/2.15,
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
