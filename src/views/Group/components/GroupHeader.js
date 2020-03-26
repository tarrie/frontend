import React from "react"
import {StyledText} from "../../../components/StyledText";
import {View, StyleSheet, ScrollView,ImageBackground} from "react-native"
import {colors} from "../../../constants/styles";
import { Avatar } from 'react-native-paper';

const GroupHeader = ({groupState}) => {
    return (
        <View style={styles.container}>
            <View style={styles.image_container}>
                {groupState.isLoaded && <ImageBackground source={{ uri: groupState.group.imgPath }} style={{ ...styles.image }} resizeMode={'cover'}/>}
            </View>
            <StyledText> Group Header</StyledText>
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        flexDirection:'column',
        width: "100%",
        height: '100%',
        backgroundColor: colors.background_color.grey_tablet,
        borderWidth: 1
    },
    image_container:{
        width: '100%',
        height: '70%'

    },
    image:{
        width: '100%',
        height: '100%',
        borderRadius: 2,
    }
});

export default GroupHeader;