# Student Management System

A modern, serverless Student Management System built with Node.js and Express, optimized for Vercel deployment.

## 🚀 Features

- ✅ Create, Read, Update, Delete (CRUD) student records
- 🔍 Search functionality for students
- 📱 Responsive design for all devices
- 🎨 Modern UI with smooth animations
- ⚡ Serverless architecture (Vercel-ready)
- 🔒 XSS protection with input sanitization

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Deployment**: Vercel (Serverless Functions)

## 📁 Project Structure

```
student-management/
├── api/
│   ├── index.js          # Main API routes (Vercel serverless function)
│   └── server.js         # Local development server
├── index.html            # Frontend HTML
├── styles.css            # Styling
├── app.js                # Frontend JavaScript
├── package.json          # Dependencies
├── vercel.json           # Vercel configuration
└── README.md             # Documentation
```

## 🔧 Installation

1. **Clone or navigate to the project directory**

2. **Install dependencies**
   ```bash
   npm install
   ```

## 🏃‍♂️ Running Locally

### Option 1: Using Vercel CLI (Recommended)
```bash
npm run dev
```
This starts the Vercel development server at `http://localhost:3000`

### Option 2: Using Node directly
```bash
node api/server.js
```

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api` | API health check |
| GET | `/api/students` | Get all students |
| GET | `/api/students/:id` | Get student by ID |
| POST | `/api/students` | Create new student |
| PUT | `/api/students/:id` | Update student |
| DELETE | `/api/students/:id` | Delete student |
| GET | `/api/students/search/:query` | Search students |

### Example API Request

**Create Student:**
```bash
POST /api/students
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "course": "Computer Science",
  "enrollmentDate": "2024-01-15"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Student created successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "course": "Computer Science",
    "enrollmentDate": "2024-01-15"
  }
}
```

## 🚀 Deploying to Vercel

### Method 1: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Method 2: GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Vercel will auto-detect settings and deploy

## ⚙️ Configuration

### vercel.json
The `vercel.json` file configures Vercel deployment:
- Routes API calls to serverless functions
- Serves static files (HTML, CSS, JS)
- No `app.listen()` needed - Vercel handles it

### Key Differences from Traditional Express

❌ **Don't do this:**
```javascript
app.listen(3000, () => {
  console.log('Server running...');
});
```

✅ **Do this instead:**
```javascript
module.exports = app;
```

## 🗄️ Database

Currently uses in-memory storage (resets on deployment). For production:

### Recommended Database Options:

1. **MongoDB Atlas** (Free tier available)
2. **PostgreSQL** (Vercel Postgres)
3. **Supabase** (PostgreSQL with real-time)
4. **PlanetScale** (MySQL)

### Example: Adding MongoDB

```bash
npm install mongoose
```

Update `api/index.js`:
```javascript
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  course: String,
  enrollmentDate: Date
});

const Student = mongoose.model('Student', StudentSchema);
```

## 🔐 Environment Variables

Create a `.env` file for local development:

```env
MONGODB_URI=your_database_connection_string
PORT=3000
```

Add environment variables in Vercel Dashboard:
1. Go to Project Settings
2. Navigate to Environment Variables
3. Add your variables

## 📱 Features

### Student Management
- Add new students with name, email, course, and enrollment date
- Edit existing student information
- Delete students with confirmation
- View all students in a card-based grid layout

### Search & Filter
- Real-time search across name, email, and course
- Instant results as you type

### UI/UX
- Responsive design works on desktop, tablet, and mobile
- Smooth animations and transitions
- Color-coded action buttons
- Form validation
- Success/error notifications

## 🐛 Troubleshooting

### Issue: "Cannot GET /api/students"
- Ensure `vercel.json` routing is correct
- Check that API files are in `/api` folder
- Verify Express app is exported (not using `app.listen()`)

### Issue: CORS errors
- CORS is enabled in the API
- Check API_URL in `app.js` matches your deployment URL

### Issue: Form not submitting
- Check browser console for errors
- Verify API endpoint is accessible
- Ensure all required fields are filled

## 📝 License

MIT License - feel free to use this project for learning or production!

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📧 Support

For questions or issues, please open an issue in the repository.

---

**Built with ❤️ for Vercel deployment**
