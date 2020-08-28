## Trial participant registration service

## Prerequisites

1. docker - for setting up with Docker
2. NodeJS - for setting up locally
3. curl - used for working with the service

## Getting up and running (with Docker)

#### This assumes that you already have a service for getting unique ids running
1. `git clone git@github.com:adaschevici/patient-trials.git`
2. `cd patient-trials`
3. build docker image `docker build -t trial .`
4. `docker run -it -p 5000:5000 -v $(pwd)/src:/app -e UUID_URL=<url for uuid service> trial`

## Getting up and running (with NodeJS)
1. `git clone git@github.com:adaschevici/patient-trials.git`
2. `cd patient-trials`
3. `npm i`
4. start CRUD service `npx nodemon src/app.js`
5. start UUID service `npx nodemon src/unique-id.js`

## Running the tests
```bash
npm test
```

## Working with the API (works with `curl`) but easily adapted to Postman or any other http client

#### Performing a listing
```bash
curl -X GET http://localhost:5000/
```

#### Creating a trial participant
```bash
curl -X POST -H "Content-Type: application/json" -d '{ "phone": "123-456-789", "name": "Ally", "dob": "2020-02-12", "address": "Provost St" }' http://localhost:5000/
```

#### Updating a trial participant
```bash
curl -X PUT -H "Content-Type: application/json" -d '{ "dob": "2020-12-02" }' http://localhost:5000/<some id that exists>
```

#### Deleting a trial participant
```bash
curl -X DELETE -H "Content-Type: application/json" http://localhost:5000/<some id that exists>/soft
# OR if you want to delete the entry forever
curl -X DELETE -H "Content-Type: application/json" http://localhost:5000/<some id that exists>/hard
```

## TODO:

1. Add living swagger documentation for service
2. Add `docker-compose.yml` for standing up the services cluster
