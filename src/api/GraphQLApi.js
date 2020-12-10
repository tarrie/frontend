import config from '../../aws-exports'
import API, {graphqlOperation} from '@aws-amplify/api'
import PubSub from '@aws-amplify/pubsub';
import ListEventHostedByEntity from "./GraphQLQueries/ListEventHostedByEntity";
import SubscribeOnMutateEvent from "./GraphQLQueries/SubscribeOnMutateEvent";
import SubscribeOnMutateEventRelationship from "./GraphQLQueries/SubscribeOnEventRelationship";
import {isIdValid} from "../utils";
import {EntityType} from "@constants/parameters";
import oneButtonAlert from "../utils/oneButtonAlert";
// https://docs.amplify.aws/lib/graphqlapi/getting-started/q/platform/js#configure-your-application

//API.configure(config);         // Configure Amplify
//PubSub.configure(config);

const defaultDataFn = (data) => console.log(`[GraphQLApi::subscribe()] \n\t${JSON.stringify(data)}\n`);
const defaultErrorFn = (e)=>oneButtonAlert(`[GraphQLApi::subscribe()]`,JSON.stringify(e));



class RestApi {

    /*
    constructor(){
        this.state = {};
    }*/

     static getEventsHostedByEntity = ({main_pk}) => {
        const params = {
            selector: {
                "main_pk": main_pk,
                "main_sk": "HOST#EVT#"
            }
        };
        return API.graphql(graphqlOperation(ListEventHostedByEntity, params));
    };

    /**
     * Use this to subscribe to edits on events. Run this as a async function unless this will just block
     * @param main_pk: The primary key, in this instance the eventId
     * @param onData: Callback function that takes in data which is a map with the keys in this dict active --> SubscriptionKeys["subscribeToEvents"]
     * @param onError: Call back function that does stuff with error
     * @return {ZenObservable.Subscription}: Returns an `Observable`. Use the return_value.unsubscribe() to unsubscribe from the subscription
     * @example let subscription; subscription = subscribeToEvents(); subscription.unsubscribe();
     * @link https://docs.amplify.aws/lib/graphqlapi/subscribe-data/q/platform/js#using-aws-appsync-sdk
     */
     static subscribeToEvents = (main_pk = "EVT#1364642099Q3AExQ", onData = defaultDataFn, onError = defaultErrorFn) => {

        const params = {main_pk: main_pk};

        // Let console know that ID is not valid.
        if (!isIdValid(main_pk, EntityType.EVENT)){
            console.error(`[RestApi::subscribeToEvents] id invalid suppose to be type of one of ${EntityType.EVENT}) but received id of format: ${main_pk}`);
            return
        }

        return API.graphql(
            graphqlOperation(SubscribeOnMutateEvent, params)
        ).subscribe({
            next: (input)=>onData(input.value.data["onMutateEvent"]),
            error: onError
        });
    };


    /**
     * subscribeToEventRelationship means to subscribe to all changes in which a user or group is associated to. The subscription
     * shoots off once a event a group is associated to changes.
     * @param main_pk: A groupId or a userId
     * @param onData: Callback function that takes in data which is a map with the keys in this dict active --> SubscriptionKeys["subscribeToEvents"]
     * @param onError: Call back function that does stuff with error
     * @return {ZenObservable.Subscription}
     */
    static subscribeToEventRelationship = (main_pk, onData = defaultDataFn, onError = defaultErrorFn)=>{
        const params = {main_pk: main_pk};


        // Let console know that ID is not valid.
        if (!(isIdValid(main_pk, EntityType.GROUP)||isIdValid(main_pk, EntityType.USER))){
            console.warn(`[RestApi::subscribeToEventRelationship] id invalid suppose to be type of one of ${EntityType.GROUP}, ${EntityType.USER}) but received id of format: ${main_pk}`);
            return
        }


        return API.graphql(
            graphqlOperation(SubscribeOnMutateEventRelationship, params)
        ).subscribe({
            next: (input)=>onData(input.value.data["onMutateEventRelationship"]),
            error: onError
        });
    };

}


export default RestApi;