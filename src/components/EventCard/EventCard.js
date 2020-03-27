import React from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import {SCREEN_HEIGHT,normalize} from "../../constants/styles";

const MyComponent = () => (
  <Card style={{
      width:'85%',
      alignSelf:'flex-end',
      marginRight:normalize(4),
      borderWidth:.4,
      borderRadius:20,
      marginVertical:SCREEN_HEIGHT/100,
      borderColor:'rgba(0,0,0,.1)'
  }}>
    <Card.Title title="Card Title" subtitle="Card Subtitle" left={(props) => <Avatar.Icon {...props} icon="folder" />} />
    <Card.Content>
      <Title>Card title</Title>
      <Paragraph>Card content</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions>
  </Card>
);



export default MyComponent;