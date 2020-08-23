import {API_HOSTNAME} from "../constants/parameters";
import * as urlJoin from 'url-join';

//https://reactnative.dev/docs/network
class RestApi {
    get = async ({relativePath, payload}) => {

        // Default options are marked with *
        const response = await fetch(urlJoin(API_HOSTNAME,relativePath), {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    };

    post = async ({relativePath, payload}) => {
        // Default options are marked with *
        const response = await fetch(urlJoin(API_HOSTNAME,relativePath), {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    };
}

export default RestApi;