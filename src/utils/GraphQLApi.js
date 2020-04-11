import ListEventHostedByEntity from "./GraphQLQueries/ListEventHostedByEntity";
import {useQuery} from '@apollo/react-hooks';


    const useGetEventsHostedByEntity = ({main_pk}) => {
        const selector = {
                "main_pk": main_pk,
                "main_sk": "EVT#"
            };

        const {loading, error, data} = useQuery(ListEventHostedByEntity, {
            variables: {selector},
        });

        return {loading, error, data}

    };



export {useGetEventsHostedByEntity};
