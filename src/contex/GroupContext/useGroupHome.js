import React, {createContext, useState, useEffect} from "react"

const useGroupHome = () => {
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [isSearchUp, setIsSearchUp] = useState(false);
    const [isCalendarDown, setIsCalendarDown] = useState(true);


    return {
        isSearchActive,
        setIsSearchActive,
        isSearchUp,
        setIsSearchUp,
        isCalendarDown,
        setIsCalendarDown
    }
};


export default useGroupHome;