import {EntityType} from "../constants/parameters";

/**
 * Checks if a tarrie ID is valid
 * @param id: id that matches `entityType` so like EVT#123
 * @param entityType: enum from {@link EntityType} so like EntityType.event
 * @return {boolean}: true if valid
 * @see {@link https://eloquentjavascript.net/09_regexp.html}
 */
const isIdValid = (id, entityType) =>{
    let re = new RegExp(`(?<entityType>${entityType})#`);
    return re.test(id);
};

export default isIdValid;