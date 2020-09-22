import React, {useEffect,useState,useContext} from "react"
import {View} from "react-native";
import {Text} from "react-native";
import {GroupContextProvider} from "../../contex/GroupContext";
import {GroupNavigation} from "./routes";
import {UserContext} from "../../contex/UserContext";
import {useNavigation} from '@react-navigation/native';

const Group = ({ route_, navigation }) =>{
    const {userInfo,setBaseNavigation} = useContext(UserContext);
    const [groupId, setGroupId] = useState(route_.params.groupId);

    useEffect(() => {
        setBaseNavigation({navigation})
    }, [navigation]);


    useEffect(()=>{
        setGroupId(route_.params.groupId)
    },[route_]);

return (
        <GroupContextProvider>
            <GroupNavigation groupId={groupId} userId={userInfo.userId}/>
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