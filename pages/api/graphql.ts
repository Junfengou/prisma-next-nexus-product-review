import { ApolloServer } from "apollo-server-micro"
import { schema } from "../../graphql/schema";
import Cors from "micro-cors"
import { createContext } from "../../graphql/context";

const cors = Cors();

// instantiate the apollo server
const apolloServer = new ApolloServer({ 
    schema, 
    context: createContext, 
});

// Apollo 3 needs to know when you start the server 
const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
    if(req.method === 'OPTIONS') {
        res.end();
        return false;
    }

    await startServer;
    await apolloServer.createHandler({
        path: '/api/graphql',
    })(req, res)
})


// This is specific to Nextjs
export const config = {
    api: {
        bodyParser: false,
    }
}

/*
    IMPORTANT NOTE!! 

    Apollo 3 doesn't ship with apollo playground anymore, it redirect you to apollo studio instead -> studio.apollographql.com
    If we run any request at this point, we'll run into CORS issues. 

    To ensure the request/response process properly, we need micro-cors
    
*/