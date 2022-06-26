const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;

const movies =[
    {id: '1', title: 'The Matrix', genre: 'Action'},
    {id: '2', title: 'The Matrix Reloaded', genre: 'Action'},
    {id: '3', title: 'The Matrix Revolutions', genre: 'Action'},
]

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        movie: {
            type: MovieType,
            args: {id: {type: GraphQLID}},
            resolve(parentValue, args) {
                return _.find(movies, {id: args.id});
            }
        }
    })
})

module.exports = new GraphQLSchema({
    query: RootQuery
})