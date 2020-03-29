import React from 'react';
import {View, Text} from "react-native"
import {StyledText} from "../StyledText";
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import {SCREEN_HEIGHT, normalize, colors} from "../../constants/styles";


const Share = () => (
    <View style={
        {
            position: 'relative',
            width: '100%',
            alignSelf: 'flex-end',
        }
    }>
        <StyledText>Share </StyledText>
        </View>
);




export default Share;