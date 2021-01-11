const { gql } = require('apollo-server-express');


const typeDefs = gql`

    type Member {
        user: User!
        hobby: Hobby!
        member: Boolean
        isDeleted: Boolean
    }

    type IfMember {
        member: Boolean!
    }

    type Query{ 
        getMember(id: Int): Member
        checkIfMember(hobbyId: Int): IfMember
        getMembers(hobbyId: Int): [Member!]
    }

    type Mutation { 
        joinHobby(hobbyId:Int): Member
        leaveHobby(hobbyId: Int): Member
    }

`;

export default typeDefs;
