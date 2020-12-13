import React, {useState} from "react";
import {View, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import {
    MaterialIcons,
    FontAwesome,
    Ionicons,
    SimpleLineIcons,
    AntDesign,
    Entypo

} from '@expo/vector-icons';
import Discussion from "../../assets/icons/Discussion";
import MapView from "../../assets/icons/MapView";
import FileView from "../../assets/icons/FileView";
import {StyledText} from "../StyledText";
import {normalize,SCREEN_HEIGHT} from "@constants/styles";

const _colors = {
    blue: '#2196F3',
    green:'#71B419',
    orange:'#E9812C',
    teal:'#288982',
    light_orange:'#FCAA2C',
    light_teal:'#00B2AF',
    pink: '#C14CE8',
    light_blue: '#6096F8',
    light_light_teal: '#33C5DE',
    dark_green: '#109E56',
    fancy_pink: '#F3548A',
    dark_purple: '#803EE8',
    bright_green:'#00CA54',
    other_blue:'#1C73F4',
    another_blue:'#7085D8',
    oneMore_blue:'#405EBE',
    shabby_chic: '#008DA6',
    grey: '#585858'
};



const EventActionStrip = () => {

    return <View style={styles.container}>
        <ScrollView horizontal={true} style={{width: '100%'}}>

            <TouchableOpacity>
                <View style={styles.icon_container}>
                    <View style={{...styles.icon, backgroundColor:_colors.grey}}>
                        <Discussion size={SCREEN_HEIGHT/40} color={'white'}/>
                    </View>
                    <StyledText size={SCREEN_HEIGHT/70}> Discussion</StyledText>
                </View>
            </TouchableOpacity>

            <TouchableOpacity>
                <View style={styles.icon_container}>
                    <View style={{...styles.icon,backgroundColor:_colors.grey}}>
                        <MaterialIcons name={'people'} size={SCREEN_HEIGHT/40} color={'white'}/>
                    </View>
                    <StyledText size={SCREEN_HEIGHT/70}> People Going</StyledText>
                </View>
            </TouchableOpacity>

            <TouchableOpacity>
                <View style={styles.icon_container}>
                    <View style={{...styles.icon,backgroundColor:_colors.grey}}>
                        <MapView name={'people'} size={SCREEN_HEIGHT/40} color={'white'}/>
                    </View>
                    <StyledText size={SCREEN_HEIGHT/70}> Map View</StyledText>
                </View>
            </TouchableOpacity>


            <TouchableOpacity>
                <View style={styles.icon_container}>
                    <View style={{...styles.icon,backgroundColor:_colors.grey}}>
                        <FileView name={'people'} size={SCREEN_HEIGHT/40} color={'white'}/>
                    </View>
                    <StyledText size={SCREEN_HEIGHT/70}> Files</StyledText>
                </View>
            </TouchableOpacity>


        </ScrollView>
    </View>
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        backgroundColor: 'transparent',
        paddingVertical: SCREEN_HEIGHT/500
    },
    icon_container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: normalize(59)
    },
    icon: {
        height:  SCREEN_HEIGHT/25,
        width: SCREEN_HEIGHT/25,
        borderWidth: 1,
        borderRadius: SCREEN_HEIGHT/25 / 2,
        alignItems: 'center',
        borderColor: '#D8D8D8',
        justifyContent: 'center',
        backgroundColor: '#D8D8D8'
    }
});


export default EventActionStrip;