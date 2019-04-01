const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
