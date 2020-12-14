import gql from "graphql-tag";

//Only fires off on change.

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


/*

subscription ($main_pk: ID!) {
    onMutateEventRelationship(main_pk:$main_pk){
        main_pk
        main_sk
        lastChangedCounter
        data
    }
}

Query Variable

{
    "main_pk": "GRP#boogoParty"
}


*
* */

export default SubscribeOnMutateEventRelationship;