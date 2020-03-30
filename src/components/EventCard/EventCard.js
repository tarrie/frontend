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


        <ImageBackground source={{uri: 'https://picsum.photos/700'}} style={{width: '100%', height: 180,backgroundColor:'#C8C8C8'}}>

            <View style={{backgroundColor:'#C8C8C8'}}/>

            <TouchableOpacity style={{
                alignSelf: 'flex-end',
                width: 30,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',

            }}>
                <Entypo name={'dots-three-vertical'} size={35} style={{
                    color: 'white', shadowOpacity: .5,
                    shadowRadius: 2,
                    shadowColor: '#000000',
                    textShadowOffset: {width: 5, height: 2},
                    textShadowRadius: 10,
                    shadowOffset: {
                        width: 1,            // Same rules apply from above
                        height: 0,           // Can't both be 0
                    }
                }}/>
            </TouchableOpacity>
        </ImageBackground>


        <Card.Title title="Boogo Party Get Fucked" subtitle='Coordinators: Lala & Tom'
                    left={(props) => <Avatar.Image {...props} source={{uri: 'https://picsum.photos/700'}}/>}/>


        <Card.Actions style={{color: 'rgb(248,248,248)', width: '100%', flexDirection: 'column'}}>
            <ShareSaveRSVP/>
            <EventActionStrip/>
        </Card.Actions>
        <Card.Content>
            <StyledText size={20} type={'black'}>WHEN</StyledText>
            <EventTime startTime={moment().toISOString()}
                       endTime={moment().add({'seconds': getRndInteger(3600 / 4, 86399)}).toISOString()}/>
        </Card.Content>
        <Card.Content style={{marginTop: 15}}>
            <StyledText size={20} type={'black'}>WHERE</StyledText>
            <Title>Card title</Title>
            <Paragraph>Card content</Paragraph>
        </Card.Content>


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