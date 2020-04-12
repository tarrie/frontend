import gql from "graphql-tag";



const ListEventHostedByEntity = gql(`
query listEvents($selector: EventQuerySelect!, $filter: TableEventFilterInput) {
  listEvents(selector:$selector, filter:$filter) {
    items {
      main_pk
      main_sk
      data
      imgPath
    }
  }
}`);

export default ListEventHostedByEntity;

