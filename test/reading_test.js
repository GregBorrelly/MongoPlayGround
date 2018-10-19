const assert = require('assert')
const User  = require('../users/src/user')

describe('Reading users out of the database', () => {
    let joe
    beforeEach((done) => {
        joe = new User({name: 'Joe'})
        joe.save()
            .then( () => done() )
    })
    it('finds all users with  a name of joe', (done) => {
        User.find({ name: 'Joe'})
            .then((users) => {
                assert(users[0].__id === joe.__id)
                done()
            })
    })
    it('finds a user with a particular id', (done) => {
        User.findOne({ __id: joe.__id})
            .then((users) => {
                assert(users.name === 'Joe')
                done()
            })
    })
})