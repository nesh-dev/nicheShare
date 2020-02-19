const { gql, } = require('apollo-server-express');

const typeDefs = gql`

    type HobbyPosts {
        title: String!
        description: String!
        image: String 
        userId: Int!
        hobbyID: Int!
    }

    type Message {
        Message: String!
    }

    type Mutation {
        createHobbyPosts(title:String, description:String, image: String): HobbyPosts!
        updateHobbyPosts(id:Int, title:String, description:String, image: String): HobbyPosts!
        deleteHobbyPosts(id:Int): Message!

    }
    type Query {
        getHobbyPosts: [HobbyPosts!]!
        getHobbyPost(id:Int): HobbyPosts!

    }
`;

module.exports = typeDefs;
