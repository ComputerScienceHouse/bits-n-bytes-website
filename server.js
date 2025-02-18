const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

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

// User registration endpoint
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

// Admin registration endpoint
app.post('/api/admin/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO admins (username, password) VALUES ($1, $2) RETURNING *',
            [username, hashedPassword]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error registering admin:', error);
        res.status(500).send('Server error');
    }
});

// Admin login endpoint
app.post('/api/admin/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM admins WHERE username = $1', [username]);
        const admin = result.rows[0];

        if (admin && await bcrypt.compare(password, admin.password)) {
            res.status(200).send('Login successful');
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});