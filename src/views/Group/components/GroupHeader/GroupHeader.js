import React,{useContext} from "react"
import {StyledText} from "../../../../components/StyledText";
import {View, StyleSheet, ScrollView,ImageBackground,Text,ActivityIndicator} from "react-native"
import {colors, normalize, sizes,SCREEN_HEIGHT} from "../../../../constants/styles";
import { Avatar } from 'react-native-paper';
import { Image } from 'react-native-elements';
import {GroupContext} from "../../../../context/GroupContext";

const GroupHeader = () => {
    const {groupState} = useContext(GroupContext);


    return (
        <View style={styles.container}>
            <View style={styles.image_container}>
                {groupState.isLoaded && <Image source={{ uri: 'https://picsum.photos/700' }} style={{ ...styles.image }} resizeMode={'cover'} PlaceholderContent={<ActivityIndicator />}/>}
            </View>

            <View style={styles.groupInfo_container}>
                {groupState.isLoaded&&
                <View style={styles.groupInfo_name_container}>
                    <StyledText type={'black'} size={SCREEN_HEIGHT/32} style={{ alignSelf:'center'}}> {groupState.group.name}  </StyledText>
                    <Text style={{fontSize:SCREEN_HEIGHT/40, alignSelf:'center',textAlign:'center'}}>&#183;</Text>
                    <StyledText  type={'book'} size={SCREEN_HEIGHT/50}  style={{ alignSelf:'center',textAlign:'center', color:colors.text.primary.light}}> @{groupState.group.main_pk.substring(4)}</StyledText>
                </View>
                }

                {groupState.isLoaded&&
                <View >
                    <StyledText type={'book'} size={SCREEN_HEIGHT/55} style={{ alignSelf:'center'}}> {groupState.group.location.locName} &#183; {groupState.group.location.city} &#183; {groupState.group.location.state} </StyledText>
                </View>
                }


            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        flexDirection:'column',
        width: "100%",
        height: '100%',
        backgroundColor: colors.background_color.white,
    },
    image_container:{
        width: '100%',
        height: '70%'
    },
    groupInfo_container:{
        height:'30%',
        width:'100%',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    groupInfo_name_container:{
        flexDirection:'row',
        width:'100%',
        alignSelf: 'center',
        justifyContent:'center',

    },
    location_container:{

    },
    image:{
        width: '100%',
        height: '100%',
        borderRadius: 2,
    }
});

export default GroupHeader;