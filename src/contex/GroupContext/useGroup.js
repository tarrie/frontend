import React, {createContext, useState, useEffect} from "react"

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

    /**
     * Get's the group by issuing API call
     * @param groupId
     * @return {Promise<void>}
     */
    const getGroup = async ({groupId}) =>{
        setGroup(TEST_GROUP);
    };

    /**
     * Load group into main memory
     * @param groupId
     */
    const loadGroup = ({groupId}) => {
        getGroup({groupId}).then(()=>setIsLoaded(true));
    };

    return {
        group,
        isLoaded,
        loadGroup
    }
};


export default useGroup;