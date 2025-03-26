const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

// JWT secret key
const jwtSecret = 'your_jwt_secret_key';

// Middleware to verify JWT
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// User registration endpoint
app.post('/api/register', async (req, res) => {
    const { username, email, phone, nfcToken } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO users (username, email, phone, nfc_token) VALUES ($1, $2, $3, $4) RETURNING *',
            [username, email, phone, nfcToken]
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
            const token = jwt.sign({ username: admin.username, role: 'admin' }, jwtSecret, { expiresIn: '1h' });
            res.status(200).json({ token });
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Server error');
    }
});

// Example protected route
app.get('/api/admin/protected', authenticateToken, (req, res) => {
    res.status(200).send('This is a protected route');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});