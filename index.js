import express from "express";
import bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "graphql-server-express";
import { apolloUploadExpress } from "apollo-upload-server";
import { makeExecutableSchema } from "graphql-tools";
import cors from 'cors';

import typeDefs from "./schemas/schema";
import resolvers from "./resolvers/resolvers";
import * as mongodb from "./database/connection"



const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const app = express();
mongodb.ConnectDatabase()
app.use(bodyParser.json());
app.use(apolloUploadExpress({ uploadDir: "./" }))
app.options('*', cors())
app.use("/graphql", graphqlExpress({ 
  schema
}));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));


app.listen(4000, () => {
  console.log("Server listening in 4000")
});
