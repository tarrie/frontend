import React, {createContext, useState, useEffect} from "react"


const CreateEventContext = createContext();

const CreateEventContextProvider = ({children}) => {


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

    const initialState = {
        setBaseNavigation
    };

    const [state, setState] = useState(initialState);


    return <CreateEventContext.Provider value={state}>{children}</CreateEventContext.Provider>
};

export {
    CreateEventContext,
    CreateEventContextProvider
}

