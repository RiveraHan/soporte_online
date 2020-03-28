var mysql = require('mysql2/promise');
var { REP_DESEMPENO } = require('../querys/reportes');
var { cnc } = require('../../database/connection');
var config = require('../../database/config');

//console.log(config);

let configuration = {
    host: config.db.host,
    user: config.db.username,
    password: config.db.password,
    database: config.db.database,
    multipleStatements: true
}

const reportes = {

    reporteDesempeno: (filtro) => {
        return cnc(mysql, configuration, REP_DESEMPENO(filtro))
    },
}

module.exports = reportes;