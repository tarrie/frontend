import config from '../../aws-exports'
import API, {graphqlOperation} from '@aws-amplify/api'
import PubSub from '@aws-amplify/pubsub';
import ListEventHostedByEntity from "./GraphQLQueries/ListEventHostedByEntity";
import SubscribeOnEventCreate from "./GraphQLQueries/SubscribeOnEventCreate";
// https://docs.amplify.aws/lib/graphqlapi/getting-started/q/platform/js#configure-your-application

API.configure(config);         // Configure Amplify
PubSub.configure(config);

class RestApi {
    static getEventsHostedByEntity = ({main_pk}) => {
        const params = {
            selector: {
                "main_pk": main_pk,
                "main_sk": "HOST#EVT#"
            }
        };
        return API.graphql(graphqlOperation(ListEventHostedByEntity, params));
    };

    static subscribeToEvents = async (main_pk = "EVT#1364642099Q3AExQ") => {

        const params = {main_pk: main_pk};

        await API.graphql(
            graphqlOperation(SubscribeOnEventCreate,params)
        ).subscribe({
            next: (data) => console.log(data.value.data.onCreateEvent)
        });
    }

}


export default RestApi;