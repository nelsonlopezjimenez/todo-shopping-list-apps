// package.json for backend
{
  "name": "todo-shopping-backend",
  "version": "5.0.0",
  "description": "Modern Express backend for todo shopping list",
  "main": "src/index.js",
  "type": "module",
  "scripts": {
    "dev": "nodemon src/index.js",
    "start": "node src/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["express", "mongodb", "todo", "rest-api"],
  "author": "Nelson Lopez",
  "license": "GPL-3.0",
  "dependencies": {
    "express": "^4.19.2",
    "mongoose": "^8.5.1",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "dotenv": "^16.4.5",
    "express-rate-limit": "^7.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.1.4"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}

// ========== src/index.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import todoRoutes from './routes/todoRoutes.js';
import { connectDB } from './config/database.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/todos', todoRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ 
    error: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { details: err.message })
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// ========== src/config/database.js
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todoapp';
    
    await mongoose.connect(mongoURI, {
      // Modern connection options (useNewUrlParser and useUnifiedTopology are now default)
    });
    
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('📴 MongoDB disconnected');
});

mongoose.connection.on('error', (error) => {
  console.error('🔥 MongoDB error:', error);
});

// ========== src/models/Todo.js
import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Todo name is required'],
    trim: true,
    maxlength: [200, 'Todo name cannot exceed 200 characters']
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Automatically manages createdAt and updatedAt
});

// Add index for better query performance
todoSchema.index({ completed: 1, createdAt: -1 });

export const Todo = mongoose.model('Todo', todoSchema);

// ========== src/controllers/todoController.js
import { Todo } from '../models/Todo.js';

// Get all todos
export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
};

// Create new todo
export const createTodo = async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name?.trim()) {
      return res.status(400).json({ error: 'Todo name is required' });
    }

    const todo = new Todo({ name: name.trim() });
    const savedTodo = await todo.save();
    
    res.status(201).json({
      message: 'Todo created successfully',
      todo: savedTodo
    });
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ error: 'Failed to create todo' });
  }
};

// Get single todo
export const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid todo ID' });
    }

    const todo = await Todo.findById(id);
    
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    res.json(todo);
  } catch (error) {
    console.error('Error fetching todo:', error);
    res.status(500).json({ error: 'Failed to fetch todo' });
  }
};

// Update todo
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid todo ID' });
    }

    // Validate updates
    if (updates.name !== undefined && !updates.name?.trim()) {
      return res.status(400).json({ error: 'Todo name cannot be empty' });
    }

    const todo = await Todo.findByIdAndUpdate(
      id, 
      { ...updates, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    res.json({
      message: 'Todo updated successfully',
      todo
    });
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Failed to update todo' });
  }
};

// Delete todo
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid todo ID' });
    }

    const todo = await Todo.findByIdAndDelete(id);
    
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    res.json({
      message: 'Todo deleted successfully',
      todo
    });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
};

// ========== src/routes/todoRoutes.js
import express from 'express';
import {
  getAllTodos,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo
} from '../controllers/todoController.js';

const router = express.Router();

// GET /api/todos - Get all todos
router.get('/', getAllTodos);

// POST /api/todos - Create new todo
router.post('/', createTodo);

// GET /api/todos/:id - Get single todo
router.get('/:id', getTodoById);

// PUT /api/todos/:id - Update todo
router.put('/:id', updateTodo);

// DELETE /api/todos/:id - Delete todo
router.delete('/:id', deleteTodo);

export default router;

// ========== .env (example)
# Database
MONGODB_URI=mongodb://localhost:27017/todoapp

# Server
PORT=3001
NODE_ENV=development

# Frontend URL for CORS
FRONTEND_URL=http://localhost:3000