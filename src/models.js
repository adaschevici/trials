const schema = {
  type: 'object',
  properties: {
    name: { type: 'string', required: true },
    dob: {
      type: 'string',
      format: 'date',
      required: true,
    },
    phone: { type: 'string', required: true },
    address: { type: 'string', required: true },
  },
}

const updateSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    dob: {
      type: 'string',
      format: 'date',
    },
    phone: { type: 'string' },
    address: { type: 'string' },
  },
}

const getPatients = (db) => {
  let patientList = []
  for (let [key, val] of db.entries()) {
    patientList.push({ [key]: val })
  }
  return patientList
}

const addPatient = (db, data) => {
  const { uuid, name, dob, phone, address } = data
  db.set(uuid, { name, dob, phone, address, deleted: false })
  return db
}

const updatePatient = (db, data) => {
  const { uuid, ...rest } = data
  const existing = db.get(uuid)
  if (!existing) {
    throw 404
  }
  db.set(uuid, { ...existing, ...rest })
  return db
}

const deletePatient = (db, uuid, kind) => {
  const existing = db.get(uuid)
  if (!existing) {
    throw 404
  }
  if (kind === 'soft') {
    db.set(uuid, { ...existing, deleted: true })
  } else {
    db.delete(uuid)
  }
  return db
}

module.exports = {
  schema,
  updateSchema,
  getPatients,
  addPatient,
  updatePatient,
  deletePatient,
}
