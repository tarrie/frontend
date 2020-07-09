import React, {useContext, useEffect, useRef, useState} from 'react';
import {Image, Text, View, StyleSheet, TouchableOpacity, TextInput, FlatList} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import {SafeAreaView} from "react-native-safe-area-context";
import {SimpleLineIcons} from "@expo/vector-icons";
import {StyledText} from "../../../components/StyledText";
import {normalize, SCREEN_HEIGHT, colors, SCREEN_WIDTH} from "../../../constants/styles";
import {UserContext} from "../../../contex/UserContext";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native"
import {LocationAutoComplete,LocationDetail} from "../../../components/LocationAutoComplete";
import {EvilIcons} from "@expo/vector-icons";
import { v4 as uuidv4 } from 'react-native-uuid';
import {screens} from "../routes/screens";


const ActualLocation = ({location, callbackFN, style }) => {



    const onPress = ()=>{
        callbackFN(location);
    };
    // marginVertical: 5 for mainscreen
    return (
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center',height: 60, width:'100%', ...style}} onPress={onPress}>
            <EvilIcons name={'location'} size={SCREEN_WIDTH/14} style={{
                color: colors.primary.extra_dark,
            }}/>

            <View style={{marginBottom:5, width:SCREEN_WIDTH/1.3}}>

                <StyledText style={{color:colors.text.primary.light}} type={'bold'}>
                    {location.name}
                </StyledText>

                {'formatted_address' in location &&
                <StyledText style={{color:colors.text.primary.main}}>
                    {location.formatted_address}
                </StyledText>}
            </View>
        </TouchableOpacity>
    )
};

export default ActualLocation;