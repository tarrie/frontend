import React, {useEffect,useState,useContext} from "react"
import {View} from "react-native";
import {Text} from "react-native";
import {getGroupId, GroupContextProvider} from "../../contex/GroupContext";
import {GroupNavigation} from "./routes";
import {UserContext} from "../../contex/UserContext";
import {useNavigation} from '@react-navigation/native';
import {TEST_GROUP} from "../../contex/GroupContext/useGroup";
import PropTypes from 'prop-types';

const Group = ({ route, navigation }) =>{
    console.log(`[Group] ${route.params.group}`);


    const {setBaseNavigation} = useContext(UserContext);
    //const [groupId, setGroupId] = useState();

    useEffect(() => {
        setBaseNavigation({navigation})
    }, [navigation]);


    //useEffect(()=>{
       // console.log(`[Group] ${route.params.groupId}`);
       // setGroupId(route.params.groupId)
    //},[route]);

return (
        <GroupContextProvider>
            <GroupNavigation group={route.params.group} />
        </GroupContextProvider>
 )
};

export default Group;