# Modern Todo Shopping List App

A full-stack todo application built with modern ES6+ JavaScript, React 18, and Express with MongoDB. This project is designed as a teaching tool to demonstrate modern web development best practices.

## 🚀 Features

### Backend (Express + MongoDB)
- **Modern ES6+ syntax** with ES modules
- **RESTful API** with proper HTTP status codes
- **MongoDB integration** with Mongoose ODM
- **Security middleware** (Helmet, CORS, Rate Limiting)
- **Environment-based configuration**
- **Proper error handling** and validation
- **Health check endpoint**

### Frontend (React 18)
- **Modern React patterns** with hooks and functional components
- **Custom hooks** for state management and API calls
- **Separation of concerns** with dedicated service layer
- **Proper error handling** and loading states
- **Accessibility features** (ARIA labels, focus management)
- **Performance optimizations** (useMemo, useCallback)
- **Component composition** and reusability

## 📁 Project Structure

```
todo-shopping-list/
├── backend/
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
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── TodoForm.js
    │   │   ├── TodoItem.js
    │   │   ├── TodoList.js
    │   │   ├── FilterControls.js
    │   │   ├── FilterButton.js
    │   │   ├── TodoStats.js
    │   │   ├── ErrorMessage.js
    │   │   └── LoadingSpinner.js
    │   ├── hooks/
    │   │   ├── useTodos.js
    │   │   └── usePrevious.js
    │   ├── services/
    │   │   └── api.js
    │   ├── constants/
    │   │   └── filters.js
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    ├── .env
    └── package.json
```

## 🛠 Setup Instructions

### Prerequisites
- Node.js 18+ 
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. **Create backend directory and navigate to it:**
   ```bash
   mkdir todo-shopping-backend && cd todo-shopping-backend
   ```

2. **Initialize project and install dependencies:**
   ```bash
   npm init -y
   npm install express mongoose cors helmet dotenv express-rate-limit
   npm install -D nodemon
   ```

3. **Create the file structure** as shown in the backend artifact

4. **Create `.env` file:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/todoapp
   PORT=3001
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

5. **Update package.json** with the provided configuration

6. **Start the backend:**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Create React app:**
   ```bash
   npx create-react-app todo-shopping-frontend
   cd todo-shopping-frontend
   ```

2. **Replace the default files** with the improved versions from the frontend artifact

3. **Create `.env` file:**
   ```env
   REACT_APP_API_URL=http://localhost:3001/api
   ```

4. **Start the frontend:**
   ```bash
   npm start
   ```

### MongoDB Setup

#### Option 1: Local MongoDB
```bash
# Install MongoDB locally and start the service
mongod --dbpath /your/db/path
```

#### Option 2: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a cluster and get connection string
3. Update `MONGODB_URI` in backend `.env` file

## 🎯 Modern ES6+ Features Used

### Backend
- **ES Modules**: `import/export` instead of `require/module.exports`
- **Async/Await**: Modern promise handling
- **Destructuring**: Clean object and array extraction
- **Template Literals**: String interpolation
- **Arrow Functions**: Concise function syntax
- **Default Parameters**: Function parameter defaults
- **Rest/Spread Operators**: Object and array manipulation

### Frontend
- **Functional Components**: Modern React pattern
- **React Hooks**: useState, useEffect, useCallback, useMemo, useRef
- **Custom Hooks**: Reusable stateful logic
- **Optional Chaining**: Safe property access (`?.`)
- **Nullish Coalescing**: Default value assignment (`??`)
- **Modern Array Methods**: map, filter, find with proper immutability

## 📚 Educational Benefits

This project demonstrates:

1. **Clean Architecture**: Separation of concerns between layers
2. **Modern JavaScript**: ES6+ features and best practices
3. **Error Handling**: Proper error boundaries and user feedback
4. **State Management**: Custom hooks and context patterns
5. **API Design**: RESTful endpoints with proper HTTP methods
6. **Security**: Basic security measures and validation
7. **Accessibility**: ARIA labels and keyboard navigation
8. **Performance**: Memoization and optimization techniques

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos |
| POST | `/api/todos` | Create new todo |
| GET | `/api/todos/:id` | Get single todo |
| PUT | `/api/todos/:id` | Update todo |
| DELETE | `/api/todos/:id` | Delete todo |
| GET | `/api/health` | Health check |

## 🧪 Testing the Application

1. **Backend Health Check:**
   ```bash
   curl http://localhost:3001/api/health
   ```

2. **Create a Todo:**
   ```bash
   curl -X POST http://localhost:3001/api/todos \
     -H "Content-Type: application/json" \
     -d '{"name": "Learn React"}'
   ```

3. **Get All Todos:**
   ```bash
   curl http://localhost:3001/api/todos
   ```

## 🚀 Next Steps for Learning

1. **Add Authentication**: JWT tokens, user sessions
2. **Add Validation**: Input validation with libraries like Joi or Yup
3. **Add Testing**: Unit tests with Jest, integration tests
4. **Add TypeScript**: Type safety across the application
5. **Add State Management**: Redux Toolkit or Zustand
6. **Add Styling**: CSS-in-JS solutions like styled-components
7. **Add PWA Features**: Service workers, offline capability
8. **Add Real-time Updates**: WebSockets or Server-Sent Events

## 🤝 Contributing

This is an educational project. Feel free to:
- Add more features for learning
- Improve error handling
- Add more comprehensive validation
- Implement additional modern patterns

## 📝 License

This project is licensed under the GPL-3.0 License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Based on the original todo-shopping-list-apps by Nelson Lopez
- Inspired by MDN's React tutorial
- Modern patterns from React documentation