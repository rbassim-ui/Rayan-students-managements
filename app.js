// API Base URL - automatically detects environment
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api' 
    : '/api';

// DOM Elements
const studentForm = document.getElementById('student-form');
const studentsList = document.getElementById('students-list');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('error-message');
const studentCount = document.getElementById('student-count');
const searchInput = document.getElementById('search-input');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');

// Form input elements
const studentIdInput = document.getElementById('student-id');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const courseInput = document.getElementById('course');
const enrollmentDateInput = document.getElementById('enrollment-date');

// State
let editMode = false;
let currentEditId = null;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadStudents();
    setupEventListeners();
    setDefaultDate();
});

// Set default date to today
function setDefaultDate() {
    const today = new Date().toISOString().split('T')[0];
    enrollmentDateInput.value = today;
}

// Setup event listeners
function setupEventListeners() {
    studentForm.addEventListener('submit', handleFormSubmit);
    cancelBtn.addEventListener('click', resetForm);
    searchInput.addEventListener('input', handleSearch);
}

// Load all students
async function loadStudents() {
    try {
        showLoading(true);
        hideError();
        
        const response = await fetch(`${API_URL}/students`);
        const result = await response.json();
        
        if (result.success) {
            displayStudents(result.data);
            updateStudentCount(result.count);
        } else {
            showError('Failed to load students');
        }
    } catch (error) {
        console.error('Error loading students:', error);
        showError('Failed to connect to the server. Please try again.');
    } finally {
        showLoading(false);
    }
}

// Display students in grid
function displayStudents(students) {
    if (students.length === 0) {
        studentsList.innerHTML = `
            <div class="empty-state">
                <h3>📋 No Students Found</h3>
                <p>Start by adding your first student!</p>
            </div>
        `;
        return;
    }

    studentsList.innerHTML = students.map(student => `
        <div class="student-card">
            <h3>${escapeHtml(student.name)}</h3>
            <div class="student-info">
                <div class="info-item">
                    <strong>📧 Email:</strong>
                    <span>${escapeHtml(student.email)}</span>
                </div>
                <div class="info-item">
                    <strong>📚 Course:</strong>
                    <span>${escapeHtml(student.course)}</span>
                </div>
                <div class="info-item">
                    <strong>📅 Enrolled:</strong>
                    <span>${formatDate(student.enrollmentDate)}</span>
                </div>
            </div>
            <div class="student-actions">
                <button class="btn btn-edit" onclick="editStudent(${student.id})">Edit</button>
                <button class="btn btn-delete" onclick="deleteStudent(${student.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// Handle form submission
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const studentData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        course: courseInput.value.trim(),
        enrollmentDate: enrollmentDateInput.value
    };

    if (editMode) {
        await updateStudent(currentEditId, studentData);
    } else {
        await createStudent(studentData);
    }
}

// Create new student
async function createStudent(studentData) {
    try {
        const response = await fetch(`${API_URL}/students`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        });

        const result = await response.json();

        if (result.success) {
            showSuccess('Student added successfully! ✅');
            resetForm();
            loadStudents();
        } else {
            showError(result.message || 'Failed to add student');
        }
    } catch (error) {
        console.error('Error creating student:', error);
        showError('Failed to add student. Please try again.');
    }
}

// Update existing student
async function updateStudent(id, studentData) {
    try {
        const response = await fetch(`${API_URL}/students/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        });

        const result = await response.json();

        if (result.success) {
            showSuccess('Student updated successfully! ✅');
            resetForm();
            loadStudents();
        } else {
            showError(result.message || 'Failed to update student');
        }
    } catch (error) {
        console.error('Error updating student:', error);
        showError('Failed to update student. Please try again.');
    }
}

// Edit student
async function editStudent(id) {
    try {
        const response = await fetch(`${API_URL}/students/${id}`);
        const result = await response.json();

        if (result.success) {
            const student = result.data;
            
            // Fill form with student data
            nameInput.value = student.name;
            emailInput.value = student.email;
            courseInput.value = student.course;
            enrollmentDateInput.value = student.enrollmentDate;
            
            // Update form state
            editMode = true;
            currentEditId = id;
            formTitle.textContent = 'Edit Student';
            submitBtn.textContent = 'Update Student';
            cancelBtn.style.display = 'inline-block';
            
            // Scroll to form
            studentForm.scrollIntoView({ behavior: 'smooth' });
        }
    } catch (error) {
        console.error('Error fetching student:', error);
        showError('Failed to load student data');
    }
}

// Delete student
async function deleteStudent(id) {
    if (!confirm('Are you sure you want to delete this student?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/students/${id}`, {
            method: 'DELETE'
        });

        const result = await response.json();

        if (result.success) {
            showSuccess('Student deleted successfully! 🗑️');
            loadStudents();
        } else {
            showError(result.message || 'Failed to delete student');
        }
    } catch (error) {
        console.error('Error deleting student:', error);
        showError('Failed to delete student. Please try again.');
    }
}

// Handle search
let searchTimeout;
function handleSearch(e) {
    clearTimeout(searchTimeout);
    
    const query = e.target.value.trim();
    
    if (query.length === 0) {
        loadStudents();
        return;
    }
    
    searchTimeout = setTimeout(async () => {
        try {
            showLoading(true);
            const response = await fetch(`${API_URL}/students/search/${encodeURIComponent(query)}`);
            const result = await response.json();
            
            if (result.success) {
                displayStudents(result.data);
                updateStudentCount(result.count);
            }
        } catch (error) {
            console.error('Error searching:', error);
            showError('Search failed. Please try again.');
        } finally {
            showLoading(false);
        }
    }, 300);
}

// Reset form
function resetForm() {
    studentForm.reset();
    setDefaultDate();
    editMode = false;
    currentEditId = null;
    formTitle.textContent = 'Add New Student';
    submitBtn.textContent = 'Add Student';
    cancelBtn.style.display = 'none';
}

// Update student count
function updateStudentCount(count) {
    studentCount.textContent = `${count} Student${count !== 1 ? 's' : ''}`;
}

// Show loading
function showLoading(show) {
    loading.style.display = show ? 'block' : 'none';
}

// Show error
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

// Hide error
function hideError() {
    errorMessage.style.display = 'none';
}

// Show success message
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'error-message';
    successDiv.style.background = '#d1fae5';
    successDiv.style.color = '#065f46';
    successDiv.style.borderLeft = '4px solid #22c55e';
    successDiv.textContent = message;
    
    errorMessage.parentNode.insertBefore(successDiv, errorMessage);
    
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
