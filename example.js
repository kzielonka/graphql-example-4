const util = require('util')

const { graphql } = require('graphql')

const schema = require('./schema.js')

const dbConnectionsPool = require('./pool')

const root = require('./root.js')(dbConnectionsPool)

const query = `
  {
    events(limit: 5) {
      id
      name
      talks {
        title
        speaker {
          id
          name
          bio
        }
      }
    }
  }
`

graphql(schema, query, root).then((response) => {
  console.log('\n\n\n\n')
  console.log('========= RESPONSE: ===========')
  console.log(util.inspect(response, false, null))
  dbConnectionsPool.end() // koniec tego dobrego
})
