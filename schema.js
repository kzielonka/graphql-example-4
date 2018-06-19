var { graphql, buildSchema } = require('graphql')

module.exports = buildSchema(`
  type Query {
    events(limit: Int): [Event!]!
  }

  type Event {
    id: String!,
    name: String!,
    locations: String,
    talks: [Talk!]!,
  }

  type Talk {
    id: String!,
    title: String!,
    description: String!,
    speaker: Speaker!,
  }

  type Speaker {
    id: String!,
    name: String!,
    bio: String,
  }
`)
