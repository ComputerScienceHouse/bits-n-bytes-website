const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();
const port = 4999;

app.use(bodyParser.json());

// PostgreSQL connection
const pool = new Pool({
    user: 'bitsnbytes',
    host: 'localhost',
    database: 'nfc_registration',
    password: 'HvLneStLjEhKNZAzxc',
    port: 5432,
});

app.post('/api/register', async (req, res) => {
    const { name, email, nfcToken } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO users (name, email, nfc_token) VALUES ($1, $2, $3) RETURNING *',
            [name, email, nfcToken]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});