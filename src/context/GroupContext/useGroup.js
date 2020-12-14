import React, {createContext, useState, useEffect, useRef} from "react"
import {GraphQLApi, RestApi} from "../../api";
import * as path from 'path';
import {API_HOSTNAME, EntityType, DbAttributes, EventRelationshipEnum} from "@constants/parameters";
import {getImgPath, oneButtonAlert} from "../../utils";
import {hasParameter, isObjectEmpty} from "../../utils";

const urlJoin = require('url-join');

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
const getGroupId = ({main_pk}) => {
    return main_pk;
};


const useGroup = () => {
    const [group, setGroup] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [userId, setUserId] = useState(null);
    const [eventsHosted, setEventsHosted] = useState([]);


    /**
     * Get's the group by issuing API call
     * @param groupId
     * @param userId
     * @return {Promise<void>}
     */
    const getGroup = async ({groupId, userId}) => {
        // eventsHosted = useGetEventsHostedByEntity({main_pk:"GRP#boogoParty33333"});
        //let endPoint = path.join(API_HOSTNAME,'groups',encodeURIComponent(groupId),'events');
        //let response = await rest_api.current.get({endPoint,payload:{userId}});
        //console.log(response);
        setGroup(TEST_GROUP);
        //console.log(getImgPath(groupId));

    };

    /**
     * Subscribe to changes on EventRelationship
     **/
    let eventRelationshipSubscription;
    useEffect(() => {
        if (isLoaded) {
            console.log(`[useGroup] setting subscription ${getGroupId(group)}`);
            eventRelationshipSubscription = GraphQLApi.subscribeToEventRelationship(getGroupId(group));
            return () => eventRelationshipSubscription.unsubscribe();
        }
    }, [isLoaded]);

    /**
     * Creates a event by calling the api with the payload
     * @param payload
     * @return {Promise<*>}
     */
    const createEvent = async ({location, infoText, datetime, eventImgUri, title}) => {

        console.log("[useGroup::createEvent()] Trying to create event");

        let event;
        let payload = {groupId: getGroupId(group), userId, location, infoText, datetime, eventImgUri, title};
        console.log(`[useGroup::createEvent()] sending api req ${userId}`);

        try {
            event = await RestApi.createEvent(EntityType.GROUP, payload);

        } catch (e) {
            console.warn(`[useGroup::createEvent()] API request error:\n\t ${JSON.stringify(event)}\n\t ${e}`);
            oneButtonAlert("Network Error", `Couldn't create the event :( \n ${JSON.stringify(e)}`)
        }

        console.log(`[useGroup::createEvent()]  event created: ${JSON.stringify(event)}`);
        return event;
    };

    /**
     * Gets events hosted by querying graphQL API
     * @param groupId
     * @return {Promise<void>}
     */
    const getEventsHosted = async ({groupId}) => {

        if (hasParameter(groupId)) {
            return RestApi.getGroupEvents({
                groupId,
                eventRelationshipEnum: EventRelationshipEnum.HOST
            }).then((hostedEvents) => setEventsHosted(hostedEvents))
        } else if (isLoaded) {
            return RestApi.getGroupEvents({
                groupId: getGroupId(group),
                eventRelationshipEnum: EventRelationshipEnum.HOST
            }).then((hostedEvents) => setEventsHosted(hostedEvents))
        }

    };

  
    /**
     * Load group into main memory & save the userId. Called on init  {@link GroupNavigation}
     * @param groupId
     * @param userId
     */
    const loadGroup = ({group, userId}) => {
        console.log(`[GroupContext::useGroup::loadGroup()] ${userId}`);
        setUserId(userId);
        setGroup(group);
        getEventsHosted({groupId: getGroupId(group)})
        setIsLoaded(true);

    };


    return {
        group,
        isLoaded,
        loadGroup,
        createEvent,
        getEventsHosted: getEventsHosted
    }
};


export {useGroup, getGroupId, TEST_GROUP};