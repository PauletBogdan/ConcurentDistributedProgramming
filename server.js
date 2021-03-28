const http = require('http')
const requestData = require('./data/persons')
const { getPersons, getPerson, createPerson, updatePerson, deletePerson } = require('./controllers/personController')

const myserver = http.createServer((req, res) => {

    if (req.url === '/api/persons' && req.method === 'GET') {
        return getPersons(req, res)

    } else if (req.url.match(/\/api\/persons\/\w+/) && req.method === 'GET') {

        const id = req.url.split('/')[3]
        return getPerson(req, res, id)

    } else if (req.url === '/api/persons' && req.method === 'POST') {

        return createPerson(req, res)

    } else if (req.url.match(/\/api\/persons\/\w+/) && req.method === 'PUT') {

        const id = req.url.split('/')[3]
        return updatePerson(req, res, id)

    }
    else if(req.url.match(/\/api\/persons\/\w+/) && req.method === 'DELETE') {

        const id = req.url.split('/')[3]
        return deletePerson(req, res, id)
    }
    else {

        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify({ message: 'Route Not Found' }))
        res.end()

    }
})

const portForServer = process.env.portForServer || 5000

myserver.listen(portForServer, () => console.log('My Server is running on port 5000'))