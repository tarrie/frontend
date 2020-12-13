import React from "react"
import {NavigationContainer} from "@react-navigation/native"
import BottomNavigation from "./BottomNavigation";
import {UserContextProvider} from "../context/UserContext";

const Navigation = () => {
    return (
        <UserContextProvider>
            <NavigationContainer>
                <BottomNavigation/>
            </NavigationContainer>
        </UserContextProvider>
    )
};

export default Navigation
