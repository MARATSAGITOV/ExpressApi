let pg = require('pg');
const config = {
    user: 'postgres',
    password: '94cfpmky',
    host: '127.0.0.1',
    port: 5432,
    database: 'expressApi'
}
import { v4 as uuidv4 } from 'uuid';
const { StaticPool } = require('node-worker-threads-pool')


exports.getUsers = function(req, res) {

    let con = new pg.Client(config);
    con.connect().then(client => {

        con.query(`Select * from Users;`, (err, reslt1) => {
            if (err) {
                console.log(err)
            }
            console.log(reslt1);
            con.end()
            return reslt1
                // res.render('index', { title: 'MyShopApp', user: req.user, products: reslt1.rows });

        });
    });


}
exports.getUserById = function(req, res) {

    let con = new pg.Client(config);
    con.connect().then(client => {

        con.query(`Select * from Users Where id=${req.body.id};`, (err, reslt1) => {
            if (err) {
                console.log(err)
            }
            console.log(reslt1);
            con.end()
            return reslt1
                // res.render('index', { title: 'MyShopApp', user: req.user, products: reslt1.rows });

        });
    });
}

exports.postUser = function(req, res) {
    let t1 = Date.now();
    let con = new pg.Client(config);
    con.connect().then(client => {

        con.query(`INSERT INTO Users(id, username, password) Values('${uuidv4()}','${req.body.username}','${req.body.password}');`, (err, reslt1) => {
            if (err) {
                console.log(err)
            }
            if (reslt1) {
                console.log(reslt1)
                return reslt1;
            }
            con.end()
        })
    });

    let t2 = Date.now();

    console.log("Resulted time: " + t1 - t2 + " ms")
}


exports.postUserWithWorker = function(req, res) {

    let t1 = Date.now();
    let con = new pg.Client(config);
    let client = con.connect();
    const staticPool = new StaticPool({
        size: 1,
        task: () => {


            con.query(`INSERT INTO Users(id, username, password) Values('${uuidv4()}','${req.body.username}','${req.body.password}');`, (err, reslt1) => {
                if (err) {
                    console.log(err)
                }
                if (reslt1) {
                    console.log(reslt1)
                    return reslt1;
                }
                con.end()
            });
        },
    })

    staticPool.exec(1).then(reslt => {
        console.log("Task executed! Result: " + reslt)
    })

    let t2 = Date.now();

    console.log("Resulted time: " + t1 - t2 + " ms")
}

exports.postUserAsync = async function(req, res) {
    let t1 = Date.now();
    let con = new pg.Client(config);
    let client = await con.connect();
    con.query(`INSERT INTO Users(id, username, password) Values('${uuidv4()}','${req.body.username}','${req.body.password}');`, (err, reslt1) => {
        if (err) {
            console.log(err)
        }
        if (reslt1) {
            console.log(reslt1)
            return reslt1;
        }
        con.end()
    });

    let t2 = Date.now();

    console.log("Resulted time: " + t1 - t2 + " ms")
}