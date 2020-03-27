import React from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import {SCREEN_HEIGHT} from "../../constants/styles";

const MyComponent = () => (
  <Card style={{width:'90%', marginVertical:SCREEN_HEIGHT/100}}>
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