const pool = require('./pool')
const fetchEvents = require('./fetchEvents')
const fetchTalksWithSpeakers = require('./fetchTalksWithSpeakers')

const DataLoader = require('dataloader')
const _ = require('lodash')

module.exports = (pool) => {
  const resolveTalks = (eventId) => talksLoader.load(eventId)

  // to robi śmieszny trick
  // za kazdym wywołaniem #load nie odpala zapytania do bazy tylko ustawie sie na koniec
  // event loopa aby wtedy sie odpalic gdy juz wiecej #load'ów poszło
  // TO JEST OSZUSTWO
  // https://medium.com/@gajus/using-dataloader-to-batch-requests-c345f4b23433
  const talksLoader = new DataLoader(async eventIds => {
    const talks = await fetchTalksWithSpeakers(pool, eventIds)
    const groupedTalks = _.groupBy(talks, (talk) => talk.eventId)
    return eventIds.map(id => groupedTalks[id] || [])
  })

  return {
    events({ limit=0 }) {
      return fetchEvents(pool, limit, resolveTalks)
    }
  }
}
