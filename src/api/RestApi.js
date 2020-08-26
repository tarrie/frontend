import {API_HOSTNAME} from "../constants/parameters";
import * as urlJoin from 'url-join';

import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";

/**
 * Compress image
 * @see https://stackoverflow.com/questions/50257879/expo-camera-takepictureasync-imagemanipulator
 * @see https://stackoverflow.com/questions/50257879/expo-camera-takepictureasync-imagemanipulator
 * @param uri
 */
const compressImage = async ({uri}) => {


    let resizedPhoto = await ImageManipulator.manipulateAsync(
        uri,
        [],
        {compress: Platform.OS === 'ios'?0:.5, format: "jpeg", base64: false}
    );
    //let compressedInfo = await FileSystem.getInfoAsync(resizedPhoto.uri, {'size': true});

    const directoryName = FileSystem.documentDirectory + 'images';
    const fileName = `${directoryName}/image.jpeg`;

    await FileSystem.makeDirectoryAsync(directoryName,{'intermediates':true});
    await FileSystem.moveAsync({from: resizedPhoto.uri, to: fileName});

    return fileName;
};

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

    /**
     * Uploads a profile picture to the db.
     * @param userId - the id of the user uploading the pic
     * @param entityId - id of entity that the user is uploading the pic for {event, group, user} (if user then entityId==userId)
     * @param uri - path to the pic
     * @return {Promise<void>}
     * -- Note the entityId must already exist unless a error will occur. ---
     *  Based on: https://stackoverflow.com/questions/32441963/how-to-use-formdata-in-react-native
     */
    uploadProfilePic = async ({userId, entityId, uri}) => {

        const endPoint = urlJoin(API_HOSTNAME,"pictures/profile",entityId);

        // compress image
        const compressedUri = await compressImage({uri});

        // Get the type of file. Either png or jpeg usually
        let splitUri = compressedUri.split('.');
        let fileType = splitUri[splitUri.length - 1];

        // generate filename
        let filename = `${new Date().valueOf()}.${fileType}`;

        // create multipart form
        let formData = new FormData();
        formData.append("file", {uri: compressedUri, name: filename, type: `image/${fileType}`});
        formData.append("userId", userId);

        // invoke the api call
        const response = await fetch(endPoint, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: formData
        });
        return response.json(); // parses JSON response into native JavaScript objects
    };

}

export default RestApi;