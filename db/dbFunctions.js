// Import utilities
const mysql = require('mysql');
const dotenv = require('dotenv').config();

module.exports = {
    createClient,
    selectClient,
    deleteClient,
    addClientInfo,
    selectClientInfo,
    selectAllClients,
    selectAllExercises,
    selectAllPrograms,
    SelectExerFromThumb,
    createExercise,
    createProgram,
    selectProgramFromName
}

// Connect to database (MUST USE LEGACY AUTHENTICATION METHOD (RETAIN MYSQL 5.X COMPATIBILITY))
const dbconnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

dbconnection.connect((error) => {

    if (error) {
        console.log("ERROR: Problems connecting to database!");
    }
});


/*
*******************************************
            STORED PROCEDURES               
*******************************************
*/
function createClient(mail, fName, lName, userKey) {
    return new Promise((resolve) => {

        var sql = 'CALL spCreateClient(?,?,?,?)';

        dbconnection.query(sql, [mail, fName, lName, userKey], (err, data) => {
            if (err && err.errno==1062) {
                resolve(1);
            }
            else if (typeof data !== 'undefined' && data["affectedRows"] == 1) { 
                resolve(0);
            }
            else {
                resolve(2);
            }
        });
    });
};

function createProgram(pname , pdescription ,pthumbnailPath) {
    return new Promise((resolve) => {

        var sql = 'CALL spcreateProgram(?,?,?)';

        dbconnection.query(sql, [pname, pdescription, pthumbnailPath], (err, data) => {
            if (err && err.errno==1062) {
                resolve(1);
            }
            else if (typeof data !== 'undefined' && data["affectedRows"] == 1) { 
                resolve(0);
            }
            else {
                resolve(2);
            }
        });
    });
};

function createExercise(ename, difficulty, e_description, targetMuscle ,thumbnailPath,videoPath) {
    return new Promise((resolve) => {

        var sql = 'CALL spCreateExercise(?,?,?,?,?,?)';

        dbconnection.query(sql, [ename, difficulty, e_description, targetMuscle ,thumbnailPath,videoPath], (err, data) => {
            if (err && err.errno==1062) {
                resolve(1);
            }
            else if (typeof data !== 'undefined' && data["affectedRows"] == 1) { 
                resolve(0);
            }
            else {
                resolve(2);
            }
        });
    });
};

function selectClient(mail, userKey) {
    return new Promise((resolve) => {
        

        var sql = 'CALL spSelectClient(?,?)';

        dbconnection.query(sql, [mail, userKey], (err, data) => {
            if (err) {
                resolve(1);
            }
            else if (typeof data !== 'undefined' && data.length > 0 && data[0].length > 0) {
                resolve(data);
            }
            else {
                resolve(2);
            }
        });
    });
};


function selectAllClients( userKey) {
    return new Promise((resolve) => {
        

        var sql = 'CALL spSelectAllClients(?)';

        dbconnection.query(sql,  userKey, (err, data) => {
            if (err) {
                resolve(1);
            }
            else if (typeof data !== 'undefined' && data.length > 0 && data[0].length > 0) {
                resolve(data);
            }
            else {
                resolve(2);
            }
        });
    });
};


function selectAllExercises( userKey) {
    return new Promise((resolve) => {
        

        var sql = 'CALL spSelectAllExercises()';

        dbconnection.query(sql, (err, data) => {
            if (err) {
                console.log(err)
                resolve("fetc error");
            }
            else if (typeof data !== 'undefined' && data.length > 0 && data[0].length > 0) {
                resolve(data);
            }
            else {
                resolve("data error");
            }
        });
    });
};

function selectAllPrograms( ) {
    return new Promise((resolve) => {
        

        var sql = 'CALL spSelectAllPrograms()';

        dbconnection.query(sql,  (err, data) => {
            if (err) {
                resolve("fetc error");
            }
            else if (typeof data !== 'undefined' && data.length > 0 && data[0].length > 0) {
                resolve(data);
            }
            else {
                resolve("data error");
            }
        });
    });
};

function SelectExerFromThumb( thumb) {
    return new Promise((resolve) => {
        

        var sql = 'CALL spSelectExerFromThumb(?)';

        dbconnection.query(sql, thumb, (err, data) => {
            if (err) {
                resolve("fetc error");
            }
            else if (typeof data !== 'undefined' && data.length > 0 && data[0].length > 0) {
                resolve(data);
            }
            else {
                resolve("data error");
            }
        });
    });
};

function selectProgramFromName( name) {
    return new Promise((resolve) => {
        

        var sql = 'CALL spSelectProgramFromName(?)';

        dbconnection.query(sql, name, (err, data) => {
            if (err) {
                resolve("fetc error");
            }
            else if (typeof data !== 'undefined' && data.length > 0 && data[0].length > 0) {
                resolve(data);
            }
            else {
                resolve("data error");
            }
        });
    });
};

function deleteClient(mail, userKey) {
    return new Promise((resolve) => {

        var sql = 'CALL spDeleteClient(?,?)';

        dbconnection.query(sql, [mail, userKey], (err, data) => {
            if (err) {
                resolve(1);
            }
            else if (typeof data !== 'undefined' && data["affectedRows"] == 1) {
                resolve(0);
            }
            else {
                resolve(2);
            }
        });
    });
};

function addClientInfo(mail, age, height, weight, fitness, pathologies, userKey) {
    return new Promise((resolve) => {

        var sql = 'CALL spAddClientInfo(?,?,?,?,?,?,?)';

        dbconnection.query(sql, [mail, age, height, weight, fitness, pathologies, userKey], (err, data) => {
            if (err) {
                resolve(1);
            }
            else if (typeof data !== 'undefined' && data["affectedRows"] == 1) {
                resolve(0);
            }
            else {
                resolve(2);
            }
        });
    });
};

function selectClientInfo(mail, userKey) {
    return new Promise((resolve) => {

        var sql = 'CALL spSelectClientInfo(?,?)';

        dbconnection.query(sql, [mail, userKey], (err, data) => {
            if (err) {
                resolve(1);
            }
            else if (typeof data !== 'undefined' && data.length > 0 && data[0].length > 0) {
                resolve(0);
            }
            else {
                resolve(2);
            }
        });
    });
};

/*
*******************************************
            USER DEFINED FUNCTIONS                
*******************************************
*/