import gql from "graphql-tag";


// Based on: https://github.com/amazon-archives/aws-mobile-appsync-events-starter-react-native/blob/master/queries/SubscribeToEventComments.js
const SubscribeOnMutateEvent = gql(`
subscription ($main_pk: ID!) {
    onMutateEvent(main_pk:$main_pk){
        main_pk
        main_sk
        coordinators
        name
        location
        imgPath
        linkSharing
        text
        data
        endTime
        createdTime
        hostInfo {main_pk main_sk imgPath name}
    }
}`);

export default SubscribeOnMutateEvent;