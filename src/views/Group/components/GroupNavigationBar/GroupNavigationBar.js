import React, {useContext} from "react"
import {View, StyleSheet, ScrollView,TouchableOpacity,TouchableHighlight} from "react-native"
import {colors, sizes} from "../../../../constants/styles";
import {Chip} from 'react-native-paper';
import {StyledText} from "../../../../components/StyledText";
import {normalize,SCREEN_HEIGHT} from "../../../../constants/styles";
import { TouchableRipple } from 'react-native-paper';
import {screens} from "../../routes/constants";
import {GroupContext} from "../../../../contex/GroupContext";

const NavChip = ({title, onPressCallback}) => {
    return (
            <TouchableOpacity style={styles.chip} >
                <StyledText style={styles.chip_text} size={sizes.mini.fontSize} type={'book'} onPress={onPressCallback}>{title}</StyledText>
            </TouchableOpacity>
    )
};


const GroupNavigationBar = ({ navigation}) => {

    return (
        <View style={styles.container}>
            <ScrollView horizontal={true} style={{width: '100%'}}>
                <NavChip title={"Chats"} onPressCallback={()=>navigation.navigate(screens.GROUP_CHAT, {})} />
                <NavChip title={"Announcements"} onPressCallback={()=>navigation.navigate(screens.GROUP_ANNOUNCEMENTS, {})}/>
                <NavChip title={"Members"} onPressCallback={()=>navigation.navigate(screens.GROUP_MEMBERS, {})}/>
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: colors.background_color.white,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: SCREEN_HEIGHT/120
    },
    chip: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        paddingHorizontal: normalize(5),
        marginHorizontal: normalize(6),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    chip_text:{
        color: colors.text.primary.main
    }
});

export default GroupNavigationBar;
