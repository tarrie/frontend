import gql from "graphql-tag";


// Based on: https://github.com/amazon-archives/aws-mobile-appsync-events-starter-react-native/blob/master/queries/SubscribeToEventComments.js
const SubscribeOnMutateEventRelationship = gql(`
subscription ($main_pk: ID!) {
    onMutateEventRelationship(main_pk:$main_pk){
        main_pk
        main_sk
        lastChangedCounter
        data
    }
}`);

export default SubscribeOnMutateEventRelationship;