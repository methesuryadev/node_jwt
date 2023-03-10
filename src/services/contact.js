const jwt = require('jsonwebtoken');
const constants = require('../helpers/constents.js');
const knex = require('../database/dbConnection.js').knex_connection
const tbl = "contacts"


// TODO:: create hash Password 
async function hashIt(password) {
    const salt = await bcrypt.genSalt(6);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
}
//   TODO:: compare hase password
async function compareIt(password, hashedPassword) {
    const validPassword = await bcrypt.compare(password, hashedPassword);
    return validPassword;
}


// TODO:: User Register API
async function create(req, res, next) {
    try {
        let input = {};
        let respdata = {};
        // console.log('req.body', req.token);
        if (req.body.name && req.body.mobile && req.token) {
            input['name'] = req.body.name
            input['mno'] = req.body.mobile
            let tokenValidate = jwt.verify(req.token, constants.JWT_TOKEN, (error, authData) => {
                if (error) {
                    return false;
                }
                return true;
            })
            if (tokenValidate) {
                let status = await knex(tbl).insert(input)
                if (status) {
                    respdata = {
                        status: 200,
                        message: 'Contact created sucessfully'
                    }
                } else {
                    respdata = {
                        status: 401,
                        message: 'Contact creation failed'
                    }
                }
            } else {
                respdata = {
                    status: 401,
                    message: 'Token Invalid'
                }
            }
        } else {
            respdata = {
                status: 402,
                message: 'Invalid input'
            }
        }
        res.status(200).json(respdata);
    } catch (error) {
        res.send(error)
    }
}



module.exports = {
    create
}