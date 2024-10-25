const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3060;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from public folder

// MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'Administrator',
    password: 'rhema2024', // Sensitive information
    database: 'user_db',
});

// Connect to the database
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database.');
});

// Serve the login form at the root URL
app.get('/', (req, res) => {
    res.redirect('/login'); // Redirect to /login
});

// Serve the login form
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login', 'login.html')); // Adjust path to the 'log in' folder
});

// Handle login submission
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Query to check user credentials
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    connection.query(query, [email, password], (err, results) => {
        if (err) {
            return res.status(500).send('Error during login.');
        }
        if (results.length > 0) {
            // Successful login
            res.send('Login successful!');
        } else {
            // Invalid credentials
            res.send('Invalid email or password.');
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
