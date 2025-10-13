// src/models/studentsModel.js
import pool from '../config/db.js';

// Ambil semua data students
export const getAllStudents = async () => {
  const result = await pool.query('SELECT * FROM students ORDER BY id ASC');
  return result.rows;
};

// Ambil satu student berdasarkan id
export const getStudentById = async (id) => {
  const result = await pool.query('SELECT * FROM students WHERE id = $1', [id]);
  return result.rows[0];
};

// Tambah student baru
export const createStudent = async (name, major, age) => {
  const result = await pool.query(
    'INSERT INTO students (name, major, age) VALUES ($1, $2, $3) RETURNING *',
    [name, major, age]
  );
  return result.rows[0];
};

// Update data student
export const updateStudent = async (id, name, major, age) => {
  const result = await pool.query(
    'UPDATE students SET name=$1, major=$2, age=$3 WHERE id=$4 RETURNING *',
    [name, major, age, id]
  );
  return result.rows[0];
};

// Hapus data student
export const deleteStudent = async (id) => {
  await pool.query('DELETE FROM students WHERE id=$1', [id]);
};
