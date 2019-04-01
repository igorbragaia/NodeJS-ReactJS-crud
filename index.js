const express = require('express')
const db = require('./queries')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })
  .use(express.static(path.join(__dirname, 'client/build')))
  // Put all API endpoints under '/api'
  .get('/api/passwords', (req, res) => {
    const count = 5;

    // Generate some passwords
    const passwords = Array.from(Array(count).keys()).map(i =>
      generatePassword(12, false)
    )

    // Return them as json
    res.json(passwords);

    console.log(`Sent ${count} passwords`);
  })
  .get('/users', db.getUsers)
  .get('/users/:id', db.getUserById)
  .post('/users', db.createUser)
  .put('/users/:id', db.updateUser)
  .delete('/users/:id', db.deleteUser)
  .get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
