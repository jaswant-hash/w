const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({ host: 'localhost', user: 'root', password: 'root', database: 'college' });

app.get('/students', async (req, res) => res.json((await db.query('SELECT * FROM students'))[0]));

app.post('/students', async (req, res) => {
  const { name, department, year } = req.body;
  await db.query('INSERT INTO students (name, department, year) VALUES (?, ?, ?)', [name, department, year]);
  res.json({ message: 'added' });
});

app.put('/students/:id', async (req, res) => {
  const { name, department, year } = req.body;
  await db.query('UPDATE students SET name=?, department=?, year=? WHERE id=?', [name, department, year, req.params.id]);
  res.json({ message: 'updated' });
});

app.delete('/students/:id', async (req, res) => {
  await db.query('DELETE FROM students WHERE id=?', [req.params.id]);
  res.json({ message: 'deleted' });
});

app.listen(3000);