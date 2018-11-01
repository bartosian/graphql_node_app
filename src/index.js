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
        },
        updateLink: (root, args) => {
             links= links.map(l => {
                if(l.id === args.id) {
                    const newLink = {
                        ...l,
                        ...args
                    }
                    return newLink;
                }
            })
        },
        deleteLink: (root, args) => {
             links = links.filter(l => {
                 l.id !== args.id
             });
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
