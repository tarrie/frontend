import React from 'react';
import {View, Text} from "react-native"
import {StyledText} from "../StyledText";
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import {SCREEN_HEIGHT, normalize, colors} from "../../constants/styles";


const StickyDate = ({marginTop, isActiveDate}) => (
    <View style={
        {
            borderWidth:1,
            position: 'relative',
            top:marginTop,
            width: '100%',
            alignSelf: 'flex-end',
        }
    }>

        <View>


            <View style={{height: 60, width:50, alignItems:'center',justifyContent:'center'}}>
                <StyledText style={
                    {
                        alignItems:'center',
                        justifyContent:'center',
                        color:isActiveDate?colors.general.hot_purple:colors.text.primary.main}}>Tue</StyledText>
                <View style={{
                    backgroundColor:isActiveDate?colors.secondary.light:'transparent',
                    height: 38,
                    width: 38,
                    borderRadius: 38 / 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: isActiveDate?0: -SCREEN_HEIGHT/100
                }}>
                    <StyledText type={isActiveDate?'book':'bold'}  size = {isActiveDate?null:SCREEN_HEIGHT/35} style={{color:isActiveDate?colors.background_color.white:colors.text.primary.main}}>23</StyledText>
                </View>
            </View>



            <View style={{width: '75%', height: 0}}>
            </View>
        </View>
    </View>
);

StickyDate.defaultProps = {
    isActiveDate: false
};



export default StickyDate;