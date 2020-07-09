import React, {useContext, useEffect, useRef, useState} from 'react';
import {Image, Text, View, StyleSheet, TouchableOpacity, TextInput, FlatList} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import {SafeAreaView} from "react-native-safe-area-context";
import {SimpleLineIcons} from "@expo/vector-icons";
import {StyledText} from "../../../components/StyledText";
import {normalize, SCREEN_HEIGHT, colors, SCREEN_WIDTH} from "../../../constants/styles";
import {UserContext} from "../../../contex/UserContext";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native"
import {LocationAutoComplete,LocationDetail} from "../../../components/LocationAutoComplete";
import {EvilIcons} from "@expo/vector-icons";
import {GOOGLE_API_KEY} from 'react-native-dotenv';
import { v4 as uuidv4 } from 'react-native-uuid';
import {screens} from "../routes/screens";


const ActualLocation = ({main_text, secondary_text, place_id, sessiontoken,callbackFN }) => {

    const onPress = ()=>{
        LocationDetail({place_id,sessiontoken}).then((loc_detail)=>callbackFN(loc_detail));
    };

    return (
        <TouchableOpacity style={{flexDirection: 'row', marginVertical: 5,  alignItems: 'center', width:'100%'}} onPress={onPress}>
            <EvilIcons name={'location'} size={SCREEN_WIDTH/14} style={{
                color: colors.primary.extra_dark,
            }}/>

            <View style={{marginBottom:5, width:SCREEN_WIDTH/1.3}}>
                <StyledText style={{color:colors.text.primary.light}} type={'bold'}>
                    {main_text}
                </StyledText>
                {secondary_text &&
                <StyledText style={{color:colors.text.primary.main}}>
                    {secondary_text}
                </StyledText>}
            </View>
        </TouchableOpacity>
    )
};


const Location = () => {
    const [data, setData] = useState([]);
    const [text, setText] = useState();
    const {baseNavigation} = useContext(UserContext);
    const navigation = useNavigation();
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [sessiontoken, setSessionToken] = useState();

    // deals with the location auto complete callback
    useEffect(() => {
        LocationAutoComplete({text,sessiontoken}).then(data => {
            if (typeof data === 'object' && data !== null){
                setData(data.predictions)
            }
        });
    }, [text]);

    // deals with location detail callback
    useEffect(()=>{
        console.log(selectedLocation);
    },[selectedLocation]);

    const locationSelectCallback=(location)=>{
        baseNavigation.setOptions({tabBarVisible: true});
        navigation.navigate(screens.CreateEventHome, { location })

    };

    const onSubmitEditing =({nativeEvent})=>{
        baseNavigation.setOptions({tabBarVisible: true});
        navigation.navigate(screens.CreateEventHome, { "location": {"name":nativeEvent.text, "place_id":"null"}});
    };

    useEffect(() => {
        // set the sessiontoken for google
        setSessionToken(uuidv4());

        //LocationDetail({"place_id":"ChIJjQmTaV0E9YgRC2MLmS_e_mY"}).then((loc)=>setSelectedLocation(loc));

        // hides the navbar
        baseNavigation.setOptions({tabBarVisible: false,});
        return () => {
            baseNavigation.setOptions({tabBarVisible: true});
        }
    }, []);

    const navigateBack = () => {
        baseNavigation.setOptions({tabBarVisible: true});
        navigation.goBack();
    };

    //return_obj['name'] = response_obj.result.name;
   // return_obj['place_id'] = place_id;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.autocompleteContainer}>

                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={navigateBack}>
                        <View style={styles.backarrowContainer}>
                            <Ionicons name={"ios-arrow-back"} size={SCREEN_HEIGHT / 28} style={styles.backarrow}/>
                        </View>
                    </TouchableOpacity>
                    {/*Uses styles of TextInput*/}
                    <TextInput
                        selectionColor={colors.primary.dark}
                        autoCorrect={false}
                        placeholder="Add location"
                        onChangeText={text => setText(text)}
                        style={styles.autocomplete}
                        clearButtonMode={'always'}
                        onSubmitEditing={onSubmitEditing}
                    />
                </View>
                <View
                    style={{flexDirection: 'row'}}
                >
                    <View style={styles.backarrowContainer}/>

                    <View style={styles.listContainer}>
                        <FlatList
                            data={data}
                            keyExtractor={(item, index) => {
                                return item.place_id
                            }}
                            renderItem={({item, index, separators}) => {
                                return <View key={item.id} style={styles.item}>
                                    <ActualLocation
                                        main_text={item.structured_formatting.main_text}
                                        secondary_text={item.structured_formatting.secondary_text}
                                        place_id={item.place_id}
                                        sessiontoken={sessiontoken}
                                        callbackFN={locationSelectCallback}
                                    />

                                </View>
                            }}/>
                    </View>

                </View>

            </View>
        </SafeAreaView>
    )
};
/*
Object {
  "index": 2,
  "item": Object {
    "test": "lesser",
  },
  "separators": Object {
    "highlight": [Function highlight],
    "unhighlight": [Function unhighlight],
    "updateProps": [Function updateProps],
  },
}
*/


const styles = StyleSheet.create({
    item: {
       // backgroundColor: 'purple',
    },
    container: {
        flex: 1,
        backgroundColor: '#EBECF0',
        overflow: 'hidden'
    },
    listContainer: {
        borderColor: "black",
        top:SCREEN_HEIGHT/50,
        width: normalize(310),
        position: 'absolute',
        left: normalize(5)
    },
    backarrowContainer: {
        width: SCREEN_HEIGHT / 30,
        height: SCREEN_HEIGHT / 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: normalize(5)
    },
    backarrow: {color: '#5E6C84'},
    autocompleteContainer: {
        left: 0,
        position: 'absolute',
        right: 0,
        top: SCREEN_HEIGHT / 20,
        zIndex: 1,
        width: SCREEN_WIDTH,
        borderRadius: 50

    },
    autocomplete: {
        width: normalize(280),
        height: SCREEN_HEIGHT / 25,
        fontFamily: 'source-sans-pro-semibold',
        color: colors.primary.dark,
        fontSize: SCREEN_HEIGHT / 45,
        borderColor: colors.primary.extra_dark,
        borderBottomWidth: 1
    }
});


export {Location,ActualLocation};