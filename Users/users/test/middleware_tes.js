const mongoose = require('mongoose')
const User = require('../users/src/user')
const Comment = require('../users/src/comment')
const BlogPost = require('../users/src/blogPost')
const assert = require('assert')
describe('Middleware', (done) => {
    let joe, blogPost, comment
    beforeEach((done) => {
        joe = new User({ name: 'Joe'})
        blogPost = new BlogPost({ title: 'Learning Mongo for Dummies'})    

        joe.blogPosts.push(blogPost)

        Promise.all([ joe.save(), blogPost.save()]).then(() => done())
    });

    it('clean up comments after remove', (done) => {
        joe.remove()
            .then( () => BlogPost.count())
            .then((count) => {
                assert(count === 0)
                done()
            })
        
    });
})