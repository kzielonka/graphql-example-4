const fetchTalksWithSpeakers = (pool, eventIds) => new Promise((resolve, reject) => {
  console.log(`FETCH TALKS WITH SPEAKERS INVOKED ${eventIds}`)

  pool.connect((err, client, release) => {
    if (err) {
      reject('Error acquiring client', err.stack)
    }

    const sql = `
      SELECT talks.id, talks.event_id AS event_id, talks.title, speakers.id AS speaker_id,
             speakers.name AS speaker_name, speakers.bio AS speaker_bio
        FROM talks
        JOIN speakers ON speakers.id=talks.speaker_id
        WHERE event_id IN (${eventIds.join(', ')})
    `

    client.query(sql, (err, result) => {
      release() // zwraca połącznie do basenu
      console.log(`TALKS FOR ${eventIds} FETCHED (ASYNC & DATA LOADER - Rubiowcy do domu)`)

      if (err) {
        reject('Error executing query', err.stack)
      }

      resolve(result.rows.map(row => ({
        id: row.id,
        title: row.title,
        eventId: row.event_id,
        speaker: {
          id: row.speaker_id,
          name: row.speaker_name,
          bio: row.speaker_bio,
        },
      })))
    })
  })
})

module.exports = fetchTalksWithSpeakers
