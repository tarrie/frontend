import React, {useEffect, useState, useContext, useRef} from "react"
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    TextInput,
    Text,
    ScrollView,
    Keyboard,
    TouchableOpacity, TouchableHighlight
} from "react-native"
import {SafeAreaView} from "react-native-safe-area-context"
import {colors, fontTypes, normalize, SCREEN_WIDTH} from "../../constants/styles";
import UploadPhoto from "./UploadPicture/UploadPhoto";
import {UserContext} from "../../context/UserContext";
import EventTopNavBar from "./EventTopNavBar/EventTopNavBar";
import { Input } from 'react-native-elements';
import {StyledText} from "../../components/StyledText";
import {Location} from "./LocationSearch";
import {GetDate,initialDate} from "../../components/GetDate";
import {GenericCreateEventOption} from "../../components/GenericCreateEventOption";
import {screens} from "./routes/screens";
import {ActualLocation} from "./LocationSearch";
import {GroupContext} from "../../context/GroupContext";
import {oneButtonAlert} from "../../utils";

// ToDo: purple is the new green
// The actual post page--
const CreateEventHome = ({route, navigation}) => {
    const [eventImgUri, setEventImgUri] = useState(null);
    const [location, setLocation] = useState();
    const [infoText, setInfoText] = useState(null);
    let datetime=null;
    let title = null;
    let isEndDateBeforeStart = false;

    const groupState = useContext(GroupContext); //undefined if not in a group
    const userState = useContext(UserContext);


    // Options + callback for the  `virtual' option
    const virtualCallBack = ()=>{
        navigation.navigate(screens.Location, {
            })
    };
    const virtualEventOptions = {actionType:"virtual",actionCallback:virtualCallBack,hasSwitch:false};

    // Options + callback for the  `virtual' option
    const tagsCallBack = ()=>{
                navigation.navigate(screens.HashTags, {
            })
    };
    const tagsOptions = {actionType:"tags",actionCallback:tagsCallBack,hasSwitch:false};


    // Options + callback for Adding More info to event
    const addInfoCallBack = (text)=>{
        setInfoText(text)
    };
    const addInfoOptions = {
        actionType:"info",
        actionCallback:addInfoCallBack,
        hasSwitch:false,
        infoText:infoText
    };


    // Options + callback for the  `location' option - when it's initially empty
    const addLocationCallBack = ()=>{
        navigation.navigate(screens.Location, {
            })
    };

    // Callback when location data is filled out but the user wants to edit it
    const locationPressCallBack = (location)=>{
        navigation.navigate(screens.Location, {location:location})
    };
    const addLocationOptions = {actionType:"location",actionCallback:addLocationCallBack,hasSwitch:false};


    /**
     * ToDo: Make this more general this calls groupState, to create and event, should work for both
     */
    const createEventCallback = async ()=>{

        if (isEndDateBeforeStart){
            oneButtonAlert("Cannot Create Event","The start date must be before the end date." );
            return;
        }

        if (groupState !== undefined){
            //let dateTime = datetimeObj.dateTime.dateTime;
            console.log("[CreateEventHome.js] Group event about to be created");
            return groupState.groupState.createEvent({location,infoText,datetime,eventImgUri,title});

        }else{
            // ToDo: HANDLE EVENTS CREATED BY USERS
            console.log("[CreateEventHome.js] User event about to be created")
        }
        navigation.goBack()

    };


    const datetimeChangedCallback =(_datetimeObj,_isEndDateBeforeStart)=>{
        isEndDateBeforeStart = _isEndDateBeforeStart;
        datetime=_datetimeObj;
    };

    useEffect(() => {
        // Set the tabbar to visible just in case - we remove this for the camera
        navigation.setOptions({
            tabBarVisible: true
        });

        // get data for the options
        // use the `uri' to display data
        // use the `base64' to send data
        if ((route.params !== undefined) && ('uri' in route.params)) {
            //setEventImgUri({uri: route.params.uri, base64: route.params.base64});
            setEventImgUri(route.params.uri);

        }


        if ((route.params !== undefined) && ('location' in route.params)) {
            setLocation(route.params.location)
        }

    }, [route]);

    /**
     * Called when picture is closed
     */
    const onPictureCloseCallback = () => {
        setEventImgUri(undefined);
    };

    const dismissKeyboard =()=>{
        Keyboard.dismiss();
    };


    return (
        <SafeAreaView style={styles.container}>

            <EventTopNavBar navigation={navigation} createEventCallback={createEventCallback}/>
            <View style={styles.photo_title_container}>
                <TouchableOpacity style={styles.photos} onPress={dismissKeyboard} activeOpacity={1}>
                    <UploadPhoto uri={eventImgUri} onCloseCallback={onPictureCloseCallback}/>
                </TouchableOpacity>

                <TextInput
                    onChangeText={(txt)=>{title = txt}}
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

            <TouchableOpacity style={{borderWidth:1, width:'100%', flexDirection: 'column'}}  onPress={dismissKeyboard} activeOpacity={1}>

                {location?
                    <ActualLocation location={location} callbackFN={locationPressCallBack}/>:
                    <GenericCreateEventOption options={addLocationOptions}/>
                }

                <GetDate datetimeChangedCallback={datetimeChangedCallback}/>

                <GenericCreateEventOption options={addInfoOptions}/>
                <GenericCreateEventOption options={tagsOptions}/>
            </TouchableOpacity>


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

export default CreateEventHome;
