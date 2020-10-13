import React from 'react';
import {Image, Text, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_API_KEY} from 'react-native-dotenv';
import {SimpleLineIcons} from "@expo/vector-icons";
import {StyledText} from "../StyledText";
import {normalize, SCREEN_HEIGHT, colors} from "../../constants/styles";


// https://cloud.google.com/maps-platform/pricing/sheet/

let BASE_URL = "https://maps.googleapis.com/maps/api/place/autocomplete/json?";

const TEST_DATA = {
   "predictions" : [
      {
         "description" : "Indie Cafe, North Broadway, Chicago, IL, USA",
         "id" : "945f532283b967d92fa92aa05b531a78a9cdd481",
         "matched_substrings" : [
            {
               "length" : 10,
               "offset" : 0
            }
         ],
         "place_id" : "ChIJlZgEvinRD4gRiVAci0pwvB8",
         "reference" : "ChIJlZgEvinRD4gRiVAci0pwvB8",
         "structured_formatting" : {
            "main_text" : "Indie Cafe",
            "main_text_matched_substrings" : [
               {
                  "length" : 10,
                  "offset" : 0
               }
            ],
            "secondary_text" : "North Broadway, Chicago, IL, USA"
         },
         "terms" : [
            {
               "offset" : 0,
               "value" : "Indie Cafe"
            },
            {
               "offset" : 12,
               "value" : "North Broadway"
            },
            {
               "offset" : 28,
               "value" : "Chicago"
            },
            {
               "offset" : 37,
               "value" : "IL"
            },
            {
               "offset" : 41,
               "value" : "USA"
            }
         ],
         "types" : [ "restaurant", "food", "point_of_interest", "establishment" ]
      },
      {
         "description" : "Cafe CO2, Bhugaon, Pune, Maharashtra, India",
         "id" : "db5baf722e87c42184c32325220c8fe169317180",
         "matched_substrings" : [
            {
               "length" : 4,
               "offset" : 0
            },
            {
               "length" : 5,
               "offset" : 38
            }
         ],
         "place_id" : "ChIJpzdMkei9wjsRt5FimG97JNs",
         "reference" : "ChIJpzdMkei9wjsRt5FimG97JNs",
         "structured_formatting" : {
            "main_text" : "Cafe CO2",
            "main_text_matched_substrings" : [
               {
                  "length" : 4,
                  "offset" : 0
               }
            ],
            "secondary_text" : "Bhugaon, Pune, Maharashtra, India",
            "secondary_text_matched_substrings" : [
               {
                  "length" : 5,
                  "offset" : 28
               }
            ]
         },
         "terms" : [
            {
               "offset" : 0,
               "value" : "Cafe CO2"
            },
            {
               "offset" : 10,
               "value" : "Bhugaon"
            },
            {
               "offset" : 19,
               "value" : "Pune"
            },
            {
               "offset" : 25,
               "value" : "Maharashtra"
            },
            {
               "offset" : 38,
               "value" : "India"
            }
         ],
         "types" : [
            "night_club",
            "bar",
            "restaurant",
            "food",
            "point_of_interest",
            "establishment"
         ]
      },
      {
         "description" : "Cafe Madras, Bhaudaji Road, Matunga, Mumbai, Maharashtra, India",
         "id" : "d71f764cac186b75cba6a1d00b6455c7e854aa4e",
         "matched_substrings" : [
            {
               "length" : 4,
               "offset" : 0
            },
            {
               "length" : 5,
               "offset" : 58
            }
         ],
         "place_id" : "ChIJnTFg-ijP5zsRNe1t9nYeEPg",
         "reference" : "ChIJnTFg-ijP5zsRNe1t9nYeEPg",
         "structured_formatting" : {
            "main_text" : "Cafe Madras",
            "main_text_matched_substrings" : [
               {
                  "length" : 4,
                  "offset" : 0
               }
            ],
            "secondary_text" : "Bhaudaji Road, Matunga, Mumbai, Maharashtra, India",
            "secondary_text_matched_substrings" : [
               {
                  "length" : 5,
                  "offset" : 45
               }
            ]
         },
         "terms" : [
            {
               "offset" : 0,
               "value" : "Cafe Madras"
            },
            {
               "offset" : 13,
               "value" : "Bhaudaji Road"
            },
            {
               "offset" : 28,
               "value" : "Matunga"
            },
            {
               "offset" : 37,
               "value" : "Mumbai"
            },
            {
               "offset" : 45,
               "value" : "Maharashtra"
            },
            {
               "offset" : 58,
               "value" : "India"
            }
         ],
         "types" : [ "cafe", "restaurant", "food", "point_of_interest", "establishment" ]
      },
      {
         "description" : "Cafe Bahar, Old MLA Quarters Rd, Avanti Nagar, Himayatnagar, Hyderabad, Telangana, India",
         "id" : "3818c4c3587c855a0326c0f7aa1fd557e174ad7b",
         "matched_substrings" : [
            {
               "length" : 4,
               "offset" : 0
            },
            {
               "length" : 5,
               "offset" : 83
            }
         ],
         "place_id" : "ChIJXwoQ3d6ZyzsRt9dtZ7q3HQE",
         "reference" : "ChIJXwoQ3d6ZyzsRt9dtZ7q3HQE",
         "structured_formatting" : {
            "main_text" : "Cafe Bahar",
            "main_text_matched_substrings" : [
               {
                  "length" : 4,
                  "offset" : 0
               }
            ],
            "secondary_text" : "Old MLA Quarters Rd, Avanti Nagar, Himayatnagar, Hyderabad, Telangana, India",
            "secondary_text_matched_substrings" : [
               {
                  "length" : 5,
                  "offset" : 71
               }
            ]
         },
         "terms" : [
            {
               "offset" : 0,
               "value" : "Cafe Bahar"
            },
            {
               "offset" : 12,
               "value" : "Old MLA Quarters Rd"
            },
            {
               "offset" : 33,
               "value" : "Avanti Nagar"
            },
            {
               "offset" : 47,
               "value" : "Himayatnagar"
            },
            {
               "offset" : 61,
               "value" : "Hyderabad"
            },
            {
               "offset" : 72,
               "value" : "Telangana"
            },
            {
               "offset" : 83,
               "value" : "India"
            }
         ],
         "types" : [ "restaurant", "food", "point_of_interest", "establishment" ]
      },
      {
         "description" : "IndiCafe D’Lima Ketintang, Jalan Ketintang, Ketintang, Surabaya City, East Java, Indonesia",
         "id" : "1cf7c9ceb067f129681906f2898973fc06755013",
         "matched_substrings" : [
            {
               "length" : 25,
               "offset" : 0
            }
         ],
         "place_id" : "ChIJF-2_l3f71y0Rmyo3ONyTxvE",
         "reference" : "ChIJF-2_l3f71y0Rmyo3ONyTxvE",
         "structured_formatting" : {
            "main_text" : "IndiCafe D’Lima Ketintang",
            "main_text_matched_substrings" : [
               {
                  "length" : 25,
                  "offset" : 0
               }
            ],
            "secondary_text" : "Jalan Ketintang, Ketintang, Surabaya City, East Java, Indonesia"
         },
         "terms" : [
            {
               "offset" : 0,
               "value" : "IndiCafe D’Lima Ketintang"
            },
            {
               "offset" : 27,
               "value" : "Jalan Ketintang"
            },
            {
               "offset" : 44,
               "value" : "Ketintang"
            },
            {
               "offset" : 55,
               "value" : "Surabaya City"
            },
            {
               "offset" : 70,
               "value" : "East Java"
            },
            {
               "offset" : 81,
               "value" : "Indonesia"
            }
         ],
         "types" : [ "cafe", "food", "point_of_interest", "establishment" ]
      }
   ],
   "status" : "OK"
};

// Example POST method implementation:
async function getData(url) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        cache: 'force-cache' // *default, no-cache, reload, force-cache, only-if-cached
        //body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}


// Based on https://developers.google.com/places/web-service/query
const  LocationAutoComplete = async ({text, caretPosition, location, radius, sessiontoken}) => {
    // restrict results to the us
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

   if ((sessiontoken)){
      queryParams+= `&sessiontoken=${sessiontoken}`
   }

    console.log(`[LocationAutoComplete.js]${BASE_URL+queryParams}`);
    //return TEST_DATA.predictions
    return text? await getData(BASE_URL+queryParams) : []
};



export default LocationAutoComplete;

