import {API_HOSTNAME} from "../constants/parameters";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import {hasParameter} from "../utils";
import {payloadToCreateEvent} from "./model";
// * as urlJoin from 'url-join';
const urlJoin = require('url-join');

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
        {compress: Platform.OS === 'ios' ? 0 : .5, format: "jpeg", base64: false}
    );
    //let compressedInfo = await FileSystem.getInfoAsync(resizedPhoto.uri, {'size': true});

    const directoryName = FileSystem.documentDirectory + 'images';
    const fileName = `${directoryName}/image.jpeg`;

    await FileSystem.makeDirectoryAsync(directoryName, {'intermediates': true});
    await FileSystem.moveAsync({from: resizedPhoto.uri, to: fileName});

    return fileName;
};

//https://reactnative.dev/docs/network
/**
 * The rest api provides basic functionality to make REST request to the Tarrie url,
 * it also implments logic of more complex request.
 */
class RestApi {

    static get = async ({relativePath, payload}) => {

        // Default options are marked with *
        const response = await fetch(urlJoin(API_HOSTNAME, relativePath), {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload) // body data type must match "Content-Type" header
        });

        /// https://stackoverflow.com/questions/38235715/fetch-reject-promise-and-catch-the-error-if-status-is-not-ok
        let responsePayload = await response.json();
        if (response.ok) {
            return responsePayload; // parses JSON response into native JavaScript objects
        } else {
            throw new Error(`HTTP[get ${relativePath}, error ${response.error()}] ${responsePayload}`);
        }
    };

    static post = async ({relativePath, payload}) => {

        // Default options are marked with *
        const response = await fetch(urlJoin(API_HOSTNAME, relativePath), {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload) // body data type must match "Content-Type" header
        });

        let responsePayload = await response.json();

        if (response.ok) {
            return responsePayload; // parses JSON response into native JavaScript objects
        } else {
            console.log(`[RestApi::post] throwing error `);
            throw new Error(`HTTP[post ${relativePath}, error ${response.error()}] ${responsePayload}`);
        }
    };


    /**
     * Uploads a profile picture to the db.
     * @param endPoint: the endpoint of request
     * @param userId - the id of the user uploading the pic
     * @param entityId - id of entity that the user is uploading the pic for {event, group, user} (if user then entityId==userId)
     * @param uri - path to the pic
     * @return {Promise<void>}
     * -- Note the entityId must already exist unless a error will occur. ---
     *  Based on: https://stackoverflow.com/questions/32441963/how-to-use-formdata-in-react-native
     */
    static uploadProfilePic = async ({relativePath, userId, entityId, uri}) => {

        const endPoint = urlJoin(API_HOSTNAME, relativePath);
        //console.log(encodeURI(endPoint));
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

        console.log(`Multipart/form PUT`);
        // invoke the api call
        const response = await fetch(endPoint, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: formData
        });

        let responsePayload = await response.json();

        if (response.ok) {
            return responsePayload; // parses JSON response into native JavaScript objects
        } else {
            throw new Error(`HTTP[get multipart/form-data ${relativePath}, error ${response.error()}] ${responsePayload}`);
        }
    };


    /**
     * Issue DB calls and implements logic in creating a event
     * @param entityType: {@link EntityType} the entityType of entity creating event either EntityType.USER or EntityType.GROUP
     * ToDo: Delete or figure out a way to use this
     * @param userId: (required)
     * @param groupId: (required if group is creating event)
     * @param location: The location of event represented as a map
     * @param infoText: Text associated with event
     * @param datetime: {start,end} time of event
     * @param eventImgUri: uri of event image
     * @param title: the title of the event
     * @return {Promise<*>} the newly created Event Json
     */
    static createEvent = async (entityType, {userId, groupId, location, infoText, datetime, eventImgUri, title}) => {

        let payload = payloadToCreateEvent({userId, groupId, location, infoText, datetime, title});


        let eventJson;
        const relativePath_EventCreate = "events";

        // Check if the API call completes
        try {
            // create the event
            eventJson = await RestApi.post({relativePath: relativePath_EventCreate, payload});

        } catch (e) {
            // catch error
            console.log(`[RestApi::createEvent():} error throw`)
            throw new Error(`RestApi::createEvent(): fail,\n\t${e}`);
        }

        //  get eventId
        const eventId = eventJson.main_pk;

        // upload picture using the  returned eventId
        const relativePath_EventImgUpload = urlJoin("events", "pictures", encodeURIComponent(eventId));
        console.log(`[RestApi::createEvent()] rel path ${relativePath_EventImgUpload}`);
        // Check if the API call completes
        try {
            // add the img to the event in a seperate call
           if (hasParameter(eventImgUri)){
               eventJson["imgPath"] = await RestApi.uploadProfilePic({
                   relativePath: relativePath_EventImgUpload,
                   userId,
                   uri: eventImgUri
               });
            }

        } catch (e) {
            throw new Error(`RestApi::createEvent(): fail, \n\t${e}`);
        }


        return eventJson;
    }

}

/*
            console.error(`[createEvent] ${e}`);
            const title= "API Post Failure";
            const message = `[createEvent()] userId=${userId}, ${hasParameter(groupId)?`groupId=${groupId}`:""}`;
            oneButtonAlert(title,message);
            return;
*/
export default RestApi;