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
import {normalize} from "../../constants/styles";


const EventActionStrip = () => {

    return <View style={styles.container}>
        <ScrollView horizontal={true} style={{width: '100%'}}>

            <TouchableOpacity>
                <View style={styles.icon_container}>
                    <View style={styles.icon}>
                        <Discussion size={20}/>
                    </View>
                    <StyledText size={13}> Discussion</StyledText>
                </View>
            </TouchableOpacity>

            <TouchableOpacity>
                <View style={styles.icon_container}>
                    <View style={styles.icon}>
                        <MaterialIcons name={'people'} size={20}/>
                    </View>
                    <StyledText size={13}> People Going</StyledText>
                </View>
            </TouchableOpacity>

            <TouchableOpacity>
                <View style={styles.icon_container}>
                    <View style={styles.icon}>
                        <MapView name={'people'} size={20}/>
                    </View>
                    <StyledText size={13}> Map View</StyledText>
                </View>
            </TouchableOpacity>


            <TouchableOpacity>
                <View style={styles.icon_container}>
                    <View style={styles.icon}>
                        <FileView name={'people'} size={20}/>
                    </View>
                    <StyledText size={13}> Files</StyledText>
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
        backgroundColor: 'rgb(248,248,248)',
        paddingVertical: 5
    },
    icon_container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: normalize(10),
        width:80,
    },
    icon: {
        height: 35,
        width: 35,
        borderWidth: 1,
        borderRadius: 35 / 2,
        alignItems: 'center',
        borderColor: '#D8D8D8',
        justifyContent: 'center',
        backgroundColor: '#D8D8D8'
    }
});


export default EventActionStrip;