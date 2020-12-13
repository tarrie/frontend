import React, {createContext, useState, useEffect} from "react"


const UserContext = createContext();

const getUserId = ({main_pk})=>{return main_pk};
const getFormattedUserId = ({main_pk})=>{return main_pk.substring(4)};

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
            user: {main_pk:'USR#beckb_triDelt'}
        })
    }, []);

    const initialState = {
        isLoggedIn: true,
        user: {main_pk:'USR#beckb_triDelt'},
        baseNavigation: null,
        setBaseNavigation
    };

    const [state, setState] = useState(initialState);


    return <UserContext.Provider value={state}>{children}</UserContext.Provider>
};

export {
    UserContext,
    UserContextProvider,
    getUserId,
    getFormattedUserId
}