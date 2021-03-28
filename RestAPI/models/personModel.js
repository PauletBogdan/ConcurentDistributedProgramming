let requestData = require('../data/persons')
const { v4: uuidv4 } = require('uuid')

function findPersons() {

    return new Promise((resolve, reject) => {
        resolve(requestData)
    })

}

function findByID(id) {

    return new Promise((resolve, reject) => {
        const requestDataSinglePerson = requestData.find((person) => person.id === id)
        resolve(requestDataSinglePerson)
    })

}

function createNewPerson(person) {

    return new Promise((resolve, reject) => {

        const newPerson = { id: uuidv4(), ...person }
        requestData.push(newPerson)
        resolve(newPerson)

    })
}

function updatePerson(id, person) {

    return new Promise((resolve, reject) => {

        const index = requestData.findIndex((person) => person.id === id)
        requestData[index] = { id, ...person }
        resolve(requestData[index])

    })
}

function removePerson(id) {

    return new Promise((resolve, reject) => {

        requestData = requestData.filter((person) => person.id !== id)
        resolve()
    })
}

module.exports = {
    findPersons, findByID, createNewPerson, updatePerson, removePerson
}