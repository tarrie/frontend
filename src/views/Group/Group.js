import React, {useEffect,useState} from "react"
import {View} from "react-native";
import {Text} from "react-native";
import {GroupContextProvider} from "../../contex/GroupContext";
import GroupTopNavigation from "./GroupTopNavigation";


const Group = ({ route_ }) =>{
    const [groupId, setGroupId] = useState(route_.params.groupId);

    console.log(route_);
    useEffect(()=>{
        setGroupId(route_.params.groupId)
    },[route_]);

return (
        <GroupContextProvider>
            <GroupTopNavigation groupId={groupId} />
        </GroupContextProvider>
 )
};

const SAMPLE_GROUP_ID = "GRP#boogoParty33333";
Group.defaultProps = {
    route_: {
        params:{
            groupId: SAMPLE_GROUP_ID
        }
    }
};

export default Group;