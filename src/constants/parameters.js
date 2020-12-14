import {SCREEN_HEIGHT} from "./styles";

export const CARD_HEIGHT = 100;
export const CALENDAR_HEIGHT = 272;
export const GROUP_STICKY_HEADER_HEIGHT = SCREEN_HEIGHT / 9;
export const GROUP_PARALLAX_HEADER_HEIGHT = SCREEN_HEIGHT / 2;
//export const API_HOSTNAME = "http://api.tarrie.io";
export const API_HOSTNAME = "http://localhost:8080";
export const S3_REGION = "us-east-2";
export const EntityType = {
    GROUP: "GRP",
    USER: "USR",
    EVENT: "EVT"
};

export const EventRelationshipEnum = {
    HOST: "HOST", SAVED: "SAVED", RSVP: "RSVP"
}

export const IMG_S3_BUCKET = "tarrie.io";

export const DbAttributes = {
    HASH_KEY: "main_pk",
    SORT_KEY: "main_sk",
    IMG_PATH: "imgPath",
    NAME: "name",
    DATA: "data",

    RECV_ID: "receiverId",
    TEXT_MSG: "textMsg",
    MSG_TYPE: "msgType",

    SENDER_INFO: "senderInfo",
    SENDER_ID: "senderId",

    BIO: "bio",
    FAVE: "favorite",

    LOC: "location",
    OWNER: "owner",
    ADMINS: "admins",

    EVENT_TIME: "eventTime",
    CREATOR_ID: "creatorId",
    EVENT_PRIVACY: "privacy",
    LINK_SHARING: "linkSharing",

    CREATED_TIME: "createdTime",
    END_TIME: "endTime",
    START_TIME: "startTime",

    HOST_INFO: "hostInfo",
    RSVP_NUM: "rsvpNum",
    DECISION: "decision",

    EVENT_INFO: "eventInfo",
    EVENT_ID: "eventId",
    RECV_INFO: "recvInfo",
    GROUP_INFO: "groupInfo",
    CONVO_ID: "convoId",
    HAS_SEEN: "hasSeen",
    HASH_TAGS: "hashTags",
    RELATED_TAGS: "relatedTags",
    TAG: "tag",
    USER_ID: "userId",
    TEXT: "text",
    LAST_CHANGED_COUNTER: "lastChangedCounter",

    EVENT_COORDINATORS: "coordinators",
    INVITED_ENTITIES: "invitedEntities"
};
