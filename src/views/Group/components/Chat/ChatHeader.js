import React, {useState,useRef,useEffect} from "react"
import {StyledText} from "../../../../components/StyledText";
import {View, StyleSheet, ScrollView, TouchableOpacity} from "react-native"
import {colors, normalize, sizes, SCREEN_HEIGHT} from "../../../../constants/styles";
import {
    FontAwesome
} from '@expo/vector-icons';
import {Searchbar} from 'react-native-paper';

import {SearchBar} from 'react-native-elements';


const ChatHeaderActive = ({groupState, activeCallback,isFocused,isSearchUp,setIsSearchUp}) => {
    const [firstQuery, setFirstQuery] = useState('');
    const search_ref = useRef(null);

    useEffect(()=>{
        if (isFocused && search_ref.current){
            search_ref.current.focus();
        }

    },[isFocused,isSearchUp]);

    const onCancel = ()=>{
        search_ref.current.blur();
        setIsSearchUp(false);
        activeCallback(false);
    };

    return (
        <View style={styles.container}>

            <View style={{...styles.edit_container }}>
                <Searchbar
                    ref={search_ref}
                    lightTheme={true}
                    onFocus={()=>activeCallback(true)}
                    onBlur={()=>activeCallback(false)}
                    placeholder="Search"
                    showCancel ={true}
                    onChangeText={query => setFirstQuery(query)}
                    value={firstQuery}
                    style={{
                        borderWidth: .5,
                        borderRadius: 5,
                        borderColor:'rgba(0,0,0,.05)',
                        width: !isSearchUp?'75%':'80%',
                        padding: 0,
                        height: '100%',
                        backgroundColor:'rgba(0,0,0,.08)'
                    }}
                />
                <TouchableOpacity
                    style={{height:'100%', flexDirection:'column', justifyContent:'center'}}
                    onPress={onCancel}
                >
                        <StyledText size={SCREEN_HEIGHT/45} type={'book'} style={{color:colors.primary.light,marginRight:normalize(1)}}>
                            Cancel
                        </StyledText>
                </TouchableOpacity>
            </View>
        </View>
    )
};


const ChatHeader = ({groupState, activeCallback,isFocused,isSearchUp,setIsSearchUp}) => {
    const [firstQuery, setFirstQuery] = useState('');
    const search_ref = useRef(null);

    useEffect(()=>{
        if (isFocused && search_ref.current){
            search_ref.current.focus();
        }

        if (!isSearchUp){
            activeCallback(false);
        }

    },[isFocused,isSearchUp]);

    console.log(isSearchUp)
    return (
        <View style={styles.container}>
           {!isSearchUp && <View style={styles.newchat_container}>
                 <StyledText type={'bold'} size={SCREEN_HEIGHT/28} style={{letterSpacing: .5, marginHorizontal: 5}}>
                    Chats
                </StyledText>
            </View>}

            <View style={{...styles.edit_container, marginBottom:!isSearchUp&&SCREEN_HEIGHT/120 }}>
                <Searchbar
                    ref={search_ref}
                    lightTheme={true}
                    onFocus={()=>activeCallback(true)}
                    onBlur={()=>activeCallback(false)}
                    placeholder="Search"
                    showCancel ={true}
                    onChangeText={query => setFirstQuery(query)}
                    value={firstQuery}
                    style={{
                        borderWidth: .5,
                        borderRadius: 5,
                        borderColor:'rgba(0,0,0,.05)',
                        width: !isSearchUp?'75%':'80%',
                        padding: 0,
                        height: '100%',
                        backgroundColor:'rgba(0,0,0,.08)'
                    }}
                />
                <TouchableOpacity
                    style={{height:'100%', flexDirection:'column', justifyContent:'center'}}
                    onPress={()=>{return isSearchUp&&setIsSearchUp(false)}}
                >
                    {isSearchUp?
                        <StyledText size={SCREEN_HEIGHT/45} type={'book'} style={{color:colors.primary.light,marginRight:normalize(1)}}>
                            Cancel
                        </StyledText>
                        :
                    <FontAwesome name={"pencil-square-o"} size={SCREEN_HEIGHT/26}
                                 style={{color: colors.primary.main, padding:0}}/>}
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
        backgroundColor:   'rgba(0,0,0,.02)',
        justifyContent:'center'

    },
    newchat_container: {
        width: "100%",
        flexDirection: "row",
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        flex:1,
    },
    edit_container: {
        backgroundColor: 'transparent',
        width: '100%',
        flex:.8,
        flexDirection: "row",
        alignItems: 'flex-end',
        borderColor: colors.text.secondary.main,
        paddingHorizontal: 5,
        justifyContent: 'space-between',

    }
});


export {ChatHeader,ChatHeaderActive}