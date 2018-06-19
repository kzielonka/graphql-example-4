const fetchEvents = (pool, limit, resolveTalks) => {
  return new Promise((resolve, reject) => {
    pool.connect((err, client, release) => {
      if (err) {
        reject('Error acquiring client', err.stack)
      }

      const sql = `SELECT id, title FROM events LIMIT ${limit}`

      client.query(sql, (err, result) => {
        release() // zwraca połącznie do basenu

        if (err) {
          reject('Error executing query', err.stack)
        }

        resolve(result.rows.map(result => ({
          id: result.id,
          name: result.title,
          talks: () => resolveTalks(result.id),
        })))
      })
    })
  })
}

module.exports = fetchEvents
