import React from "react"
import {StyledText} from "../../../components/StyledText";
import {View, StyleSheet, ScrollView} from "react-native"
import {colors} from "../../../constants/styles";

const GroupHeader = ({groupState}) => {
    return (
        <View style={style.container}>
            <StyledText> Group Header</StyledText>
        </View>
    )
};

const style = StyleSheet.create({
    container: {
        width: "100%",
        height: '100%',
        backgroundColor: colors.background_color.grey_tablet,
        borderWidth: 1
    },
});

export default GroupHeader;