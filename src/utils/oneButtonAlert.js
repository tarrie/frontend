import {Alert} from "react-native";

const oneButtonAlert = (title, message)=>{
            Alert.alert(
                title,
                message,
                [
                    {text: "OK", onPress: () => {} , style: "default"}
                ],
                {cancelable: true}
            );
};

export const oneButtonAlertError = (title, message)=>{
    oneButtonAlert(`${title }:ERROR`,message)
}
export default oneButtonAlert;