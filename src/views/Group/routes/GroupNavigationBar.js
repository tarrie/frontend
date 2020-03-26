import React from "react"
import {View, StyleSheet, ScrollView,TouchableOpacity} from "react-native"
import {colors} from "../../../constants/styles";
import {Chip} from 'react-native-paper';
import {StyledText} from "../../../components/StyledText";
import {normalize} from "../../../constants/styles";

const NavChip = ({title}) => {
    return (
            <TouchableOpacity style={styles.chip}>
                <StyledText style={styles.chip_text}>{title}</StyledText>
            </TouchableOpacity>
    )
};


const GroupNavigationBar = () => {
    return (
        <View style={styles.container}>
            <ScrollView horizontal={true} >
                <NavChip title={"Events"}/>
                <NavChip title={"Announcements"}/>
                <NavChip title={"Members"}/>
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
        paddingHorizontal: 10,
        marginHorizontal: normalize(10),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        color:'white'
    },
    chip_text:{
        color: colors.text.primary.main
    }
});

export default GroupNavigationBar;
