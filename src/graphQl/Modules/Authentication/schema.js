const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
    id: Int!
    name: String!
    email:String!
    googleId:String
    profileAvatar: String
}

type Query {
    getUser: User
    getAllUsers: [User!]!
    AuthPayload: AuthPayload
}

type AuthPayload {
  token: String
  user: User
}

type Message {
    message: String!
}

type Mutation {
    registerUser(name:String!, email: String!, password: String!): AuthPayload!
    loginUser(email: String!, password: String!): AuthPayload!
    authGoogle(accessToken: String!): AuthPayload!
    activateUser(token: String!): Message!
    passwordReset(password: String!, token:String!): Message!
    emailToReset(email: String!): Message!
    userInputError(input: String): String!
}
`;
module.exports = typeDefs;
