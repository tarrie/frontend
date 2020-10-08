import {hasParameter} from "../../utils";

const payloadToCreateEvent = ({userId, groupId, location, infoText, datetime, imgPath, title, hashTags, linkSharing, invitedEntityIds, coordinators, eventPrivacy}) => {
    console.log(`[payloadToCreateEvent] ${userId}`)
    let payload = {};

    // If groupId exists then we are creating a event for a group, thus groupId is the creatorId
    if (hasParameter(groupId)) {
        payload["creatorId"] = groupId;
    } else {
        // otherwise the user is creating a event for itself
        payload["creatorId"] = userId;
    }

    if (hasParameter(datetime)) {
        payload["startTime"] = datetime["start"];
        payload["endTime"] = datetime["end"];
    }

    if (hasParameter(infoText)) {
        payload["text"] = infoText;
    }

    if (hasParameter(eventPrivacy)) {
        payload["eventPrivacy"] = eventPrivacy;
    }


    if (hasParameter(coordinators)) {
        payload["coordinators"] = coordinators;
    }

    if (hasParameter(location)) {
        payload["location"] = location;
    }

    if (hasParameter(imgPath)) {
        payload["imgPath"] = imgPath;
    }

    if (hasParameter(title)) {
        payload["name"] = title;
    }


    if (hasParameter(userId)) {

        payload["userId"] = userId;
    }
    if (hasParameter(hashTags)) {
        payload["hashTags"] = hashTags;
    }
    if (hasParameter(linkSharing)) {
        payload["linkSharing"] = linkSharing;
    }
    if (hasParameter(invitedEntityIds)) {
        payload["invitedEntityIds"] = invitedEntityIds;
    }

    return payload;
};

export default payloadToCreateEvent;