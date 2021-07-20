
const queryResolvers = require('./QueryResolvers')
const mutationResolvers = require('./MutationResolvers')

const resolvers = {
    Query:queryResolvers,
    Mutation:mutationResolvers
}

module.exports = resolvers;