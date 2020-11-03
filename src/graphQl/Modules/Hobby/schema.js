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

type Hobby {
    id: Int!
    name: String!
    userId: Int!
    description:String
    bannerImage: String
    profileImage: String
    image:String
    isDeleted: Boolean
}

type hobbyResponse { 
    hobby: Hobby
    hobbyPosts: [HobbyPosts!]
}

type Query {
    Hobby(name:String!): hobbyResponse!
    Hobbies:[Hobby!]!
}

type Message {
    message: String!
}

input createHobbyInput {
    name:String! @constraint(minLength: 5)
    description:String!
    image:String
    profileImage:String
    bannerImage:String
}

type Mutation {
    createHobby(input: createHobbyInput): Hobby!
    updateHobby(id: Int, input: createHobbyInput): Hobby!
    deleteHobby(id:Int): Message!
}`;
module.exports = typeDefs;
