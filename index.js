const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
require('dotenv').config();
const connectionString = process.env.DB_STRING;
// Apollo Server
// typeDefs: GraphQL Type Definitions
// resolvers: How do we resolve queries / mutations

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const server = new ApolloServer({
    typeDefs,
    resolvers
})

mongoose.connect(`${connectionString}/fake-shop`, {useNewUrlParser: true})
    .then((client) => {
        console.log('MongoDB Connection successful');
        return server.listen({port: 5000})
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`)
    })