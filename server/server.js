const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
const http = require('http');

const app = express();

mongoose.Promise = global.Promise; //Set promises for mongoose.
mongoose.connect(config.DATABASE);

const { User } = require('./models/user');
const { Book } = require('./models/book');
const { auth } = require('./middleware/auth');

app.use(bodyParser.json());
app.use(cookieParser());

//===================================//
//=============== GET ===============//
//===================================//

//check user routes authentication
app.get('/api/auth', auth, (req,res) => {
    res.json({
        isAuth: true,
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname
    });
});

//logout a user
app.get('/api/logout', auth, (req,res) => {
    req.user.deleteToken(req.token, (err,user) => { // delete the user token to log him out
        if(err) return res.status(400).send(err);
        res.sendStatus(200);
    });
});

//get one book
app.get('/api/getBook', (req,res) => {
    let id = req.query.id; //request the id of the book

    //find the book by id
    Book.findById(id, (err,doc) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(doc);
    });
});

//get many books
app.get('/api/books', (req,res) => {
    let skip = parseInt(req.query.skip); //if we want to skip some books
    let limit = parseInt(req.query.limit); //if we want to limit the amount of the books
    let order = req.query.order; //order of the books (asc/desc)

    Book.find().skip(skip).sort({_id:order}).limit(limit).exec((err,doc) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(doc);
    });
});

// get the reviewer name and lastname
app.get('/api/getReviewer', (req,res) => {
    let id = req.query.id;

    User.findById(id, (err,doc) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({
            name: doc.name,
            lastname: doc.lastname
        });
    });
});

// get all the users
app.get('/api/users', (req,res) => {
    User.find({}, (err,users) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(users)
    });
});

// get all posts
app.get('/api/user_posts', (req,res) => {
    Book.find({ownerId:req.query.user}).exec((err,docs) => { // find a post by ownerId
        if(err) return res.status(400).send(err);
        res.status(200).send(docs)
    });
});

//===================================//
//============== POST ===============//
//===================================//

app.post('/api/book', (req,res) => {
    const book = new Book(req.body); //req.body require the book info

    //save the book to db
    book.save((err,doc) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({
            post: true,
            bookId: doc._id
        });
    });
});

//register a new user
app.post('/api/register', (req,res) => {
    const user = new User(req.body);

    user.save((err,doc) => {
        if(err) return res.json({success: false});
        res.status(200).json({
            success: true,
            user: doc
        });
    });
});

//login a user
app.post('/api/login', (req,res) => {
    User.findOne({'email': req.body.email}, (err,user) => { //find user by email
        if(!user) return res.json({isAuth: false, message: 'Authetication failed, email not found!'});

        user.comparePassword(req.body.password, (err,isMatch) => {
            if(!isMatch) return res.json({
                isAuth: false,
                message: 'Wrong password'
            });

            // generate token
            user.generateToken((err,user) => {
                if(err) return res.status(400).send(err);

                res.cookie('auth',user.token).json({
                    isAuth: true,
                    id: user._id,
                    email: user.email
                });
            });
        });
    });
});

//===================================//
//============= UPDATE ==============//
//===================================//

//update a book info
app.post('/api/book_update', (req,res) => {
    Book.findByIdAndUpdate(req.body._id, req.body, {new:true}, (err,doc) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({
            success: true,
            doc
        });
    });
});

//===================================//
//============= DELETE ==============//
//===================================//

//delete book
app.delete('/api/delete_book', (req,res) => {
    let id = req.query.id; //request the id of the book we want to delete
    
    Book.findByIdAndRemove(id, (err,doc) => {
        if(err) return res.status(400).send(err);
        res.json(true);
    })
})

const port = process.env.PORT || 8090; //Enviroment port for Heroku/Server.
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});