const mongoose = require('mongoose')
const User = require('../users/src/user')
const Comment = require('../users/src/comment')
const BlogPost = require('../users/src/blogPost')
const assert = require('assert')
describe('Associations', (done) => {
    let joe, blogPost, comment
    beforeEach((done) => {
        joe = new User({ name: 'Joe'})
        comment = new Comment({content: 'Dude thats great'})
        blogPost = new BlogPost({ title: 'Learning Mongo for Dummies'})    

        joe.blogPosts.push(blogPost)
        blogPost.comments.push(comment)
        comment.user = joe
        
        Promise.all([ joe.save(), blogPost.save(), comment.save()]).then(() => done())
    });

    it('Saves a relationship between user and blogpost', (done) => {
        User.findOne({ name:'Joe' })
            .populate({ 
                path: 'blogPosts',
                populate: {
                    path:'comments',
                    model:'comment'
                }
            })
            .then((user) => {
                assert(user.name === 'Joe')
                assert(user.blogPosts[0].title = 'Learning Mongo for Dummies')
                assert(user.blogPosts[0].comment = 'Dude thats great')
                done()
            })
    });
});