const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'JsonDB',
    password: 'password',
    port: 5432,
});

app.use(bodyParser.json());

app.post('/addData', async (req, res) => {
    try {
        const { jsonData } = req.body;
        const result = await pool.query(
            'INSERT INTO request_data (data) VALUES ($1) RETURNING *',
            [jsonData]
        );
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
