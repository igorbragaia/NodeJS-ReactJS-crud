const express = require('express')
const db = require('./queries')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })
  .get('/users', db.getUsers)
  .get('/users/:id', db.getUserById)
  .post('/users', db.createUser)
  .put('/users/:id', db.updateUser)
  .delete('/users/:id', db.deleteUser)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
