const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory database (replace with real database in production)
let students = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    course: "Computer Science",
    enrollmentDate: "2024-01-15"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    course: "Mathematics",
    enrollmentDate: "2024-01-20"
  }
];

let nextId = 3;

// Routes

// Health check
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Student Management System API',
    status: 'active',
    endpoints: {
      getAll: 'GET /api/students',
      getOne: 'GET /api/students/:id',
      create: 'POST /api/students',
      update: 'PUT /api/students/:id',
      delete: 'DELETE /api/students/:id'
    }
  });
});

// Get all students
app.get('/api/students', (req, res) => {
  res.json({
    success: true,
    count: students.length,
    data: students
  });
});

// Get student by ID
app.get('/api/students/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  
  if (!student) {
    return res.status(404).json({
      success: false,
      message: 'Student not found'
    });
  }
  
  res.json({
    success: true,
    data: student
  });
});

// Create new student
app.post('/api/students', (req, res) => {
  const { name, email, course, enrollmentDate } = req.body;
  
  if (!name || !email || !course) {
    return res.status(400).json({
      success: false,
      message: 'Please provide name, email, and course'
    });
  }
  
  const newStudent = {
    id: nextId++,
    name,
    email,
    course,
    enrollmentDate: enrollmentDate || new Date().toISOString().split('T')[0]
  };
  
  students.push(newStudent);
  
  res.status(201).json({
    success: true,
    message: 'Student created successfully',
    data: newStudent
  });
});

// Update student
app.put('/api/students/:id', (req, res) => {
  const studentIndex = students.findIndex(s => s.id === parseInt(req.params.id));
  
  if (studentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Student not found'
    });
  }
  
  const { name, email, course, enrollmentDate } = req.body;
  
  students[studentIndex] = {
    ...students[studentIndex],
    ...(name && { name }),
    ...(email && { email }),
    ...(course && { course }),
    ...(enrollmentDate && { enrollmentDate })
  };
  
  res.json({
    success: true,
    message: 'Student updated successfully',
    data: students[studentIndex]
  });
});

// Delete student
app.delete('/api/students/:id', (req, res) => {
  const studentIndex = students.findIndex(s => s.id === parseInt(req.params.id));
  
  if (studentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Student not found'
    });
  }
  
  const deletedStudent = students.splice(studentIndex, 1)[0];
  
  res.json({
    success: true,
    message: 'Student deleted successfully',
    data: deletedStudent
  });
});

// Search students
app.get('/api/students/search/:query', (req, res) => {
  const query = req.params.query.toLowerCase();
  const results = students.filter(s => 
    s.name.toLowerCase().includes(query) ||
    s.email.toLowerCase().includes(query) ||
    s.course.toLowerCase().includes(query)
  );
  
  res.json({
    success: true,
    count: results.length,
    data: results
  });
});

// IMPORTANT: Export the Express app for Vercel
// DO NOT use app.listen() - Vercel handles this
module.exports = app;
