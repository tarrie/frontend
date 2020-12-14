import React, {createContext, useState, useEffect, useCallback} from "react"
import wait from "@utils/wait";
import PropTypes from 'prop-types';

const getGroupId = ({main_pk}) => {
    return main_pk;
};

/**
 * @param groupState: {@link useGroup}
 */
const useGroupHome = ({groupState}) => {
    const {group, isLoaded, loadGroup, createEvent, getEventsHosted} = groupState;

    const [isSearchActive, setIsSearchActive] = useState(false);
    const [isSearchUp, setIsSearchUp] = useState(false);
    const [isCalendarDown, setIsCalendarDown] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getEventsHosted({}).then(() => setRefreshing(false))
    }, []);


    return {
        isSearchActive,
        setIsSearchActive,
        isSearchUp,
        setIsSearchUp,
        isCalendarDown,
        setIsCalendarDown,
        onRefresh,
        refreshing
    }
};

useGroupHome.propTypes = {
    group: PropTypes.object.isRequired,
};


export default useGroupHome;