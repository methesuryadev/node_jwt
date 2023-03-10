const mysql = require('mysql')
const constents = require('../helpers/constents.js')
const dbconfig = constents.dbconfig
const knex_connection = require('knex')({
    client: 'mysql',
    connection: {
        host: dbconfig.host,
        port: 3306,
        user: dbconfig.user,
        password: dbconfig.password,
        database: dbconfig.database
    },
    postProcessResponse: (result, queryContext) => {
        if (result) {
            if (Array.isArray(result)) {
                return Object.values(JSON.parse(JSON.stringify(result)))
            } else {
                result = JSON.parse(JSON.stringify(result))
                return result;
            }
        } else {
            return;
        }
    }
});

module.exports={
    knex_connection
}