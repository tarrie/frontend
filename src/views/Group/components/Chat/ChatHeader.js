import React,{useState} from "react"
import {StyledText} from "../../../../components/StyledText";
import {View, StyleSheet, ScrollView, TouchableOpacity} from "react-native"
import {colors, normalize, sizes} from "../../../../constants/styles";
import {
    FontAwesome
} from '@expo/vector-icons';
import { SearchBar } from 'react-native-elements';

const ChatHeader = ({groupState}) => {
    const [firstQuery, setFirstQuery] = useState('');
    return (
        <View style={styles.container}>
            <View style={styles.newchat_container}>
                <StyledText type={'bold'} size={sizes.xlarge.fontSize} style={{letterSpacing: 1, marginHorizontal: 5}}>
                    Chats
                </StyledText>

                <TouchableOpacity>
                    <FontAwesome name={"pencil-square-o"} size={normalize(22.5)}
                                 style={{color: colors.primary.main, marginHorizontal: 5}}/>
                </TouchableOpacity>
            </View>

            <View style={styles.edit_container}>
              <SearchBar
                  lightTheme ={true}
                  placeholder="Search"
                    onChangeText={query => setFirstQuery( query )}
                value={firstQuery}
                  containerStyle={{
                      borderWidth:1,
                      width:'100%',
                      backgroundColor: 'transparent',
                      padding:0,
                      height:40

                  }}
              />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        borderTopWidth:1.5,
        borderColor: colors.text.secondary.main,
        width: "100%",
        height: "100%",
        flexDirection: "column",
    },
    newchat_container: {
        width: "100%",
        height: "60%",
        flexDirection: "row",
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0,0,0,.05)'
    },
    edit_container:{
        width: '100%',
        height: "40%",
        justifyContent: 'space-between',
        flexDirection: "row",
        alignItems: 'flex-end',
        paddingHorizontal:5,
        borderBottomWidth:1.5,
        borderColor: colors.text.secondary.main
    }
});


export default ChatHeader;