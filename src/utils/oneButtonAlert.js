import {Alert} from "react-native";


const oneButtonAlert = (title, message)=>{
            Alert.alert(
                title,
                message,
                [
                    {text: "OK", onPress: () => console.log("OK Pressed"), style: "default"}
                ],
                {cancelable: true}
            );
};

export default oneButtonAlert;