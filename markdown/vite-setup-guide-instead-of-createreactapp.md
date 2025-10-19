# Modern Todo Shopping List App - Vite + React

A full-stack todo application built with **Vite**, **React 18**, and **Express** with **MongoDB**. This project demonstrates modern web development best practices and is designed as a teaching tool.

## 🚀 Why Vite over Create React App?

### **Vite Advantages:**
- ⚡ **Lightning fast** - Hot Module Replacement (HMR) in milliseconds
- 🏗️ **Modern build tool** - Uses native ES modules during development
- 📦 **Smaller bundle sizes** - Better tree-shaking and optimization
- 🔧 **Better developer experience** - Faster startup and builds
- 🎯 **Future-proof** - Built for modern JavaScript ecosystem
- 🛠️ **Flexible configuration** - Easy to customize and extend

### **Performance Comparison:**
```bash
# Development server startup
Create React App: ~15-30 seconds
Vite: ~1-3 seconds

# Hot reload time
Create React App: ~2-5 seconds  
Vite: ~50-200ms

# Production build
Create React App: ~60-120 seconds
Vite: ~10-30 seconds
```

## 📁 Project Structure

```
todo-shopping-list/
├── backend/                 # Express + MongoDB backend
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   └── todoController.js
│   │   ├── models/
│   │   │   └── Todo.js
│   │   ├── routes/
│   │   │   └── todoRoutes.js
│   │   └── index.js
│   ├── .env
│   └── package.json
├── frontend/                # Vite + React frontend
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoForm.jsx
│   │   │   ├── TodoItem.jsx
│   │   │   ├── TodoList.jsx
│   │   │   ├── FilterControls.jsx
│   │   │   ├── FilterButton.jsx
│   │   │   ├── TodoStats.jsx
│   │   │   ├── ErrorMessage.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── hooks/
│   │   │   ├── useTodos.js
│   │   │   └── usePrevious.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── constants/
│   │   │   └── filters.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── vite.config.js
│   ├── .eslintrc.cjs
│   ├── index.html
│   └── package.json
└── README.md
```

## 🛠 Complete Setup Instructions

### Prerequisites
- **Node.js 18+** (Vite requires Node 18+)
- **MongoDB** (local or Atlas)
- **npm** or **yarn**

### 🗄️ Backend Setup (Express + MongoDB)

1. **Create and setup backend:**
   ```bash
   mkdir todo-shopping-app
   cd todo-shopping-app
   mkdir backend
   cd backend
   ```

2. **Initialize project:**
   ```bash
   npm init -y
   ```

3. **Install dependencies:**
   ```bash
   npm install express mongoose cors helmet dotenv express-rate-limit
   npm install -D nodemon
   ```

4. **Update package.json:**
   ```json
   {
     "name": "todo-shopping-backend",
     "version": "2.0.0",
     "type": "module",
     "scripts": {
       "dev": "nodemon src/index.js",
       "start": "node src/index.js"
     }
   }
   ```

5. **Create backend files** using the provided backend code

6. **Create `.env` file:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/todoapp
   PORT=3001
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

7. **Start backend:**
   ```bash
   npm run dev
   ```

### ⚛️ Frontend Setup (Vite + React)

1. **Create Vite React app:**
   ```bash
   cd .. # Go back to root directory
   npm create vite@latest frontend -- --template react
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Replace default files** with the improved Vite + React code provided

4. **Create `.env` file:**
   ```env
   VITE_API_URL=http://localhost:3001/api
   ```

5. **Start frontend:**
   ```bash
   npm run dev
   ```

## 🔧 Vite Configuration Features

### **vite.config.js**
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,        // Auto-open browser
    cors: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,   // Generate source maps
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // Separate vendor bundle
        },
      },
    },
  },
})
```

## 🚀 Development Workflow

### **Start Development Servers:**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

### **Build for Production:**
```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run build
npm run preview  # Preview production build
```

## 🎯 Modern Features Used

### **Vite-Specific Features:**
- **ES Modules**: Native ES module support during development
- **Hot Module Replacement**: Instant updates without page refresh
- **Environment Variables**: `import.meta.env.VITE_API_URL`
- **Fast Builds**: Rollup-based production builds
- **Plugin System**: Extensible with plugins

### **React 18 Features:**
- **Automatic Batching**: Better performance for state updates
- **Strict Mode**: Development-time checks
- **createRoot**: New root API
- **Modern Hooks**: useState, useEffect, useCallback, useMemo

### **Modern JavaScript:**
- **ES Modules**: `import/export` syntax
- **Optional Chaining**: `object?.property`
- **Nullish Coalescing**: `value ?? fallback`
- **Template Literals**: String interpolation
- **Destructuring**: Clean object/array extraction

## 📊 Performance Benefits

### **Development Mode:**
```bash
# Vite development server
Startup time: ~1-3 seconds
Hot reload: ~50-200ms
Bundle size: No bundling in dev (native ESM)

# Create React App (comparison)
Startup time: ~15-30 seconds  
Hot reload: ~2-5 seconds
Bundle size: Full webpack bundle
```

### **Production Build:**
```bash
# Vite production build
Build time: ~10-30 seconds
Bundle size: Optimized with tree-shaking
Chunks: Automatic code splitting

# Output example:
dist/assets/index-a1b2c3d4.js    120kb
dist/assets/vendor-e5f6g7h8.js   45kb
dist/assets/index-i9j0k1l2.css   12kb
```

## 🧪 Testing the Application

### **Backend API Testing:**
```bash
# Health check
curl http://localhost:3001/api/health

# Create todo
curl -X POST http://localhost:3001/api/todos \
  -H "Content-Type: application/json" \
  -d '{"name": "Learn Vite"}'

# Get all todos
curl http://localhost:3001/api/todos
```

### **Frontend Testing:**
```bash
# Development
npm run dev

# Production build test
npm run build
npm run preview

# Linting
npm run lint
```

## 🌍 Environment Configuration

### **Development (.env):**
```env
VITE_API_URL=http://localhost:3001/api
```

### **Production (.env.production):**
```env
VITE_API_URL=https://your-production-api.com/api
```

### **Environment Usage:**
```javascript
// Access environment variables
const apiUrl = import.meta.env.VITE_API_URL
const isDev = import.meta.env.DEV
const isProd = import.meta.env.PROD
```

## 🔗 Available Scripts

### **Frontend (Vite):**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### **Backend (Express):**
```bash
npm run dev      # Start with nodemon
npm start        # Start production server
```

## 🚀 Deployment Options

### **Frontend Deployment:**
```bash
# Build static files
npm run build

# Deploy to:
# - Vercel: vercel --prod
# - Netlify: netlify deploy --prod --dir=dist
# - GitHub Pages: gh-pages -d dist
```

### **Backend Deployment:**
```bash
# Deploy to:
# - Heroku: git push heroku main
# - Railway: railway deploy
# - DigitalOcean App Platform
```

## 🛠️ Customization Options

### **Add TypeScript:**
```bash
npm install -D typescript @types/react @types/react-dom
# Rename .jsx files to .tsx
```

### **Add Testing:**
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

### **Add Styling Solutions:**
```bash
# Tailwind CSS
npm install -D tailwindcss postcss autoprefixer

# Styled Components
npm install styled-components

# CSS Modules (built-in with Vite)
# Just name your files: Component.module.css
```

## 🎓 Learning Objectives

This project teaches:

1. **Modern Build Tools**: Vite vs traditional bundlers
2. **React 18 Patterns**: Hooks, modern state management
3. **API Integration**: RESTful services with error handling
4. **Performance Optimization**: Code splitting, lazy loading
5. **Developer Experience**: Fast feedback loops, HMR
6. **Production Deployment**: Build optimization, environment config

## 🤝 Contributing

Feel free to:
- Add more modern features
- Implement TypeScript
- Add testing suites
- Improve performance
- Add new UI components

## 📚 Further Learning

### **Next Steps:**
1. **Add TypeScript** for type safety
2. **Implement React Query** for server state
3. **Add Vitest** for testing
4. **Use Tailwind CSS** for styling
5. **Add PWA features** with Vite PWA plugin
6. **Implement React Router** for navigation

### **Advanced Vite Features:**
- **Plugin Development**: Create custom Vite plugins
- **SSR (Server-Side Rendering)**: Vite SSR capabilities
- **Library Mode**: Build libraries with Vite
- **Monorepo Setup**: Multiple Vite projects

This modernized setup provides a solid foundation for learning and building contemporary web applications with the latest tools and best practices.