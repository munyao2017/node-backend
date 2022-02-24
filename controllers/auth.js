const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    passwordconfirm: process.env.DATABASE_PASSWORDCONFIRM,
    database: 'nodejs-login',
});

exports.register = (req, res) =>{
    console.log(req.body);

    //const name = req.body.name;
    //const email = req.body.email;
    //const password= req.body.password;
    //const passwordconfirm = req.bodyy.passwordconfirm;
    const {name, email, password, passwordconfirm} = req.body;

    db.query('SELECT email FROM users WHERE email = ?', [email],async (error, results) => {
        if(error) {
            console.log(error);
        }
        if(results.length > 0 ){
            return res.render('register',{
                message:'That email is already in use'
            })
        }else if(password !== passwordconfirm){
            return res.render('register',{
                message:'The password donot match'
            });
        }

        // user.passwordconfirm = await bcrypt.hash(user.password, 8 );
        // console.log(hashedpassword);

       //user.password = await bcrypt.hash(user.password, salt);
        //user.save().then((doc) => res.status(201).send(doc));
    
        //res.send("testing");

       
    });
    db.query('INSERT INTO users SET ?', {name: name, email: email, password: password },(error, result) => {
        if(error) {
            console.log(error);
        }else{
            console.log(results);
            return res.render('register', {
                message: 'user registered'
            });
        }
    })

    }