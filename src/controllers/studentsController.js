// src/controllers/studentsController.js
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from '../models/studentsModel.js';

// GET /api/students - Ambil semua data mahasiswa
export const getStudents = async (req, res) => {
  try {
    const students = await getAllStudents();
    res.status(200).json(students);
  } catch (error) {
    console.error('[GET /students] Error:', error);
    res.status(500).json({ message: 'Error retrieving data' });
  }
};

// GET /api/students/:id - Ambil mahasiswa berdasarkan ID
export const getStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await getStudentById(id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error('[GET /students/:id] Error:', error);
    res.status(500).json({ message: 'Error fetching student' });
  }
};

// POST /api/students - Tambah mahasiswa baru
export const addStudent = async (req, res) => {
  try {
    const { name, major, age } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const newStudent = await createStudent(name, major || null, age || null);
    res.status(201).json(newStudent);
  } catch (error) {
    console.error('[POST /students] Error:', error);
    res.status(500).json({ message: 'Error creating student' });
  }
};

// PUT /api/students/:id - Update data mahasiswa
export const editStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, major, age } = req.body;

    const existing = await getStudentById(id);
    if (!existing) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const updatedStudent = await updateStudent(
      id,
      name ?? existing.name,
      major ?? existing.major,
      age ?? existing.age
    );

    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error('[PUT /students/:id] Error:', error);
    res.status(500).json({ message: 'Error updating student' });
  }
};

// DELETE /api/students/:id - Hapus mahasiswa
export const removeStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await getStudentById(id);
    if (!existing) {
      return res.status(404).json({ message: 'Student not found' });
    }

    await deleteStudent(id);
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('[DELETE /students/:id] Error:', error);
    res.status(500).json({ message: 'Error deleting student' });
  }
};
