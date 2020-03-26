import React from "react"
import {View, StyleSheet, ScrollView,TouchableOpacity,TouchableHighlight} from "react-native"
import {colors, sizes} from "../../../constants/styles";
import {Chip} from 'react-native-paper';
import {StyledText} from "../../../components/StyledText";
import {normalize} from "../../../constants/styles";
import { TouchableRipple } from 'react-native-paper';
import {screens} from "../../../routes/constants";

const NavChip = ({title, onPressCallback}) => {
    return (
            <TouchableOpacity style={styles.chip} >
                <StyledText style={styles.chip_text} size={sizes.mini.fontSize} type={'book'} onPress={onPressCallback}>{title}</StyledText>
            </TouchableOpacity>
    )
};


const GroupNavigationBar = ({groupState, navigation}) => {

    return (
        <View style={styles.container}>
            <ScrollView horizontal={true} style={{width: '100%'}}>
                <NavChip title={"Events"} onPressCallback={()=>navigation.navigate(screens.GROUP_EVENTS, { groupState })} />
                <NavChip title={"Announcements"} onPressCallback={()=>navigation.navigate(screens.GROUP_ANNOUNCEMENTS, { groupState })}/>
                <NavChip title={"Members"} onPressCallback={()=>navigation.navigate(screens.GROUP_MEMBERS, { groupState })}/>
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: colors.background_color.grey_tablet,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10
    },
    chip: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        paddingHorizontal: 5,
        marginHorizontal: normalize(10),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    chip_text:{
        color: colors.text.primary.main
    }
});

export default GroupNavigationBar;
