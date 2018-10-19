const assert = require('assert')
const User  = require('../users/src/user')
describe('Creating records', () => {
    it('saves a user', (done) => {
        // Create Instance
        const joe = new User({ name: 'Joe'})
        
        //Insert Record
        joe.save()
           .then(() => {
                assert(!joe.isNew)
                done()
            })
    })
})