const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
    id: Int!
    name: String!
    email:String!
}

type Query {
    getUser(id:Int!): User
    getAllUsers: [User!]!
    AuthPayload: AuthPayload
}

type AuthPayload {
  token: String
  user: User
}

type Mutation {
    registerUser(name:String!, email: String!, password: String!): AuthPayload!
    loginUser(email: String!, password: String!): AuthPayload!
    userInputError(input: String): String!
}
`;
module.exports = typeDefs;
