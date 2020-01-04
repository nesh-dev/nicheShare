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

type Mutation {
    createHobby(name:String): Hobby!
    updateHobby(id:Int, name:String): Hobby! 
}`;
module.exports = typeDefs;
