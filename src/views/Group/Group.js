import React, {useEffect,useState,useContext} from "react"
import {View} from "react-native";
import {Text} from "react-native";
import {GroupContextProvider} from "../../contex/GroupContext";
import GroupTopNavigation from "./GroupTopNavigation";
import {UserContext} from "../../contex/UserContext";

const Group = ({ route_ }) =>{
    const {userId} = useContext(UserContext);
    const [groupId, setGroupId] = useState(route_.params.groupId);

    useEffect(()=>{
        setGroupId(route_.params.groupId)
    },[route_]);

return (
        <GroupContextProvider>
            <GroupTopNavigation groupId={groupId} userId={userId}/>
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