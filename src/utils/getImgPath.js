import {S3_REGION, IMG_S3_BUCKET, EntityType} from "../constants/parameters";
import * as path from 'path';

const getEntityType = (entityId) => {
    // split the entityId by "#" to get the entityType
    let arrOfStr = entityId.split("#");
    return {
        entityType: arrOfStr[0],
        id: arrOfStr[1]
    }
};

/**
 * Gets the profile img of a Tarrie Entitiy
 * @param entityId
 * @return {string}
 */
const getImgPath = (entityId) => {
    const {id, entityType} = getEntityType(entityId);

    let basePath = `https://${IMG_S3_BUCKET}.s3.${S3_REGION}.amazonaws.com`;
    let folderName = path.join("pictures", id);

    switch (entityType) {
        case EntityType.EVENT:
            folderName = path.join("events", folderName);
            break;
        case EntityType.GROUP:
            folderName = path.join("groups", folderName);
            break;
        case EntityType.USER:
            folderName = path.join("users", folderName);
            break;
        default:
            throw "Invalid TarrieId";
    }

    return path.join(basePath,folderName,"profile");
};

export default getImgPath;