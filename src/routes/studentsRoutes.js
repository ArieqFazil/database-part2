// src/routes/studentsRoutes.js
import express from 'express';
import {
  getStudents,
  getStudent,
  addStudent,
  editStudent,
  removeStudent,
} from '../controllers/studentsController.js';

const router = express.Router();

router.get('/', getStudents);        // GET semua student
router.get('/:id', getStudent);      // GET student by ID
router.post('/', addStudent);        // POST tambah student
router.put('/:id', editStudent);     // PUT update student
router.delete('/:id', removeStudent);// DELETE student

export default router;
