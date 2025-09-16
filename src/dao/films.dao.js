// src/dao/filmsDao.js
const { pool } = require('../config/db');

// Zoek films met optionele filters
async function search({ q, year, genre, actor }) {
  const where = [];
  const params = [];

  if (q) { where.push('(f.title LIKE ? OR f.description LIKE ?)'); params.push(`%${q}%`, `%${q}%`); }
  if (year) { where.push('f.release_year = ?'); params.push(Number(year)); }
  if (genre) { where.push('c.name = ?'); params.push(genre); }
  if (actor) { where.push('CONCAT(a.first_name, " ", a.last_name) LIKE ?'); params.push(`%${actor}%`); }

  const sql = `
    SELECT f.film_id, f.title, f.description, f.release_year,
           l.name AS language,
           GROUP_CONCAT(DISTINCT c.name ORDER BY c.name SEPARATOR ', ') AS categories,
           GROUP_CONCAT(DISTINCT CONCAT(a.first_name, ' ', a.last_name) ORDER BY a.last_name SEPARATOR ', ') AS actors
    FROM film f
    JOIN language l ON l.language_id = f.language_id
    LEFT JOIN film_category fc ON fc.film_id = f.film_id
    LEFT JOIN category c ON c.category_id = fc.category_id
    LEFT JOIN film_actor fa ON fa.film_id = f.film_id
    LEFT JOIN actor a ON a.actor_id = fa.actor_id
    ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
    GROUP BY f.film_id
    ORDER BY f.title
    LIMIT 100
  `;
  const [rows] = await pool.query(sql, params);
  return rows;
}

async function findById(id) {
  const sql = `
    SELECT f.*, l.name AS language,
           GROUP_CONCAT(DISTINCT c.name ORDER BY c.name SEPARATOR ', ') AS categories,
           GROUP_CONCAT(DISTINCT CONCAT(a.first_name, ' ', a.last_name) ORDER BY a.last_name SEPARATOR ', ') AS actors
    FROM film f
    JOIN language l ON l.language_id = f.language_id
    LEFT JOIN film_category fc ON fc.film_id = f.film_id
    LEFT JOIN category c ON c.category_id = fc.category_id
    LEFT JOIN film_actor fa ON fa.film_id = f.film_id
    LEFT JOIN actor a ON a.actor_id = fa.actor_id
    WHERE f.film_id = ?
    GROUP BY f.film_id
  `;
  const [rows] = await pool.query(sql, [Number(id)]);
  return rows[0];
}

module.exports = { search, findById };
