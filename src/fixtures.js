const allPatientsTupleArray = [
  [
    '123-456',
    {
      phone: '123-456-789',
      name: 'Jane Doe',
      dob: '1992-04-12',
      address: 'Anywhere St',
      deleted: false,
    },
  ],
  [
    '133-456',
    {
      phone: '123-456-789',
      name: 'David Cohen',
      dob: '1999-02-12',
      address: 'Elm St',
      deleted: false,
    },
  ],
  [
    '143-456',
    {
      phone: '123-456-789',
      name: 'John Smith',
      dob: '1984-05-12',
      address: 'Crystal Lake',
      deleted: false,
    },
  ],
]

const updatedPatientsTupleArray = [
  [
    '123-456',
    {
      phone: '123-456-789',
      name: 'Jane Doe',
      dob: '1992-04-12',
      address: 'Anywhere St',
      deleted: false,
    },
  ],
  [
    '133-456',
    {
      phone: '123-456-789',
      name: 'David Cohen',
      dob: '1999-02-12',
      address: 'Elm St',
      deleted: false,
    },
  ],
  [
    '143-456',
    {
      phone: '123-456-789',
      name: 'Jason Smith',
      dob: '1984-05-12',
      address: 'This is Kansas',
      deleted: false,
    },
  ],
]

const addedItemTuple = [
  '234-653',
  {
    phone: '123-456-789',
    name: 'jason',
    dob: '1987-06-12',
    address: 'crystal lake',
    deleted: false,
  },
]

const expected = [
  {
    '123-456': {
      phone: '123-456-789',
      name: 'Jane Doe',
      dob: '1992-04-12',
      address: 'Anywhere St',
      deleted: false,
    },
  },
  {
    '133-456': {
      phone: '123-456-789',
      name: 'David Cohen',
      dob: '1999-02-12',
      address: 'Elm St',
      deleted: false,
    },
  },
  {
    '143-456': {
      phone: '123-456-789',
      name: 'John Smith',
      dob: '1984-05-12',
      address: 'Crystal Lake',
      deleted: false,
    },
  },
]

const addedItemObject = {
  '234-653': {
    phone: '123-456-789',
    name: 'jason',
    dob: '1987-06-12',
    address: 'crystal lake',
    deleted: false,
  },
}

module.exports = {
  addedItemObject,
  addedItemTuple,
  allPatientsTupleArray,
  updatedPatientsTupleArray,
  expected,
}
