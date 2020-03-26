import React, {useEffect, useState} from 'react';
import * as Font from "expo-font"
import {StyleSheet,YellowBox} from 'react-native';
import {SafeAreaProvider} from "react-native-safe-area-context"
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Navigation} from "./src/routes";
import {StyledText} from "./src/components/StyledText";
import {colors} from "./src/constants/styles";


const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: colors.primary.main,
        accent: colors.secondary.main,
        background: colors.background_color.grey_tablet,
        surface: colors.background_color.grey_tablet,
    },
    fonts: {
        regular: "source-sans-pro-regular",
        medium: "airbnb-book",
        light: "airbnb-light",
        thin: "raleway-thin"
    }
};

const App = () => {
    const [isFontLoaded, setIsFontLoaded] = useState(false);

    useEffect(() => {
        const load = async () => {
            YellowBox.ignoreWarnings(["Warning: Failed prop type: Invalid props.style key `0`"]);

            /*
              To add more of the fonts, go see what's in assets/fonts
              Add it to the object loading async below, and set the key to a kebab-cased version of the font name
            */
            await Font.loadAsync({
                "source-sans-pro-regular": require("./src/assets/fonts/SourceSansPro-Regular.ttf"),
                "source-sans-pro-bold": require("./src/assets/fonts/SourceSansPro-Bold.ttf"),
                "source-sans-pro-semibold": require("./src/assets/fonts/SourceSansPro-SemiBold.ttf"),
                "airbnb-light": require("./src/assets/fonts/AirbnbCereal-Light.ttf"),
                "airbnb-black": require("./src/assets/fonts/AirbnbCereal-Black.ttf"),
                "airbnb-book": require("./src/assets/fonts/AirbnbCereal-Book.ttf"),
                "raleway-thin": require("./src/assets/fonts/Raleway-Thin.ttf")

            });
            setIsFontLoaded(true)
        };
        load();
    }, []);

    return (
        isFontLoaded &&
        (
            <SafeAreaProvider>
                <PaperProvider theme={theme}>
                    <Navigation/>
                </PaperProvider>
            </SafeAreaProvider>
        )
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default App;