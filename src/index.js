require('dotenv').config()
const express = require('express')
const app = express()
const constent = require('./helpers/constents.js')
const cors = require('cors')
const port = constent.port
const base = constent.BASE_URL

// middlewares 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(function (req, res, next) {
    //set headers to allow corss origin request.
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token,Authorization");

    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.listen(port, () => {
    console.log(`App Listening at http://localhost:${port || 8088}`)
})


// API service fiels include
const testapi = require('./services/testapi.js')
const user = require('./services/user.js')
const contact = require('./services/contact.js')

function verifyToken(req, res, next) {
    try {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            const bearerToken = bearerHeader.split(' ')[1];          
            req.token = bearerToken;
            // console.log('bearerHeader',req.token)
            next();
        }
        else {
            res.send("Not logged-in")
        }
    }
    catch {
        res.send("something went wrong")
    }
}


//Routes
app.get(base + '/demoapi', testapi.demoApi)
app.post(base + '/user/create', user.register)
app.post(base + '/user/login', user.login)
app.post(base + '/contact/create',verifyToken, contact.create)