import gql from "graphql-tag";


// Based on: https://github.com/amazon-archives/aws-mobile-appsync-events-starter-react-native/blob/master/queries/SubscribeToEventComments.js
const SubscribeOnEventMutate = gql(`
subscription ($main_pk: ID!) {
    onCreateEvent(main_pk:$main_pk){
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

export default SubscribeOnEventMutate;