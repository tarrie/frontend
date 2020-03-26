import React from "react"
import {StyledText} from "../../../../components/StyledText";
import {View, StyleSheet, ScrollView,TouchableOpacity} from "react-native"
import {colors, normalize, sizes} from "../../../../constants/styles";
import {useGroup} from "../../../../contex";
import {Chip} from 'react-native-paper';
import {GroupNavigationBar} from "../../routes";
import {SafeAreaView} from "react-native-safe-area-context";
import {GroupHeader} from "../../components";
import {
    FontAwesome
} from '@expo/vector-icons';
import {ChatHeader} from "../../components/Chat";
import { useNavigation } from "@react-navigation/native"


const GroupHome = () => {
    const groupState = useGroup({groupId: 'groupId'});
    const navigation = useNavigation();

    return (
            <View style={styles.container}>
                <View style={styles.container_groupHeader}>
                    <GroupHeader groupState={groupState}/>
                </View>

                <View style={styles.container_groupNavBar}>
                    <GroupNavigationBar groupState={groupState} navigation={navigation}/>
                </View>

                <View style={styles.container_groupChatHeader}>
                    <ChatHeader groupState={groupState}/>
                </View>

                <StyledText> Group Page</StyledText>
            </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        width: "100%",
        height: '100%',
        backgroundColor: colors.background_color.grey_tablet
    },
    container_groupHeader: {
        width: "100%",
        height: "40%",
        alignSelf: 'flex-start',
    },
    container_groupNavBar: {
        width: "100%",
        height: "8%",
        margin:0
    },
    container_groupChatHeader:{
        width: "100%",
        height: "12%",
    }
});

export default GroupHome;