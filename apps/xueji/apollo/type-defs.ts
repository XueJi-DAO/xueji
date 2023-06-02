import { gql } from '@apollo/client'

export default gql`
  type Movie {
    title: String
    tagline: String
    released: Int
    actors: [Person!]! @relationship(type: "ACTED_IN", direction: IN)
    directors: [Person!]! @relationship(type: "DIRECTED", direction: IN)
    fullName: String @customResolver(requires: ["title", "tagline"])
  }

  type Person {
    name: String
    born: Int
    movies: [Movie!]! @relationship(type: "ACTED_IN", direction: OUT)
  }

  type User {
    id: ID!
    email: String!
    createdAt: Int!
  }

  input SignUpInput {
    email: String!
    password: String!
  }

  type SignUpPayload {
    user: User!
  }

  type Query {
    info: String!
    user(id: ID!): User!
    users: [User]!
    viewer: User
  }

  type Mutation {
    signUp(input: SignUpInput!): SignUpPayload!
  }
`
