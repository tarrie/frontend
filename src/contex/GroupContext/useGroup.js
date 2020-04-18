import React, {createContext, useState, useEffect,useRef} from "react"
import {GraphQLApi, RestApi} from "../../api";
import * as path from 'path';
import {API_HOSTNAME} from "../../constants/parameters";
import {getImgPath} from "../../utils";

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
        console.log("hefwdgr")
        setUserId(userId);
        getGroup({groupId,userId}).then(()=>setIsLoaded(true));
        //getEventsHosted({groupId,userId});
    };

    return {
        group,
        isLoaded,
        loadGroup
    }
};


export default useGroup;