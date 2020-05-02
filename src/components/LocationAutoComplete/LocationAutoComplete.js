import React from 'react';
import {Image, Text, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_API_KEY} from 'react-native-dotenv';
import {SimpleLineIcons} from "@expo/vector-icons";
import {StyledText} from "../StyledText";
import {normalize, SCREEN_HEIGHT, colors} from "../../constants/styles";


// https://cloud.google.com/maps-platform/pricing/sheet/

let BASE_URL = "https://maps.googleapis.com/maps/api/place/queryautocomplete/json?";
//GOOGLE_API_KEY


// Example POST method implementation:
async function getData(url) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        cache: 'force-cache', // *default, no-cache, reload, force-cache, only-if-cached
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

// Based on https://developers.google.com/places/web-service/query
const  LocationAutoComplete = async ({text, caretPosition, location, radius}) => {

    // these params are required. text input String + Google API Key
    let queryParams = `input=${text}&key=${GOOGLE_API_KEY}&language=en`;

    // The character position in the input term at which the service uses text for
    // predictions. For example, if the input is 'Googl' and the completion point is 3,
    // the service will match on 'Goo'. The offset should generally be set to the position of
    // the text caret. If no offset is supplied, the service will use the entire term.
    if ((caretPosition !== undefined)) {
        queryParams += `&offset=${caretPosition}`
    }

    //The point around which you wish to retrieve place information. Must be specified as latitude,longitude.
    if ((location !== undefined)) {
        queryParams += `&location=${location.latitude},${location.longitude}`
    }

    //The distance (in meters) within which to return place results. Note that setting a radius biases
    // results to the indicated area, but may not fully restrict results to the specified area.
    // See Location Biasing for more information.
    if ((radius !== undefined)) {
        queryParams += `&radius=${radius}`
    }
    
    return await getData(BASE_URL+queryParams)
};



export default LocationAutoComplete;

