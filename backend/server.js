import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200,
}));

const connection = new sqlite3.Database('./db/aplikasi.db');

// Fetch user information by ID
app.get('/api/user/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'SELECT * FROM users WHERE id = ?';
  
  connection.all(query, [userId], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Internal Server Error');
    }
    res.json(results);
  });
});

// Change user email by ID
app.post('/api/user/:id/change-email', (req, res) => {
  const userId = req.params.id;
  const newEmail = req.body.email;

  // Validate the new email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(newEmail)) {
    return res.status(400).send('Invalid email format');
  }

  const query = 'UPDATE users SET email = ? WHERE id = ?';
  connection.run(query, [newEmail, userId], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    if (this.changes === 0) {
      return res.status(404).send('User not found');
    }
    res.status(200).send('Email updated successfully');
  });
});

// Serve a file based on query parameter
app.get('/api/file', (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.join(__dirname, 'files', req.query.name);
  res.sendFile(filePath);
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});

// Example endpoint
app.get('/your_name', (req, res) => {
  res.send('Hello, elvan'); // Replace 'your_name' with your actual name.
});
