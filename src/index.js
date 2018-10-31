const { GraphQLServer } = require('graphql-yoga');

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }]

  let idCount = links.length;

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links
    },
    Link: {
        id: (root) => root.id,
        description: (root) => root.description,
        url: (root) => root.url
    },
    Mutation: {
        post: (root, args) => {
           const link = {
            id: `link-${idCount++}`,
            description: args.description,
            url: args.url,
          }
          links.push(link)
          return link
        }
      }
}

const server = new GraphQLServer({
    typeDefs: `
    type Query {
        info: String!
        feed: [Link!]!
    }
    
    type Mutation {
        post(url: String!, description: String!): Link!
    }
    
    type Link {
        id: ID!
        description: String!
        url: String!
    }`,
    resolvers,
  })

server.start(() => console.log(`Server is running on 4000`))