const app = require('./index');

// This file is only for local development
// Vercel will use the exported app from index.js directly

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API endpoints:`);
  console.log(`  GET    /api/students       - Get all students`);
  console.log(`  GET    /api/students/:id   - Get student by ID`);
  console.log(`  POST   /api/students       - Create new student`);
  console.log(`  PUT    /api/students/:id   - Update student`);
  console.log(`  DELETE /api/students/:id   - Delete student`);
});
