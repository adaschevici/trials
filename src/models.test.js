const {
  getPatients,
  addPatient,
  updatePatient,
  deletePatient,
} = require('./models')
const {
  allPatientsTupleArray,
  expected,
  addedItemTuple,
  addedItemObject,
  updatedPatientsTupleArray,
} = require('./fixtures')

const db = new Map()
describe('Models', () => {
  beforeEach(() => {
    db.clear()
    allPatientsTupleArray.map(([key, value]) => db.set(key, value))
  })
  it('gets all items', () => {
    const patients = getPatients(db)
    expect(patients).toEqual(expected)
  })
  it('creates item', () => {
    const itemToCreate = {
      uuid: '234-653',
      phone: '123-456-789',
      name: 'jason',
      dob: '1987-06-12',
      address: 'crystal lake',
    }
    const extended = addPatient(db, itemToCreate)
    let expectedDb = new Map()
    const extendedExpectedArray = [...allPatientsTupleArray, addedItemTuple]
    extendedExpectedArray.map(([key, value]) => expectedDb.set(key, value))
    expect(extended).toEqual(expectedDb)
  })
  it('updates item', () => {
    const itemToUpdate = {
      uuid: '143-456',
      name: 'Jason Smith',
      address: 'This is Kansas',
    }
    const updated = updatePatient(db, itemToUpdate)
    let expectedDb = new Map()
    updatedPatientsTupleArray.map(([key, value]) => expectedDb.set(key, value))
    expect(updated).toEqual(expectedDb)
  })
  it('throws exception if update item does not exist', () => {
    const itemToUpdate = {
      uuid: 'non-existent',
      name: 'Jason Smith',
      address: 'This is Kansas',
    }
    expect(() => {
      updatePatient(db, itemToUpdate)
    }).toThrowError(/404/)
  })
  it('deletes item', () => {
    const updated = deletePatient(db, '143-456', 'hard')
    let expectedDb = new Map()
    allPatientsTupleArray
      .slice(0, 2)
      .map(([key, value]) => expectedDb.set(key, value))
    expect(updated).toEqual(expectedDb)
  })
  it('soft deletes item', () => {
    const updated = deletePatient(db, '143-456', 'soft')
    let expectedDb = new Map()
    allPatientsTupleArray.map(([key, value]) => {
      if (key === '143-456') {
        expectedDb.set(key, { ...value, deleted: true })
      } else {
        expectedDb.set(key, value)
      }
    })
    expect(updated).toEqual(expectedDb)
  })
  it('throws exception if delete item does not exist', () => {
    expect(() => {
      deletePatient(db, 'non-existent', 'soft')
    }).toThrowError(/404/)
  })
})
