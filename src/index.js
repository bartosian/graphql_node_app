const { GraphQLServer } = require('graphql-yoga');

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: (root, args, context, info) => {
            return context.db.query.links({}, info)
        }
    },
    Mutation: {
        post: (root, args, context, info) => {
            return context.db.mutation.createLink({
                data: {
                    url: args.url,
                    description: args.description
                },
            }, info)
        }
      }
}

const server = new GraphQLServer({
    typeDefs: `
    type Query {
        info: String!
        feed: [Link!]!
        link(id: ID!): Link
    }
    
    type Mutation {
        post(url: String!, description: String!): Link!
        updateLink(id: ID!, url: String, description: String): Link
        deleteLink(id: ID!): Link
    }
    
    type Link {
        id: ID!
        description: String!
        url: String!
    }`,
    resolvers,
  })

server.start(() => console.log(`Server is running on 4000`))
