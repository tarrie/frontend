import React, {useState} from 'react';
import { Avatar, Button, Card, Title, Paragraph,List } from 'react-native-paper';
import {SCREEN_HEIGHT, normalize, colors} from "../../constants/styles";
import {View} from "react-native-web";
import {StyledText} from "../StyledText";
import {CARD_HEIGHT} from "../../constants/parameters";
import ReadMoreText from "../ReadMoreText/ReadMoreText";
  const ViewMore =()=>{
    const renderViewMore=(onPress)=>{
      return(
        <StyledText style={{color:colors.text.secondary.main}}   onPress={onPress}>See more</StyledText>
      )
    };

    const renderViewLess=(onPress)=>{
      return(
        <StyledText onPress={onPress}>View less</StyledText>
      )
    };

      return(
        <ReadMoreText
            text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do"+
              "eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut"+
              "enim ad minim veniam, quis nostrud exercitation ullamco laboris"+
              "nisi ut aliquip ex ea commodo consequat.  Duis aute irure dolor"+
              "in reprehenderit in voluptate velit esse cillum dolore eu fugiat"+
              "nulla pariatur. Excepteur sint occaecat cupidatat non proident,"+
              "sunt in culpa qui officia deserunt mollit anim id est laborum"}
        />

      )
    };


const EventCard = () => {
    return <Card style={{
        width: '82%',
        alignSelf: 'flex-end',
        marginRight: normalize(12),
        borderWidth: .4,
        borderRadius: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        marginVertical: SCREEN_HEIGHT / 100,
        borderColor: 'rgba(0,0,0,.1)'
    }}>
        <Card.Cover source={{uri: 'https://picsum.photos/700'}}/>

        <Card.Title title="Card Title" subtitle="Card Subtitle"
                    left={(props) => <Avatar.Icon {...props} icon="folder"/>}/>
        <Card.Content>
            <StyledText>Test</StyledText>
        </Card.Content>
        <Card.Content>

            <Title>Card title</Title>
            <Paragraph>Card content</Paragraph>
        </Card.Content>
        <Card.Actions>

            <ViewMore/>
        </Card.Actions>
    </Card>
};



export default EventCard;