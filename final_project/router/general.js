const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
  const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        if (!isValid(username)) {
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(400).json({message: "User already exists!"});
        }
    } 
    return res.status(400).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',
    async function (req, res) {
    await res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',
    async function (req, res) {
        if (req.params.isbn) {    
            let isbnBook = "";
            for (var id in books) {
                let book = books[id];
                if (book.isbn === req.params.isbn) {
                    isbnBook = {
                        "isbn": book.isbn,
                        "author": book.author,
                        "title": book.title,
                        "reviews": book.reviews
                    }
                }
            }
            await res.send(JSON.stringify(isbnBook,null,4));
        } else {
            return res.status(400).json({message: "Please enter an ISBN"});
        }
 });
  
// Get book details based on author
public_users.get('/author/:author',
    async function (req, res) {
    if (req.params.author)
    {    
        let authorBooks = [];
        for (var id in books) {
            let book = books[id];
            if (book.author === req.params.author) {
                let authorBook = {
                    "isbn": book.isbn,
                    "author": book.author,
                    "title": book.title,
                    "reviews": book.reviews
                }
                authorBooks.push(authorBook);
            }
        }
        await res.send(JSON.stringify(authorBooks,null,4));
    } else {
        return res.status(400).json({message: "Please enter an author"});
    }
});

// Get all books based on title
public_users.get('/title/:title',
    async function (req, res) {
    if (req.params.title)
    {    
        let titleBook = "";
        for (var id in books) {
            let book = books[id];
            if (book.title === req.params.title) {
                titleBook = {
                    "isbn": book.isbn,
                    "author": book.author,
                    "title": book.title,
                    "reviews": book.reviews
                }
            }
        }
        await res.send(JSON.stringify(titleBook,null,4));
    } else {
        return res.status(400).json({message: "Please enter a title"});
    }
});

//  Get book review
public_users.get('/review/:isbn',
    async function (req, res) {
    if (req.params.isbn)
    {    
        let reviews;
        for (var id in books) {
            let book = books[id];
            if (book.isbn === req.params.isbn) {
                reviews = {                    
                    "reviews": book.reviews
                }
            }
        }
        await res.send(JSON.stringify(reviews,null,4));
    } else {
        return res.status(400).json({message: "Please enter an ISBN"});
    }
});

module.exports.general = public_users;

