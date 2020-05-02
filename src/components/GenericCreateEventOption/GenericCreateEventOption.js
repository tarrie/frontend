import React, {useState, useEffect} from 'react';
import {View, Button, Platform, TouchableOpacity} from 'react-native';
import {Feather,EvilIcons,FontAwesome} from "@expo/vector-icons";
import {colors, normalize, SCREEN_HEIGHT} from "../../constants/styles";
import {StyledText} from "../StyledText";
import {Switch} from 'react-native-paper';
import {ZoomIcon} from "../../assets/icons";

const actionTypes = {
    location: "location",
    zoom: "zoom"
};


const GetIcon = ({actionType})=>{
    if (actionType === actionTypes.location){
        return (
            <EvilIcons name={'location'} size={25} style={{
                marginLeft: normalize(5),
                marginRight: normalize(15),
                color: colors.primary.dark
            }}/>
        )
    }
    return (
            <FontAwesome name={'video-camera'} size={25} style={{
                marginLeft: normalize(5),
                marginRight: normalize(15),
                color: '#7A4988'
            }}/>
    )
};

const GetActionText = ({actionType})=>{
    if (actionType === actionTypes.location){
        return "Add location"
    }
    return "Add virtual stream"
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
            style={{flexDirection: 'row', marginVertical: 5, borderWidth: 1, alignItems: 'center', height: 60}}>
            <GetIcon actionType={options.actionType}/>

            <View
                style={{flexDirection: 'row', borderWidth: 1, width: '86%', justifyContent: 'space-between'}}>
                <StyledText size={SCREEN_HEIGHT / 50} style={{color: colors.text.primary.light}} type={'semibold'}>
                    {GetActionText({actionType:options.actionType})}
                </StyledText>

                {options.hasSwitch&&
                <Switch
                    value={isSwitchOn}
                    onValueChange={switchHandler}
                />}
            </View>

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


export default GenericCreateEventOption;