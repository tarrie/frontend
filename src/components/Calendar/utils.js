/**
 *  Converts a date to proper format
 * @param momentDate a moment date
 * @return {{month: *, year: *, dateString: *, day: *}}
 */
import moment from "moment";

const generateDay = (momentDate) => {
    return {
        dateString: momentDate.format("YYYY-MM-DD"),
        month: momentDate.month()+1,
        year: momentDate.year(),
        day: momentDate.date(),
        timestamp: momentDate.unix()
    }
};

const generateToday = () => {
    const today = moment();
    return {
        dateString: today.format("YYYY-MM-DD"),
        month: today.month() + 1,
        year: today.year(),
        day: today.date(),
        timestamp: today.unix()
    }
};

export {generateToday,generateDay}