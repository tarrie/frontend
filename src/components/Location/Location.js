import React from 'react';
import { Image, Text , View} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY } from 'react-native-dotenv';
import {SimpleLineIcons} from "@expo/vector-icons";
import {StyledText} from "../StyledText";
import {normalize, SCREEN_HEIGHT} from "../../constants/styles";

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};


const GooglePlacesInput = () => {
  return (
      <View style={{flexDirection: 'row', marginVertical:5, borderWidth:1, alignItems:'center', height:60}}>
          <SimpleLineIcons name={'location-pin'} size={25} style={{marginLeft:normalize(5),marginRight:normalize(15),color:'rgba(47,79,79,0.65)'}} />
          <StyledText size={SCREEN_HEIGHT/50} style={{color:'rgba(47,79,79,0.65)'}} type={'semibold'}>
              Location
          </StyledText>
      </View>
  )
};


export default GooglePlacesInput;