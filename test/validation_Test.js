const assert = require('assert')
const User = require('../users/src/user')

describe('Validating records', () => {
    it('requires a user name', () => {
        const user = new User({ name: undefined })
        const validationResult = user.validateSync()
        const { message } = validationResult.errors.name
        assert(message === 'Name is required.')
    })

    it('User name to be longer than two characters', () => {
        const user = new User({name: 'Al'})
        const validationResult = user.validateSync()
        const { message } = validationResult.errors.name
        assert(message === 'Name must be longer than 2 characters')
    })
    it('disallows invalid record from being saved', (done) => {
        const user = new User({ name: 'AL'}) 
        user.save()
            .catch((validationResult)=>{
                const { message } = validationResult.errors.name
                assert(message === 'Name must be longer than 2 characters')
                done()
            })

    })
})