const { gql, } = require('apollo-server-express');

const typeDefs = gql`


directive @constraint(
    # String constraints
    minLength: Int
    maxLength: Int
    startsWith: String
    endsWith: String
    notContains: String
    pattern: String
    format: String

    # Number constraints
    min: Int
    max: Int
    exclusiveMin: Int
    exclusiveMax: Int
    multipleOf: Int
  ) on INPUT_FIELD_DEFINITION

    type HobbyPosts {
        title: String!
        description: String!
        image: String 
        hobbyId: Int!
        slug: String!
       
    }

    type HobbyPostsPayload {
        hobbyPosts: HobbyPosts
        user: User
    }

    type Message {
        Message: String!
    }
    type Query {
        getHobbyPosts: [HobbyPosts!]!
        getHobbyPost(id:Int): HobbyPosts!
    }
    
    input hobbyPostsInput {
        title:String,
        description:String,
        image: String 
        hobbyId:Int!
    }

    type Mutation {
        createHobbyPosts(input: hobbyPostsInput): HobbyPostsPayload!
        updateHobbyPosts(input: hobbyPostsInput): HobbyPostsPayload!
        deleteHobbyPosts(id:Int): Message!

    }
  
`;

module.exports = typeDefs;
