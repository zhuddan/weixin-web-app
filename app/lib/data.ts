import pool from './db';

export const generateRandomString = (length = 8) => {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join('');
};



export const getUserTest = async () => {
  const [rows] = await pool.query('SELECT * FROM users');
  return rows
};
