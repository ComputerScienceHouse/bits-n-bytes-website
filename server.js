const express = require('express');
const next = require('next');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { spawn } = require('child_process');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const port = 3000;

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

// JWT middleware
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

nextApp.prepare().then(() => {
    const app = express();

    app.use(bodyParser.json());

    // --- API ROUTES ---

    // Register user
    app.post('/api/register', async (req, res) => {
        const { username, email, phone, nfcToken } = req.body;
        const defaultBalance = 25.00;

        try {
            await pool.query('BEGIN');

            const result = await pool.query(
                'INSERT INTO users (name, email, phone, balance, thumb_img) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, phone, balance, thumb_img',
                [username, email, phone, defaultBalance, null]
            );
            const user = result.rows[0];

            await pool.query(
                'INSERT INTO nfc_data (assigned_user, id) VALUES ($1, $2)',
                [user.id, nfcToken]
            );

            await pool.query('COMMIT');
            res.status(201).json(user);
        } catch (error) {
            await pool.query('ROLLBACK');
            console.error('Error registering user:', error);
            res.status(500).send('Server error');
        }
    });

    // Admin registration
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

    // Admin login
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

    // Protected route example
    app.get('/api/admin/protected', authenticateToken, (req, res) => {
        res.status(200).send('This is a protected route');
    });

    // Python script call
    app.get('/api/scan-nfc', (req, res) => {
        const py = spawn('python3', ['scripts/scan_nfc.py']);

        let data = '';
        py.stdout.on('data', chunk => data += chunk);
        py.stderr.on('data', err => console.error(`Python stderr: ${err}`));

        py.on('close', code => {
            if (code !== 0) {
                return res.status(500).send('Failed to scan NFC');
            }
            res.json({ token: data.trim() });
        });
    });

    // Let Next.js handle everything else
    app.all('*', (req, res) => handle(req, res));

    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
});
