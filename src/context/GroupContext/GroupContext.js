import React, {createContext, useState, useEffect} from "react"
import {useGroup} from "./useGroup";
import useGroupHome from "./useGroupHome";

const GroupContext = createContext();

const GroupContextProvider = ({children}) => {


    const groupState = useGroup();
    const groupHomeState = useGroupHome({groupState})

    const state = {groupState, groupHomeState};
    return <GroupContext.Provider value={state}>{children}</GroupContext.Provider>
};

export {
    GroupContext,
    GroupContextProvider
}