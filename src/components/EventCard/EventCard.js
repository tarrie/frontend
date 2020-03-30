import React, {useState} from 'react';
import {Avatar, Button, Card, Title, Paragraph, List} from 'react-native-paper';
import {SCREEN_HEIGHT, normalize, colors} from "../../constants/styles";
import {StyledText} from "../StyledText";
import {CARD_HEIGHT} from "../../constants/parameters";
import ReadMoreText from "../ReadMoreText/ReadMoreText";
import EventTime from "./EventTime";
import moment from "moment";
import EventActionStrip from "./EventActionStrip";
import ShareSaveRSVP from "./ShareSaveRSVP";
import {
    MaterialIcons,
    FontAwesome,
    Ionicons,
    SimpleLineIcons,
    AntDesign,
    Feather,
    Entypo

} from '@expo/vector-icons';
import {ImageBackground, View, TouchableOpacity} from "react-native";
import EventLocation from "./EventLocation";
import EventName from "./EventName";
import { Image } from 'react-native-elements';
import { ActivityIndicator } from 'react-native';


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


const EventCard = ({bio}) => {
    return <Card style={{
        width: '85%',
        alignSelf: 'flex-end',
        marginRight: normalize(12),
        padding: 0,
        borderWidth: .4,
        borderRadius: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        marginVertical: SCREEN_HEIGHT / 100,
        borderColor: 'rgba(0,0,0,.1)',
        position:'relative',
        top:-SCREEN_HEIGHT/20
    }}>


        <Image
            PlaceholderContent={<ActivityIndicator />}
            containerStyle={{borderRadius:40}}
            source={{uri: 'https://picsum.photos/700'}}
            style={{width: '100%', height: SCREEN_HEIGHT/5,borderRadius:20}}/>



        <EventName/>


        <View style={{color: 'rgb(248,248,248)', width: '100%', flexDirection: 'column'}}>
            <ShareSaveRSVP/>
            <EventActionStrip/>
        </View>

            <EventTime startTime={moment().toISOString()}
                       endTime={moment().add({'seconds': getRndInteger(3600 / 4, 86399)}).toISOString()}/>

            <EventLocation/>


        <Card.Actions>

            <ReadMoreText text={bio}/>
        </Card.Actions>
    </Card>
};


EventCard.defaultProps = {
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do" +
        "eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut" +
        "enim ad minim veniam, quis nostrud exercitation ullamco laboris" +
        "nisi ut aliquip ex ea commodo consequat.  Duis aute irure dolor" +
        "in reprehenderit in voluptate velit esse cillum dolore eu fugiat" +
        "nulla pariatur. Excepteur sint occaecat cupidatat non proident," +
        "sunt in culpa qui officia deserunt mollit anim id est laborum"
};


export default EventCard;