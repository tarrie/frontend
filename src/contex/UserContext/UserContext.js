import React, { createContext, useState, useEffect } from "react"

const initialState = {
    isLoggedIn: false,
    userId: null,
};

const UserContext = createContext(initialState);

const UserContextProvider = ({ children }) => {
    const [state, setState] = useState(initialState);

    useEffect(() => {
            setState({
                ...state,
                isLoggedIn: true,
                userId: 'USR#beckb_triDelt'
            })
        }, []);

    return <UserContext.Provider value={state}>{children}</UserContext.Provider>
};

export {
    UserContext,
    UserContextProvider
}