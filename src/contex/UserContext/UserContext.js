import React, {createContext, useState, useEffect} from "react"


const UserContext = createContext();

const UserContextProvider = ({children}) => {


    /**
     * Sets the base navigation so we can access it anywhere in the app.
     * @param navigation
     */
    const setBaseNavigation = ({navigation}) => {

        setState({
            ...state,
            baseNavigation: navigation
        })
    };

    useEffect(() => {
        setState({
            ...state,
            isLoggedIn: true,
            userInfo: {userId:'USR#beckb_triDelt'}
        })
    }, []);

    const initialState = {
        isLoggedIn: false,
        userInfo: {},
        baseNavigation: null,
        setBaseNavigation
    };

    const [state, setState] = useState(initialState);


    return <UserContext.Provider value={state}>{children}</UserContext.Provider>
};

export {
    UserContext,
    UserContextProvider
}