
# frontend

- https://react-native-elements.github.io/react-native-elements/docs/avatar.html
- https://callstack.github.io/react-native-paper/
- https://github.com/madhavanmalolan/awesome-reactnative-ui


fixes font load error
rm -rf ./node_modules/expo/node_modules/expo-font/


run this to get around stupid depreciation errors
npx react-codemod rename-unsafe-lifecycles
from http://eydai.cn/github_/expo/expo/issues/5507

all else fails

`rm -rf node_modules/` <br>
`rm -rf package.lock.json`<br>
`npm i`<br>
`expo start --clear`


### Dealing with graphQl unauthorized error
Go here -> https://us-east-2.console.aws.amazon.com/appsync/home?region=us-east-2#/wu2hq2ymkrh53j7eakzccyntry/v1/settings
> API keys by default expire 7 days after creation.

### When developing both frontend & backend

1. Make sure API_HOSTNAME in the file `src/parameters.js` is correct. 
2. Make sure `aws-exports.js` is correct. This contains graphQL credentials. I believe the API key is most important. 
3. Make sure Google credentials in .env correct


### Setup

- ElasticBeanStalk - manages api server
- AppSync - manages graphql
- DynamoDb - manages data model
