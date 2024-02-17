import { GraphQLClient } from "graphql-request";

const url = "https://kamalapuram.stepzen.net/api/crazy-chimp/__graphql";
const apiKey = process.env.EXPO_PUBLIC_GRAPHQL_API_KEY;


const graphqlClient = new GraphQLClient(url, {
  headers: {
    Authorization: `apiKey ${apiKey}`,
  },
});

export default graphqlClient;
