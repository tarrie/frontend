import React from 'react';
import {Image, Text, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_API_KEY} from 'react-native-dotenv';
import {SimpleLineIcons} from "@expo/vector-icons";
import {StyledText} from "../StyledText";
import {normalize, SCREEN_HEIGHT, colors} from "../../constants/styles";


// https://cloud.google.com/maps-platform/pricing/sheet/
//https://developers.google.com/places/web-service/details
let BASE_URL = "https://maps.googleapis.com/maps/api/place/details/json?";
const FIELDS = "name,address_component,geometry,formatted_address";

/*
    public String state;
    public String city;
    public int zipCode;
    public String line1;
    public String line2;
    public String locName;
    public float latitude;
    public float longitude;
*/

const parseToLocationFormat = (response_obj, place_id)=>{
    let return_obj = {};
    if (typeof response_obj === 'object' && response_obj !== null){
        if ('result' in response_obj){

            if ('address_components' in response_obj.result){
                return_obj['address_components'] = response_obj.result.address_components;
            }

            if ('geometry' in response_obj.result && 'location' in response_obj.result.geometry){
                return_obj['location'] = response_obj.result.geometry.location;
            }

            if ('name' in response_obj.result){
                return_obj['name'] = response_obj.result.name;
            }

            if ('formatted_address' in response_obj.result){
                return_obj['formatted_address'] = response_obj.result.formatted_address;
            }

        }

    }
    return_obj['place_id'] = place_id;

    return return_obj;

};

async function getData(url, place_id) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        cache: 'force-cache' // *default, no-cache, reload, force-cache, only-if-cached
        //body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    const response_obj = await response.json();
    return parseToLocationFormat(response_obj,place_id)
}



const  LocationDetail = async ({place_id,sessiontoken}) => {
    // restrict results to the us
    // these params are required. text input String + Google API Key
    let queryParams = `place_id=${place_id}&key=${GOOGLE_API_KEY}&language=en&fields=${FIELDS}`;

    if (sessiontoken){
        queryParams+=`&sessiontoken=${sessiontoken}`
    }

    console.log(BASE_URL+queryParams);
    //return TEST_DATA.predictions
    return place_id? await getData(BASE_URL+queryParams,place_id ) : []
};



export default LocationDetail;

