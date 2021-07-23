const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const typeDefs = require('./TypeDefs');
const resolvers = require('./resolvers/Resolvers');
const mongoose = require('mongoose');
const dburl = process.argv[2]? process.argv[2]: "mongodb://localhost:27017/aquasoft_iapp";

(async ()=>{
    const app = express();
    const apolloServer = new ApolloServer({typeDefs, resolvers})
    
    await mongoose.connect(dburl,{useNewUrlParser:true, useUnifiedTopology:true,useFindAndModify:false})
    await apolloServer.start();
    apolloServer.applyMiddleware({app})

    app.listen(4000, ()=>{console.log("Listening on port 4000.\n","Access playground via /graphql")});
})()