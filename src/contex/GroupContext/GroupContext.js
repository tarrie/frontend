import React, { createContext, useState, useEffect } from "react"
import useGroup from "./useGroup";

const GroupContext = createContext();

const GroupContextProvider = ({ children }) => {
    const groupState = useGroup();
    return <GroupContext.Provider value={groupState}>{children}</GroupContext.Provider>
};

export {
    GroupContext,
    GroupContextProvider
}