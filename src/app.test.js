const request = require('supertest')
const axios = require('axios')
const { app } = require('./app')

jest.mock('axios')

describe('App list', () => {
  it('responds to GET on "/" with a list of participants', async (done) => {
    const res = await request(app).get('/')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual([])
    done()
  })
})

describe('App items create', () => {
  it('responds to POST on "/" with the id of the created object', async (done) => {
    const resp = { data: { uuid: '1234-567' } }
    axios.get.mockResolvedValue(resp)
    const res = await request(app).post('/').send({
      phone: '123-456-789',
      name: 'Ally',
      dob: '2020-02-12',
      address: 'Any Street',
    })
    expect(res.body).toEqual({ id: '1234-567' })
    done()
  })
  it('responds to POST on "/" with 400 if parts of the payload are missing', async (done) => {
    const res = await request(app).post('/').send({})
    expect(res.statusCode).toEqual(400)
    done()
  })
  it('responds to POST on "/" with 400 if the date is not valid', async (done) => {
    const res = await request(app).post('/').send({
      phone: '123-456-789',
      name: 'Ally',
      dob: '2020-22-12',
      address: 'Any Street',
    })
    expect(res.statusCode).toEqual(400)
    done()
  })
})

describe('App items update', () => {
  afterEach(() => {
    app.db.clear()
  })
  it('responds to PUT on "/:id" with the id of the updated object', async (done) => {
    const resp = { data: { uuid: '1234-567' } }
    axios.get.mockResolvedValue(resp)
    const res = await request(app).post('/').send({
      phone: '123-456-789',
      name: 'Ally',
      dob: '2020-02-12',
      address: 'Any Street',
    })
    expect(res.statusCode).toEqual(201)
    const updated = await request(app).put('/1234-567').send({
      name: 'Allison',
    })
    expect(updated.statusCode).toEqual(200)
    expect(updated.body).toEqual({ id: '1234-567' })
    done()
  })
  it('responds to PUT on "/:id" with 400 if the payload is not valid', async (done) => {
    const resp = { data: { uuid: '1234-567' } }
    axios.get.mockResolvedValue(resp)
    const res = await request(app).post('/').send({
      phone: '123-456-789',
      name: 'Ally',
      dob: '2020-02-12',
      address: 'Any Street',
    })
    expect(res.statusCode).toEqual(201)
    const updated = await request(app).put('/1234-567').send({
      dob: '2020-20-20',
    })
    expect(updated.statusCode).toEqual(400)
    done()
  })
  it('responds to PUT on "/:id" with 404 if the id does not exist', async (done) => {
    const res = await request(app).put('/1234-567').send({
      name: 'Allison',
    })
    expect(res.statusCode).toEqual(404)
    done()
  })
})

describe('App items delete', () => {
  beforeEach(async () => {
    const resp = { data: { uuid: '1234-567' } }
    axios.get.mockResolvedValue(resp)
    await request(app).post('/').send({
      phone: '123-456-789',
      name: 'Ally',
      dob: '2020-02-12',
      address: 'Any Street',
    })
  })
  it('responds to DELETE on "/:id/:kind" with the id of the deleted object', async (done) => {
    const res = await request(app).delete('/1234-567/soft')
    expect(res.statusCode).toEqual(200)
    done()
  })
  it('responds to DELETE on "/:id/:kind" with 400 if kind is not one of "soft" or "hard"', async (done) => {
    const res = await request(app).delete('/1234-567/unknown')
    expect(res.statusCode).toEqual(400)
    done()
  })
  it('responds to DELETE on "/:id/:kind" with 404 if the id is not found', async (done) => {
    const res = await request(app).delete('/1233-567/soft')
    expect(res.statusCode).toEqual(404)
    done()
  })
})
