import React, {useState, useEffect} from 'react';
import {View, Button, Platform, TouchableOpacity, StyleSheet,TextInput} from 'react-native';
import {Feather,EvilIcons,FontAwesome,AntDesign,Octicons} from "@expo/vector-icons";
import {colors, normalize, SCREEN_HEIGHT} from "@constants/styles";
import {StyledText} from "../StyledText";
import {Switch} from 'react-native-paper';
import {ZoomIcon} from "../../assets/icons";

const actionTypes = {
    location: "location",
    zoom: "zoom",
    cohosts: "cohosts",
    info:"info",
    tags:"tags"
};

/**
 * Returns the appropriate hard coded icon given available actionTypes
 * @param actionType
 * @return {*}
 * @constructor
 */
const GetIcon = ({actionType})=>{
    if (actionType === actionTypes.location){
        return (
            <Octicons name={'location'} size={25} style={style.icon}/>
        )
    }

    if (actionType === actionTypes.zoom) {
        return (
            <FontAwesome name={'video-camera'} size={25} style={style.icon}/>
        )
    }

    if (actionType === actionTypes.tags){
        return (
            <AntDesign name={'tagso'} size={25} style={style.icon}/>
        )

    }

    if (actionType === actionTypes.info){
        return (
            <Feather name={'align-left'} size={25} style={style.icon}/>
        )
    }

};

//chevron
//Feather, align-left
// FontAwesome align-left
const GetActionText = ({actionType})=>{
    if (actionType === actionTypes.location){
        return "Add location"
    }

    if (actionType === actionTypes.zoom){
        return "Add virtual stream"
    }

    if (actionType === actionTypes.tags){
        return "Add HashTags"
    }


    if (actionType === actionTypes.info){
        return "Add Description"
    }

};

const GenericCreateEventOption = ({options}) => {
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const switchHandler = ()=>{
        setIsSwitchOn(!isSwitchOn);
        if (options.hasSwitch){
            options.switchCallBack()
        }
    };


    return (
        <TouchableOpacity
            onPress={options.actionCallback}
            style={{flexDirection: 'row', marginVertical: 5, borderWidth: 1, alignItems: 'center', minHeight: 60}}>
            <GetIcon actionType={options.actionType}/>

            {options.actionType !== actionTypes.info?

            <View
                style={{flexDirection: 'row', borderWidth: 1, width: '86%', justifyContent: 'space-between', minHeight: 35,marginLeft: normalize(30)}}>
                <StyledText size={SCREEN_HEIGHT / 50} style={{color: colors.text.primary.light}} type={'semibold'}>
                    {GetActionText({actionType:options.actionType})}
                </StyledText>

                {options.hasSwitch&&
                <Switch
                    value={isSwitchOn}
                    onValueChange={switchHandler}
                />}
            </View>:

                <TextInput
                    placeholder={"Add info"}
                    style={style.info_textbox}
                    multiline={true}
                    selectionColor={colors.primary.dark}
                    onChangeText={(text) =>  options.actionCallback(text)}
                    value={options.infoText}
                />
            }

        </TouchableOpacity>
    )

};

GenericCreateEventOption.defaultProps = {
    options: {actionType:"zoom",actionCallback:()=>{},hasSwitch:false}
};

const optionValidator = (props, propName, componentName) => {
    componentName = componentName || 'ANONYMOUS';

    if (props[propName]) {
        let obj = props[propName];

        // must be object
        if (typeof obj !== 'object') {
            return new Error(propName + ' in ' + componentName + " missing `options` object of form {actionType: string.required, actionCallback: func.required, hasSwitch:bool.req, switchCallBack: func }");
        }

        // validate action type
        if (!('actionType' in obj)){
            return new Error(propName + ' in ' + componentName + " missing required field actionType");
        }else if ((typeof obj["actionType"] !== "string")||(!(obj["actionType"] in actionTypes))){
            return new Error(propName + '.actionType in ' + componentName + " must be in "+Object.keys(actionTypes));
        }

        // validate action type
        if (!('actionCallback' in obj)){
            return new Error(propName + ' in ' + componentName + " missing required field actionCallback");
        }else if (typeof obj["actionCallback"] !== "function") {
            return new Error(propName + '.actionCallback in ' + componentName + " must be of type function");
        }


        // validate action type
        if (!('hasSwitch' in obj)){
            return new Error(propName + ' in ' + componentName + " missing required field hasSwitch");
        }else if ((typeof obj["hasSwitch"] !== "boolean")){
            return new Error(propName + '.hasSwitch in ' + componentName + " must be of type bool");
        }else if ((obj["hasSwitch"]) && ((!("switchCallBack" in obj)) || (!(typeof obj["switchCallBack"] !== "function")))){
            return new Error(propName + '.switchCallBack in ' + componentName + " is required if hasSwitch=true & it must be of type func");
        }

    }

    // assume all ok
    return null;
};

//https://www.ian-thomas.net/custom-proptype-validation-with-react/
GenericCreateEventOption.propTypes = {
    options: optionValidator
};

const style = StyleSheet.create({
    info_textbox: {
        width: '86%',
        minHeight: 35,
        fontFamily: 'source-sans-pro-semibold',
        color: colors.text.primary.main,
        fontSize: SCREEN_HEIGHT / 45,
        borderColor: colors.primary.extra_dark,
        borderWidth: 1,
        marginLeft: normalize(30)
    },
    icon:{
        left:0,
        top:15,
        position: "absolute",
        marginLeft: normalize(5),
        marginRight: normalize(15),
        color: colors.primary.dark
    }
});
export default GenericCreateEventOption;