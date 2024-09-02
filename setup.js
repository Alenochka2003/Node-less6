import pool from './db.js';

async function setup() {
  const connection = await pool.getConnection();
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10, 2) NOT NULL
    )
  `);
  connection.release();
  console.log('Table `products` has been created');
}

setup().catch(console.error);
