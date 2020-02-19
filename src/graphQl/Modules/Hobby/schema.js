const { gql } = require('apollo-server-express');

const typeDefs = gql`

type Hobby {
    id: Int!
    name: String!
}

type Query {
    getHobby(name:String!): Hobby!
    getHobbies:[Hobby!]!
}

type Message {
    message: String!
}

type Mutation {
    createHobby(name:String): Hobby!
    updateHobby(id:Int, name:String): Hobby! 
    deleteHobby(id: Int): Message
}`;
module.exports = typeDefs;
