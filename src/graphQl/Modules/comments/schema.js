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

type Comment {
    id: Int!
    text: String!
    author: User!
    reply:Boolean
    hobbyPost: HobbyPosts
    parent: Comment
    commentReplies(id: Int!): [Comment!]
}



type Query {
    Comment(id:Int!): Comment!
    Replies(id:Int!): [Comment!]
    Comments:[Comment!]!

}

type Message {
    message: String!
}

input createCommentInput {
    text:String! @constraint(minLength: 5)
    hobbyPostId: Int!
    parent: Int
}

type Mutation {
    createComment(input: createCommentInput): Comment!
    updateComment(id:Int, input: createCommentInput): Comment!
    deleteComment(id:Int): Message!
}`;
module.exports = typeDefs;
