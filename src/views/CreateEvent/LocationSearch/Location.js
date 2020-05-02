import React, {useContext,useEffect} from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import {SafeAreaView} from "react-native-safe-area-context";
import {SimpleLineIcons} from "@expo/vector-icons";
import {StyledText} from "../../../components/StyledText";
import {normalize, SCREEN_HEIGHT, colors} from "../../../constants/styles";
import {UserContext} from "../../../contex/UserContext";


const GooglePlacesInput = () => {
    const {baseNavigation} = useContext(UserContext);

        useEffect(() => {

        // hides the navbar
        baseNavigation.setOptions({tabBarVisible: false,});
        return () => {
            baseNavigation.setOptions({tabBarVisible: true});
        }
    }, []);


    return (
    <SafeAreaView >
      <View style={styles.autocompleteContainer}>
        <Autocomplete  />
      </View>
      <View>
        <Text>Some content</Text>
      </View>
    </SafeAreaView>
    )
};


const styles = StyleSheet.create({
    container:{
        borderWidth:1,
        width: 90
    },
    autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  }
});




export default GooglePlacesInput;