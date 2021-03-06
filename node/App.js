const express = require('express')
const app = express()
const port = 3003
const mysql = require('mysql')
const cors = require('cors')
app.use(cors())

app.use(express.urlencoded({ // leidžia susisieti/gauti duomenis iš JSON
    extended: true
}))
app.use(express.json());

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'rent'
})

con.connect(err => {
    if (err) {
        throw err;
    }
    console.log('Yes!');
})






// Iraso nauja posta
// INSERT INTO table_name (column1, column2, column3,...)
// VALUES (value1, value2, value3,...)
app.post('/scooters', (req, res) => {
    console.log(req.body.id)
    const sql = `
        INSERT INTO scooters
        (registration_code, is_busy, last_use_time, total_ride_kilometres)
        VALUES (?, ?, ?, ?)
        `;
    con.query(sql, [req.body.registration_code, req.body.is_busy, req.body.last_use_time, req.body.total_ride_kilometres], (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    })
})

// Trina posta
// DELETE FROM table_name
// WHERE some_column = some_value
app.delete('/scooters/:id', (req, res) => {
    const sql = `
        DELETE FROM scooters
        WHERE id = ?
        `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    })
})

//Redagavimas
// UPDATE table_name
// SET column1=value, column2=value2,...
// WHERE some_column=some_value 
app.put('/scooters/:id', (req, res) => {
    const sql = `
        UPDATE scooters
        SET registration_code = ?, is_busy = ?, last_use_time = ?, total_ride_kilometres = ?
        WHERE id = ?
        `;
    con.query(sql, [req.body.registration_code, req.body.is_busy, req.body.last_use_time, req.body.total_ride_kilometres, req.params.id], (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    })
})


// rodo visus postus
app.get('/scooters', (req, res) => {
    con.query('SELECT * FROM scooters ORDER BY id DESC', (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results);
    })
})

// skaiciuoja irasus
// SELECT COUNT(ProductID) AS NumberOfProducts FROM Products; 
app.get('/scooters/count', (req, res) => {
    con.query('SELECT COUNT(id) as scootersCount FROM scooters', (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results);
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})