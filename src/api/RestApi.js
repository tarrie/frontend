import {API_HOSTNAME, DbAttributes, EventRelationshipEnum} from "../constants/parameters";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import {hasParameter} from "../utils";
import {payloadToCreateEvent} from "./model";
import DefaultEventImg from "@assets/images/default_images/default-event-profile.png"
import {Image} from "react-native";
import encodeQueryParameters from "@api/utils/encodeQueryParameters";
import {oneButtonAlertError} from "@utils/oneButtonAlert";
// * as urlJoin from 'url-join';
const urlJoin = require('url-join');
const assert = require('assert');
const defaultEventImgUri = Image.resolveAssetSource(DefaultEventImg).uri

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

    static get = async ({endpoint, payload}) => {

        console.log(urlJoin(API_HOSTNAME, endpoint) )
        // Default options are marked with *
        const response = await fetch(urlJoin(API_HOSTNAME, endpoint));

        /// https://stackoverflow.com/questions/38235715/fetch-reject-promise-and-catch-the-error-if-status-is-not-ok
        if (response.ok) {
            return await response.json(); // parses JSON response into native JavaScript objects
        } else {
            let responsePayload = await response.text();
            throw new Error(`HTTP[get ${endpoint}, error ${response.status}]  ${response.error} ${responsePayload}`);
        }
    };

    static post = async ({endpoint, payload}) => {
        // Default options are marked with *
        const response = await fetch(urlJoin(API_HOSTNAME, endpoint), {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload) // body data type must match "Content-Type" header
        });

        if (response.ok) {
            return await response.json(); // parses JSON response into native JavaScript objects
        } else {
            let responsePayload = await response.text();
            throw new Error(`HTTP[post ${endpoint}, error ${response.status}] ${responsePayload}`);
        }
    };

    /**
     * Issues api call to get a list of events
     * @param userId: userId of user making this request
     * @param listOfEventIds: a list of eventIds interested in
     * @return {Promise<any>}
     */
    static getEvent = async ({userId, listOfEventIds}) => {
        // precondition
        assert(Array.isArray(listOfEventIds));
        assert((typeof userId) == "string");

        let endpoint = `events?${encodeQueryParameters({key:'eventId', listOfQueries: listOfEventIds})}`;
        let payload = {[DbAttributes.HASH_KEY]: userId};
        return await RestApi.get({endpoint, payload});
    };

    /**
     * Gets all the events associated with a group
     * @param groupId
     * @param eventRelationshipEnum
     * @return {Promise<{HOST:{List<Event>}, SAVED:{List<Event>}, RSVP:{List<Event>}}>}
     */
    static getGroupEvents = async ({groupId, eventRelationshipEnum})=>{
        let endpoint;
        if (hasParameter(eventRelationshipEnum)){
            if (!(eventRelationshipEnum in EventRelationshipEnum)){
                oneButtonAlertError("[RestApi:getGroupEvents]",`${eventRelationshipEnum} not valid eventRelationshipEnum`)
                return;
            }else{
                endpoint = `groups/${encodeURIComponent(groupId)}/events?eventRelationship=${eventRelationshipEnum}`;

                return new Promise((resolve, reject)=>{
                     RestApi.get({endpoint}).then((payload)=>{
                         resolve(payload[eventRelationshipEnum])
                     }).catch((e)=>{reject(e)})
                })
            }
        }else{
            endpoint = `groups/${encodeURIComponent(groupId)}/events`;
            return await RestApi.get({endpoint})
        }


    }


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
    static uploadProfilePic = async ({endpoint, userId, entityId, uri}) => {

        const endPoint = urlJoin(API_HOSTNAME, endpoint);
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


        if (response.ok) {
            return await response.json(); // parses JSON response into native JavaScript objects
        } else {
            let responsePayload = await response.text();
            throw new Error(`HTTP[get multipart/form-data  ${endpoint}, error ${response.status}] ${responsePayload}`);
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
        const endpoint_EventCreate = "events";

        // Create & check if the API call completes
        try {
            // create the event
            eventJson = await RestApi.post({endpoint: endpoint_EventCreate, payload});

        } catch (e) {
            // catch error
            console.log(`[RestApi::createEvent():} error throw`)
            throw new Error(`[RestApi::createEvent()]: fail,\n\t${e}`);
        }

        //  get eventId
        const eventId = eventJson.main_pk;

        // upload picture using the  returned eventId
        const endpoint_EventImgUpload = urlJoin("events", "pictures", encodeURIComponent(eventId));
        console.log(`[RestApi::createEvent()] rel path ${endpoint_EventImgUpload}`);
        // Check if the API call completes
        try {
            // add the img to the event in a seperate call
                eventJson["imgPath"] = await RestApi.uploadProfilePic({
                    endpoint: endpoint_EventImgUpload,
                    userId,
                    uri: eventImgUri? eventImgUri:defaultEventImgUri
                });


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