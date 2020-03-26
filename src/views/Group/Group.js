import React from "react"
import {StyledText} from "../../components/StyledText";
import {View, StyleSheet, ScrollView} from "react-native"
import {colors, sizes} from "../../constants/styles";
import {useGroup} from "../../contex";
import {Chip} from 'react-native-paper';
import {GroupNavigationBar} from "./routes";
import {SafeAreaView} from "react-native-safe-area-context";
import {GroupHeader} from "./components";
import {
    FontAwesome
} from '@expo/vector-icons';



const Group = () => {
    const groupState = useGroup({groupId: 'groupId'});

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.container_groupHeader}>
                    <GroupHeader groupState={groupState}/>
                </View>

                <View style={styles.container_groupNavBar}>
                    <GroupNavigationBar/>
                </View>

                <View style={styles.container_groupChatHeader}>
                    <StyledText type={'bold'} size={sizes.xlarge.fontSize} style={{letterSpacing:1}}>
                        Chat
                    </StyledText>
                    <FontAwesome name={"pencil-square-o"} size={30} style={{color:colors.primary.main}}/>
                </View>

                <StyledText> Group Page</StyledText>
            </View>
        </SafeAreaView>
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
        height: "30%",
        alignSelf: 'flex-start',
    },
    container_groupNavBar: {
        width: "100%",
        height: "10%",
        margin:0
    },
    container_groupChatHeader:{
        width: "100%",
        height: "8%",
        borderWidth: 1,
        flexDirection: "row",
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    }
});

export default Group;