const { gql, } = require('apollo-server-express');

const typeDefs = gql`

type Hobby {
    id: Int!
    name: String!
    userId: Int!
    description:String
    image:String
    isDeleted: Boolean
    
}

type Query {
    getHobby(name:String!): Hobby!
    getHobbies:[Hobby!]!
}

type Message {
    message: String!
}

type Mutation {
    createHobby(name:String, description:String, image:String): Hobby!
    updateHobby(id:Int, name:String, description:String, image:String): Hobby!
    deleteHobby(id:Int): Message!
}`;
module.exports = typeDefs;
