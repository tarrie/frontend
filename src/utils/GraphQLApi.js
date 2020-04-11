import config from '../../aws-exports'
import API, {graphqlOperation} from '@aws-amplify/api'
import PubSub from '@aws-amplify/pubsub';
import ListEventHostedByEntity from "./GraphQLQueries/ListEventHostedByEntity";

API.configure(config);         // Configure Amplify
PubSub.configure(config);

class RestApi {
    getEventsHostedByEntity = ({main_pk}) => {
        const params = {
            selector: {
                "main_pk": main_pk,
                "main_sk": "HOST#EVT#"
            }
        };
        return API.graphql(graphqlOperation(ListEventHostedByEntity, params));
    };

}


export default RestApi;