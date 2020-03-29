import React from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import {SCREEN_HEIGHT,normalize} from "../../constants/styles";
import {View} from "react-native-web";
import {StyledText} from "../StyledText";
import {CARD_HEIGHT} from "../../constants/parameters";

const MyComponent = () => (
  <Card style={{
      height: CARD_HEIGHT,
      width:'82%',
      alignSelf:'flex-end',
      marginRight:normalize(12),
      borderWidth:.4,
      borderRadius:20,
      borderTopRightRadius:20,
      borderTopLeftRadius:20,
      marginVertical:SCREEN_HEIGHT/100,
      borderColor:'rgba(0,0,0,.1)'
  }}>
          <Card.Cover  source={{ uri: 'https://picsum.photos/700' }} />

    <Card.Title title="Card Title" subtitle="Card Subtitle" left={(props) => <Avatar.Icon {...props} icon="folder"  />} />
    <Card.Content style={{borderWidth:1}}>
         <StyledText>Test</StyledText>
    </Card.Content>
    <Card.Content>

      <Title>Card title</Title>
      <Paragraph>Card content</Paragraph>
    </Card.Content>
    <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions>
  </Card>
);



export default MyComponent;