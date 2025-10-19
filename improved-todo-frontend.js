// package.json for frontend
{
  "name": "todo-shopping-frontend",
  "version": "2.0.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^6.4.6",
    "@testing-library/react": "^16.0.0",
    "@testing-library/user-event": "^14.5.2",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}

// ========== src/services/api.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Get all todos
  async getTodos() {
    return this.request('/todos');
  }

  // Create new todo
  async createTodo(todoData) {
    return this.request('/todos', {
      method: 'POST',
      body: JSON.stringify(todoData),
    });
  }

  // Update todo
  async updateTodo(id, updates) {
    return this.request(`/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  // Delete todo
  async deleteTodo(id) {
    return this.request(`/todos/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();

// ========== src/hooks/useTodos.js
import { useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/api';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch todos from API
  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getTodos();
      setTodos(data);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch todos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Add new todo
  const addTodo = useCallback(async (name) => {
    if (!name?.trim()) return;

    try {
      const response = await apiService.createTodo({ name: name.trim() });
      setTodos(prev => [response.todo, ...prev]);
      return response.todo;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Update todo
  const updateTodo = useCallback(async (id, updates) => {
    try {
      const response = await apiService.updateTodo(id, updates);
      setTodos(prev => 
        prev.map(todo => 
          todo._id === id ? response.todo : todo
        )
      );
      return response.todo;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Delete todo
  const deleteTodo = useCallback(async (id) => {
    try {
      await apiService.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo._id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Toggle completion status
  const toggleTodo = useCallback(async (id) => {
    const todo = todos.find(t => t._id === id);
    if (!todo) return;

    try {
      await updateTodo(id, { completed: !todo.completed });
    } catch (err) {
      console.error('Failed to toggle todo:', err);
    }
  }, [todos, updateTodo]);

  // Edit todo name
  const editTodo = useCallback(async (id, newName) => {
    if (!newName?.trim()) return;

    try {
      await updateTodo(id, { name: newName.trim() });
    } catch (err) {
      console.error('Failed to edit todo:', err);
    }
  }, [updateTodo]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return {
    todos,
    loading,
    error,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
    refetch: fetchTodos
  };
};

// ========== src/hooks/usePrevious.js
import { useRef, useEffect } from 'react';

export const usePrevious = (value) => {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  });
  
  return ref.current;
};

// ========== src/constants/filters.js
export const FILTER_TYPES = {
  ALL: 'All',
  ACTIVE: 'Active',
  COMPLETED: 'Completed'
};

export const FILTER_FUNCTIONS = {
  [FILTER_TYPES.ALL]: () => true,
  [FILTER_TYPES.ACTIVE]: (todo) => !todo.completed,
  [FILTER_TYPES.COMPLETED]: (todo) => todo.completed,
};

export const FILTER_NAMES = Object.values(FILTER_TYPES);

// ========== src/components/TodoForm.js
import React, { useState } from 'react';

const TodoForm = ({ onAddTodo }) => {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await onAddTodo(name);
      setName('');
    } catch (error) {
      console.error('Failed to add todo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
        disabled={isSubmitting}
        placeholder="Enter a new task..."
      />
      <button 
        type="submit" 
        className="btn btn__primary btn__lg"
        disabled={!name.trim() || isSubmitting}
      >
        {isSubmitting ? 'Adding...' : 'Add'}
      </button>
    </form>
  );
};

export default TodoForm;

// ========== src/components/FilterButton.js
import React from 'react';

const FilterButton = ({ name, isPressed, onSetFilter }) => {
  return (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={isPressed}
      onClick={() => onSetFilter(name)}
    >
      <span className="visually-hidden">Show </span>
      <span>{name}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
};

export default FilterButton;

// ========== src/components/TodoItem.js
import React, { useState, useEffect, useRef } from 'react';
import { usePrevious } from '../hooks/usePrevious';

const TodoItem = ({ 
  id, 
  name, 
  completed, 
  onToggle, 
  onDelete, 
  onEdit 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);
  const wasEditing = usePrevious(isEditing);

  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newName.trim()) {
      setIsEditing(false);
      return;
    }

    try {
      await onEdit(id, newName);
      setNewName('');
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to edit todo:', error);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDelete(id);
    } catch (error) {
      console.error('Failed to delete todo:', error);
      setIsDeleting(false);
    }
  };

  const handleToggle = () => {
    onToggle(id);
  };

  const handleEditStart = () => {
    setNewName(name);
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setNewName('');
    setIsEditing(false);
  };

  // Focus management
  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current?.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current?.focus();
    }
  }, [wasEditing, isEditing]);

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={`edit-${id}`}>
          New name for {name}
        </label>
        <input
          id={`edit-${id}`}
          className="todo-text"
          type="text"
          value={newName}
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={handleEditCancel}
        >
          Cancel
          <span className="visually-hidden">renaming {name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {name}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={`todo-${id}`}
          type="checkbox"
          checked={completed}
          onChange={handleToggle}
        />
        <label className="todo-label" htmlFor={`todo-${id}`}>
          {name}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={handleEditStart}
          ref={editButtonRef}
          disabled={isDeleting}
        >
          Edit <span className="visually-hidden">{name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
          <span className="visually-hidden">{name}</span>
        </button>
      </div>
    </div>
  );

  return (
    <li className="todo">
      {isEditing ? editingTemplate : viewTemplate}
    </li>
  );
};

export default TodoItem;

// ========== src/components/TodoList.js
import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggle, onDelete, onEdit }) => {
  if (todos.length === 0) {
    return (
      <div className="todo-list-empty">
        <p>No tasks yet. Add one above!</p>
      </div>
    );
  }

  return (
    <ul 
      className="todo-list stack-large stack-exception"
      aria-labelledby="list-heading"
    >
      {todos.map(todo => (
        <TodoItem
          key={todo._id}
          id={todo._id}
          name={todo.name}
          completed={todo.completed}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
};

export default TodoList;

// ========== src/components/FilterControls.js
import React from 'react';
import FilterButton from './FilterButton';
import { FILTER_NAMES } from '../constants/filters';

const FilterControls = ({ currentFilter, onSetFilter }) => {
  return (
    <div className="filters btn-group stack-exception">
      {FILTER_NAMES.map(name => (
        <FilterButton
          key={name}
          name={name}
          isPressed={name === currentFilter}
          onSetFilter={onSetFilter}
        />
      ))}
    </div>
  );
};

export default FilterControls;

// ========== src/components/TodoStats.js
import React, { useRef, useEffect } from 'react';
import { usePrevious } from '../hooks/usePrevious';

const TodoStats = ({ totalCount, activeCount, completedCount }) => {
  const listHeadingRef = useRef(null);
  const prevTotalCount = usePrevious(totalCount);

  const tasksNoun = activeCount !== 1 ? 'tasks' : 'task';
  const headingText = `${activeCount} ${tasksNoun} remaining`;

  // Focus management for accessibility
  useEffect(() => {
    if (prevTotalCount !== undefined && totalCount < prevTotalCount) {
      listHeadingRef.current?.focus();
    }
  }, [totalCount, prevTotalCount]);

  return (
    <div className="todo-stats">
      <h2 
        id="list-heading" 
        tabIndex="-1" 
        ref={listHeadingRef}
      >
        {headingText}
      </h2>
      {totalCount > 0 && (
        <p className="todo-summary">
          {completedCount} of {totalCount} completed
        </p>
      )}
    </div>
  );
};

export default TodoStats;

// ========== src/components/ErrorMessage.js
import React from 'react';

const ErrorMessage = ({ error, onRetry }) => {
  if (!error) return null;

  return (
    <div className="error-message" role="alert">
      <p>⚠️ {error}</p>
      {onRetry && (
        <button 
          onClick={onRetry} 
          className="btn btn__primary"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;

// ========== src/components/LoadingSpinner.js
import React from 'react';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="loading-spinner" aria-live="polite">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
};

export default LoadingSpinner;

// ========== src/App.js
import React, { useState, useMemo } from 'react';
import TodoForm from './components/TodoForm';
import FilterControls from './components/FilterControls';
import TodoList from './components/TodoList';
import TodoStats from './components/TodoStats';
import ErrorMessage from './components/ErrorMessage';
import LoadingSpinner from './components/LoadingSpinner';
import { useTodos } from './hooks/useTodos';
import { FILTER_TYPES, FILTER_FUNCTIONS } from './constants/filters';
import './App.css';

const App = () => {
  const {
    todos,
    loading,
    error,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
    refetch
  } = useTodos();

  const [filter, setFilter] = useState(FILTER_TYPES.ALL);

  // Memoized filtered todos for performance
  const filteredTodos = useMemo(() => {
    return todos.filter(FILTER_FUNCTIONS[filter]);
  }, [todos, filter]);

  // Memoized stats
  const stats = useMemo(() => {
    const totalCount = todos.length;
    const completedCount = todos.filter(todo => todo.completed).length;
    const activeCount = totalCount - completedCount;

    return { totalCount, completedCount, activeCount };
  }, [todos]);

  if (loading && todos.length === 0) {
    return <LoadingSpinner message="Loading your todos..." />;
  }

  return (
    <div className="todoapp stack-large">
      <h1>Todo Shopping List</h1>
      
      <ErrorMessage error={error} onRetry={refetch} />
      
      <TodoForm onAddTodo={addTodo} />
      
      <FilterControls 
        currentFilter={filter} 
        onSetFilter={setFilter} 
      />
      
      <TodoStats {...stats} />
      
      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />
      
      {loading && <LoadingSpinner message="Updating..." />}
    </div>
  );
};

export default App;

// ========== src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ========== .env (example for frontend)
REACT_APP_API_URL=http://localhost:3001/api

// ========== Updated CSS additions for src/App.css
/* Add these styles to your existing App.css */

.error-message {
  background-color: #fee;
  border: 1px solid #fcc;
  border-radius: 4px;
  padding: 1rem;
  margin: 1rem 0;
  color: #c33;
}

.error-message button {
  margin-top: 0.5rem;
}

.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  color: #666;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.todo-list-empty {
  text-align: center;
  padding: 2rem;
  color: #666;
  font-style: italic;
}

.todo-summary {
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.5rem;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
  