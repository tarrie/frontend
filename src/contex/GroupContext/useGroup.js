import React, {createContext, useState, useEffect,useRef} from "react"
import {GraphQLApi, RestApi} from "../../api";
import * as path from 'path';
import {API_HOSTNAME} from "../../constants/parameters";
import {getImgPath} from "../../utils";
import {hasParameter,isObjectEmpty} from "../../utils";

const TEST_GROUP = {
    "bio": "Dude's who like to party",
    "imgPath": "https://s3.us-east-2.amazonaws.com/tarrie.io/groups/pictures/default-group-profile.png",
    "location": {
        "city": "Evanston",
        "latitude": 0,
        "locName": "Northwestern University",
        "longitude": 0,
        "state": "IL",
        "zipCode": 0
    },
    "main_pk": "GRP#boogoParty",
    "main_sk": "GRP#boogoParty",
    "name": "Boogo Party",
    "owner": {
        "imgPath": "https://s3.us-east-2.amazonaws.com/tarrie.io/users/pictures/jide69/profile.jpeg",
        "main_pk": "USR#jide69",
        "name": "Jide"
    }
};
const getGroupId = ({main_pk})=>{return main_pk;}

const useGroup = () => {
    const [group, setGroup] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [userId, setUserId] = useState(null);
    const [eventsHosted, setEventsHosted] = useState(null);

    const rest_api = useRef(new RestApi());
    const graphql_api = useRef(new GraphQLApi());

    /*
    useEffect(()=>{

        if (eventsHosted){
            console.log(eventsHosted)
        }

        },[eventsHosted]

    );*/
    /**
     * Get's the group by issuing API call
     * @param groupId
     * @param userId
     * @return {Promise<void>}
     */
    const getGroup = async ({groupId,userId}) =>{
        // eventsHosted = useGetEventsHostedByEntity({main_pk:"GRP#boogoParty33333"});
        //let endPoint = path.join(API_HOSTNAME,'groups',encodeURIComponent(groupId),'events');
        //let response = await rest_api.current.get({endPoint,payload:{userId}});
        //console.log(response);
        setGroup(TEST_GROUP);
        console.log(getImgPath(groupId));

    };

    /**
     * Creates a event by calling the api with the payload
     * @param payload
     * @return {Promise<void>}
     */
    const createEvent = async ({location,infoText,datetime,eventImgUri,title})=>{

        console.log("[useGroup.js] Group event created!!");

        // (1) Create Event

        // (2) Wait for the profile picture
        // ToDo: Need eventId so we can add it. This will be the entityId, depending on entity (different logic)
       // if(hasParameter(eventImgUri)){
         //   await RestApi.uploadProfilePic({userId, entityId:getGroupId(group), uri:eventImgUri});

       // }

        console.log( JSON.stringify({location,infoText,datetime,eventImgUri,title}, null, 2));
        console.log( JSON.stringify(getGroupId(group), null, 2));
        console.log("[useGroup.js] Group event created- userId");
        console.log( JSON.stringify(userId, null, 2));

    };

    /**
     * Gets events hosted by querying graphQL API
     * @param groupId
     * @param userId
     * @return {Promise<void>}
     */
    const getEventsHosted = async ({groupId,userId}) =>{
        let hostedEvents = await graphql_api.current.getEventsHostedByEntity({main_pk:groupId});
        console.log(hostedEvents)
    };

    /**
     * Load group into main memory & save the userId
     * @param groupId
     * @param userId
     */
    const loadGroup = ({groupId,userId}) => {
        setUserId(userId);
        getGroup({groupId,userId}).then(()=>setIsLoaded(true));
        //getEventsHosted({groupId,userId});
    };

    return {
        group,
        isLoaded,
        loadGroup,
        createEvent
    }
};


export default useGroup;