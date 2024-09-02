import express from 'express';
import pool from './db.js'; 

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



app.get('/', (req, res) => {
    try {
      res.send('Hello, World!');
    } catch (error) {
      res.status(500).send('Something went wrong!');
    }
  });
  
  app.post('/', (req, res) => {
    const data = req.body;
    if (!data) {
      res.status(400).send('No data provided');
    } else {
      res.send(`Data received: ${JSON.stringify(data)}`);
    }
  });
  


  app.get('/products', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM products');
      res.json(rows);
    } catch (error) {
      res.status(500).send('Error fetching products');
    }
  });
  
  app.post('/products', async (req, res) => {
    const { name, price } = req.body;
    if (!name || !price) {
      return res.status(400).send('Name and price are required');
    }
  
    try {
      const [result] = await pool.query('INSERT INTO products (name, price) VALUES (?, ?)', [name, price]);
      res.send(`Product added with ID: ${result.insertId}`);
    } catch (error) {
      res.status(500).send('Error adding product');
    }
  });
  