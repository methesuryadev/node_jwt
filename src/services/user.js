const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const constants = require('../helpers/constents.js');
const knex = require('../database/dbConnection.js').knex_connection
const tbl = "users"


// TODO:: create hash Password 
async function hashIt(password) {
    const salt = await bcrypt.genSalt(6);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
}
//   TODO:: compare hase password
async function compareIt(password,hashedPassword) {
    const validPassword = await bcrypt.compare(password, hashedPassword);
    return validPassword;
}


// TODO:: User Register API
async function register(req, res, next) {
    let input = {};
    let respdata = {};
    console.log('req.body', req.body);
    if (req.body.name && req.body.email &&req.body.pass ) {
        input['name'] = req.body.name
        input['email'] = req.body.email
        input['pass'] = await hashIt(req.body.pass)
        let status = await knex(tbl).insert(input)
        if (status) {
            respdata = {
                status: 200,
                message: 'User created sucessfully'
            }
        } else {
            respdata = {
                status: 401,
                message: 'User creation failed'
            }
        }
    } else {
        respdata = {
            status: 402,
            message: 'Invalid input'
        }
    }
    res.status(200).json(respdata);
}


// TODO:: User Login API
async function login(req, res, next) {
    let input = {};
    let respdata = {};
    console.log('req.body', req.body);
    if (req.body.email &&req.body.pass ) {
        let userdata=await knex(tbl).select('*').where('email',req.body.email).first();
        console.log('userdata',userdata)
        let passwordTest=await compareIt(req.body.pass,userdata.pass)
        console.log('passwordTest',passwordTest)
        if (passwordTest) {

            let token=jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                userdata
              }, constants.JWT_TOKEN);

            respdata = {
                "status": 200,
                "message": 'User login sucessfully',
                "token": token
            }
        } else {
            respdata = {
                status: 401,
                message: 'User login failed'
            }
        }
    } else {
        respdata = {
            status: 402,
            message: 'Invalid input'
        }
    }
    res.status(200).json(respdata);
}


module.exports = {
    register,
    login
}