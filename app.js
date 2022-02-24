const express = require("express");
const path = require('path');
const mysql = require("mysql");
const dotenv = require('dotenv');

dotenv.config({ path: './.env'});

const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    passwordconfirm: process.env.DATABASE_PASSWORDCONFIRM,
    database: 'nodejs-login',
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

//parse URL-encoded bodies(as send by HTML forms)
app.use(express.urlencoded({ extended: false}));
//parse JSON bodies(as sent by API clients)
app.use(express.json());

app.set('view engine', 'hbs');

db.connect( (error) => {
    if(error) {
        console.log(error)
    }else{
        console.log("MYSQL connected...")
    }
})

//define routes
app.get("/", (req, res) =>{
    //res.send("<h1>Home Page</h1>")
   res.render("index")
});

app.get("/Register", (req, res) =>{
   // res.send("<h1>Home Page</h1>")
    res.render("register")
});

app.use('/', require('./routes/pages'));

app.use('/auth', require('./routes/auth'));


//app.use('/api', require('./controllers/auth.controller'));

app.listen(4009, () => {
    console.log("Server started on port 4009");
}) 