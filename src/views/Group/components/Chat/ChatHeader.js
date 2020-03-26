import React, {useState} from "react"
import {StyledText} from "../../../../components/StyledText";
import {View, StyleSheet, ScrollView, TouchableOpacity} from "react-native"
import {colors, normalize, sizes, SCREEN_HEIGHT} from "../../../../constants/styles";
import {
    FontAwesome
} from '@expo/vector-icons';
import {Searchbar} from 'react-native-paper';

import {SearchBar} from 'react-native-elements';

const ChatHeader = ({groupState, activeCallback}) => {
    const [firstQuery, setFirstQuery] = useState('');
    return (
        <View style={styles.container}>
            <View style={styles.newchat_container}>
                <StyledText type={'bold'} size={SCREEN_HEIGHT/28} style={{letterSpacing: .5, marginHorizontal: 5}}>
                    Chats
                </StyledText>


            </View>

            <View style={styles.edit_container}>
                <Searchbar
                    onFocus={()=>console.log('focused')}
                    lightTheme={true}
                    placeholder="Search"
                    showCancel ={true}
                    onChangeText={query => setFirstQuery(query)}
                    value={firstQuery}
                    style={{
                        borderWidth: .5,
                        borderRadius: 5,
                        borderColor:'rgba(0,0,0,.05)',
                        width: '75%',
                        padding: 0,
                        height: '100%',
                        backgroundColor:'rgba(0,0,0,.08)'
                    }}
                />
                <TouchableOpacity style={{height:'100%', flexDirection:'column', justifyContent:'flex-end'}}>
                    <FontAwesome name={"pencil-square-o"} size={SCREEN_HEIGHT/26}
                                 style={{color: colors.primary.main, padding:0}}/>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        borderColor: colors.text.secondary.main,
        width: "100%",
        height: "100%",
        flexDirection: "column",
        backgroundColor:   'rgba(0,0,0,.02)'

    },
    newchat_container: {
        width: "100%",
        flexDirection: "row",
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        flex:1,
        marginBottom: SCREEN_HEIGHT/250
    },
    edit_container: {
        backgroundColor: 'transparent',
        width: '100%',
        flex:.8,
        flexDirection: "row",
        alignItems: 'flex-end',
        paddingHorizontal: 5,
        borderColor: colors.text.secondary.main,
        marginBottom: SCREEN_HEIGHT/120,
        justifyContent: 'space-between',
        borderWidth:1

    }
});


export default ChatHeader;