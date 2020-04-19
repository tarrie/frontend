import React from 'react';
import {Image, Text, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_API_KEY} from 'react-native-dotenv';
import {SimpleLineIcons} from "@expo/vector-icons";
import {StyledText} from "../StyledText";
import {normalize, SCREEN_HEIGHT, colors} from "../../constants/styles";

const homePlace = {description: 'Home', geometry: {location: {lat: 48.8152937, lng: 2.4597668}}};
const workPlace = {description: 'Work', geometry: {location: {lat: 48.8496818, lng: 2.2940881}}};


const GooglePlacesInput = () => {
    return (
        <View style={{flexDirection: 'row', marginVertical: 5, borderWidth: 1, alignItems: 'center', height: 60}}>
            <SimpleLineIcons name={'location-pin'} size={25} style={{
                marginLeft: normalize(5),
                marginRight: normalize(15),
                color: colors.primary.dark
            }}/>
            <StyledText size={SCREEN_HEIGHT / 50} style={{color: colors.text.primary.light}} type={'semibold'}>
                Location
            </StyledText>

            <GooglePlacesAutocomplete
                placeholder='Search'
                minLength={2} // minimum length of text to search
                autoFocus={false}
                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                listViewDisplayed='auto'    // true/false/undefined
                fetchDetails={true}
                renderDescription={row => row.description} // custom description render
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                    console.log(data, details);
                }}

                getDefaultValue={() => ''}

                query={{
                    // available options: https://developers.google.com/places/web-service/autocomplete
                    key: GOOGLE_API_KEY,
                    language: 'en', // language of the results
                    types: '(cities)' // default: 'geocode'
                }}

                styles={{
                    textInputContainer: {
                        width: '100%'
                    },
                    description: {
                        fontWeight: 'bold'
                    },
                    predefinedPlacesDescription: {
                        color: '#1faadb'
                    }
                }}

                currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                currentLocationLabel="Current location"
                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                GoogleReverseGeocodingQuery={{
                    // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                }}
                GooglePlacesSearchQuery={{
                    // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                    rankby: 'distance',
                    type: 'cafe'
                }}

                GooglePlacesDetailsQuery={{
                    // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                    fields: 'formatted_address',
                }}

                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                predefinedPlaces={[homePlace, workPlace]}

                debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                renderLeftButton={() => <Text>put</Text>}
                renderRightButton={() => <Text>Custom text after the input</Text>}
                renderHeaderComponent={() => <Text>Cus</Text>}
                renderNoResults={() => <Text>Custom component to be rendered when no results are found</Text>}
            />

        </View>
    )
};


export default GooglePlacesInput;