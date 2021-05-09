const Person = require('../models/personModel')
const { getPostData } = require('../utils')

// api/persons
async function getPersons(req, res) {

    try {
        const requestData = await Person.findPersons()
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify(requestData))
        res.end()

    } catch (error) {
        console.log(error)
    }
}

// api/person/:id

async function getPerson(req, res, id) {

    try {
        const person = await Person.findByID(id)

        if (!person) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.write(JSON.stringify({ message: 'Person not found!' }))
            res.end()

        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.write(JSON.stringify(person))
            res.end()

        }

    } catch (error) {
        console.log(error)
    }
}

async function createPerson(req, res) {

    try {

        const body = await getPostData(req)

        const { firstName, lastName, phoneNumber, emailAddress } = JSON.parse(body)

        const person = {
            firstName,
            lastName,
            phoneNumber,
            emailAddress
        }

        const newPerson = await Person.createNewPerson(person)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newPerson))

    } catch (error) {
        console.log(error)
    }
}

async function updatePerson(req, res, id) {

    try {
        console.log(id)
        const person = await Person.findByID(id)
        console.log(person)

        if (!person) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.write(JSON.stringify({ message: 'Person not found!' }))
            res.end()

        } else {
            const body = await getPostData(req)
            console.log({body})

            const { firstName, lastName, phoneNumber, emailAddress } = JSON.parse(body)

            const personData = {
                firstName: firstName || person.firstName,
                lastName: lastName || person.lastName,
                phoneNumber: phoneNumber || person.phoneNumber,
                emailAddress: emailAddress || person.emailAddress
            }

            const updatedPerson = await Person.updatePerson(id, personData)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(updatedPerson))
        }

    } catch (error) {
        console.log(error)
    }
}

async function deletePerson(req, res, id) {

    try {
        const person = await Person.findByID(id)

        if (!person) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.write(JSON.stringify({ message: 'Person not found!' }))
            res.end()

        } else {
            await Person.removePerson(id)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.write(JSON.stringify({message: `Person ${id} removed`}))
            res.end()
        }

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getPersons, getPerson, createPerson, updatePerson, deletePerson
}