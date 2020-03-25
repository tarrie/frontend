import React, {useEffect, useState} from 'react';
import * as Font from "expo-font"
import {StyleSheet, View} from 'react-native';
import {SafeAreaProvider} from "react-native-safe-area-context"
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Navigation} from "./src/routes";
import {StyledText} from "./src/components/StyledText";

const App = () => {
    const [isFontLoaded, setIsFontLoaded] = useState(false);

    useEffect(() => {
        const load = async () => {
            /*
              To add more of the fonts, go see what's in assets/fonts
              Add it to the object loading async below, and set the key to a kebab-cased version of the font name
            */
            await Font.loadAsync({
                "source-sans-pro-regular": require("./src/assets/fonts/SourceSansPro-Regular.ttf"),
                "source-sans-pro-bold": require("./src/assets/fonts/SourceSansPro-Bold.ttf"),
                "source-sans-pro-semibold": require("./src/assets/fonts/SourceSansPro-SemiBold.ttf"),
                "airbnb-black": require("./src/assets/fonts/AirbnbCereal-Black.ttf"),
                "airbnb-book": require("./src/assets/fonts/AirbnbCereal-Book.ttf")
            });
            setIsFontLoaded(true)
        };
        load();
    }, []);

    return (
        isFontLoaded &&
        (
            <SafeAreaProvider>
                <PaperProvider>
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