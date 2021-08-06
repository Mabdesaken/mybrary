const express = require('express')
const router = express.Router()
const Book = require('../models/book')
const Author = require('../models/author')

//All Books route
router.get('/', async (req, res) => {
    res.send('All Books')
})

//New Book route
router.get('/new', async (req, res) => {
    try {
        let authors = await Author.find({})
        let book = new Book()
        res.render('books/new', {
            authors: authors,
            book: book
        })
    } catch {
        res.redirect('/books')
    }
})

//Create Book route
router.post('/', async (req, res) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishDate: new Date(req.body.publishDate),
        description: req.body.description,
        pageCount: req.body.pageCount
    })

    try {

    } catch {

    }
})

module.exports = router
