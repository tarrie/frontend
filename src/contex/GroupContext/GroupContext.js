import React, { createContext, useState, useEffect } from "react"
import useGroup from "./useGroup";
import useGroupHome from "./useGroupHome";
const GroupContext = createContext();

const GroupContextProvider = ({ children }) => {
const state = {groupState:useGroup(),groupHomeState:useGroupHome()}
    return <GroupContext.Provider value={state}>{children}</GroupContext.Provider>
};

export {
    GroupContext,
    GroupContextProvider
}