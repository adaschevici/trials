const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const app = express()
const validate = require('express-jsonschema').validate
const {
  schema,
  updateSchema,
  getPatients,
  addPatient,
  updatePatient,
  deletePatient,
} = require('./models')

const UUID_URL = process.env.UUID_URL || 'http://localhost:4200/'

let db = new Map()

const errorMiddleware = (err, req, res, next) => {
  let responseData

  if (err.name === 'JsonSchemaValidation') {
    // Log the error however you please
    console.log(err.message)
    // logs "express-jsonschema: Invalid data found"

    // Set a bad request http response status or whatever you want
    res.status(400)

    // Format the response body however you want
    responseData = {
      statusText: 'Bad Request',
      jsonSchemaValidation: true,
      validations: err.validations, // All of your validation information
    }

    // Take into account the content type if your app serves various content types
    if (req.xhr || req.get('Content-Type') === 'application/json') {
      res.json(responseData)
    } else {
      // If this is an html request then you should probably have
      // some type of Bad Request html template to respond with
      res.send({ msg: 'Bad Request' })
    }
  } else {
    // pass error to next error middleware handler
    next(err)
  }
}

const uniqueIdMiddleware = async (req, res, next) => {
  const { data } = await axios.get(UUID_URL)
  req.data = data
  return next()
}

app.use(bodyParser.json())

app.get('/', (req, res) => {
  const patientList = getPatients(db)
  return res.status(200).send(patientList)
})

app.post('/', validate({ body: schema }), uniqueIdMiddleware, (req, res) => {
  const { name, dob, phone, address } = req.body
  const { uuid } = req.data
  db = addPatient(db, { uuid, name, dob, phone, address })
  res.status(201).send({ id: uuid })
})

app.put('/:id', validate({ body: updateSchema }), (req, res) => {
  const { name, dob, phone, address } = req.body
  const { id } = req.params
  let data = { name, dob, phone, address }
  Object.keys(data).forEach((key) => {
    if (data[key] === undefined) delete data[key]
  })
  try {
    db = updatePatient(db, { ...data, uuid: id })
    res.status(200).send({ id: id })
  } catch (err) {
    res.status(404).send({ msg: 'Patient does not exist' })
  }
})

app.delete('/:id/:kind', (req, res) => {
  const { id, kind } = req.params
  if (!['soft', 'hard'].includes(kind))
    res.status(400).send({
      err: 'Send "soft" or "hard" as the parameter for the delete operation',
    })
  try {
    db = deletePatient(db, id, kind)
    res.status(200).send({ id: id })
  } catch (err) {
    res.status(404).send({ msg: 'Patient does not exist' })
  }
})

app.use(errorMiddleware)
app.db = db
module.exports = { app }
