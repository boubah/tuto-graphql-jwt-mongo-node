import User from '../database/models/userModel'

export default `

input Upload {
  name: String!
  type: String!
  size: Int!
  path: String!
}

input UserInput {
  fullName: String!
  email: String!
  password: String!
}

input LoginInput {
  email: String!
  password: String!
}

type Mutation {
  uploadFile(file: Upload!): Boolean!
  createUser(user: UserInput!): String!
}

type Query {
  hello: String
  login(user: LoginInput!): String!
}

`;
