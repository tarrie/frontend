import React, {useContext, useEffect, useState} from 'react';
import {Image, Text, View, StyleSheet, TouchableOpacity, TextInput, FlatList} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import {SafeAreaView} from "react-native-safe-area-context";
import {SimpleLineIcons} from "@expo/vector-icons";
import {StyledText} from "../../../components/StyledText";
import {normalize, SCREEN_HEIGHT, colors, SCREEN_WIDTH} from "../../../constants/styles";
import {UserContext} from "../../../contex/UserContext";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native"
import {LocationAutoComplete} from "../../../components/LocationAutoComplete";


const GooglePlacesInput = () => {
    const [data, setData] = useState([]);
    const [text, setText] = useState();
    const {baseNavigation} = useContext(UserContext);
    const navigation = useNavigation();


    useEffect(() => {

        // ToDo: Add some restrictions on text to match google.
        LocationAutoComplete({text}).then(data =>setData(data) )

    }, [text]);


    useEffect(() => {

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
                                return item.id}}
                            renderItem={({item, index, separators}) => {
                                return <View key={item.id} style={styles.item}>
                                    <Text>
                                        {item.description}
                                    </Text>
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
        backgroundColor: 'purple',
    },
    container: {
        flex: 1,
        backgroundColor: colors.background_color.grey_tablet,
        overflow: 'hidden'
    },
    listContainer: {
        borderColor: "black",
        borderWidth: 1,
        width: normalize(280)
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


export default GooglePlacesInput;