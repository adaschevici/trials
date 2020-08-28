const express = require('express')
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid')
const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send({ uuid: uuidv4() })
})

const server = app.listen(4200)
