import { useState, useEffect } from 'react'

const URL = "http://localhost:3001/api/todos"

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch todos function
  async function fetchTodos() {
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const data = await response.json();
      // Map MongoDB _id to id for compatibility
      const mappedData = data.map(item => ({
        ...item,
        id: item._id || item.id
      }));
      console.log('Fetched todos:', mappedData);
      return mappedData;
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  }

  // Add todo to database
  async function addTodo(todo) {
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      if (!response.ok) {
        throw new Error('Failed to add todo');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error adding todo:', error);
      throw error;
    }
  }

  // Add task with async handling
  async function addTask(item) {
    const newTask = { name: item, completed: false };
    
    try {
      const savedTask = await addTodo(newTask);
      // Map _id to id for compatibility
      const mappedTask = {
        ...savedTask,
        id: savedTask._id || savedTask.id
      };
      setTasks([...tasks, mappedTask]);
    } catch (error) {
      setError('Failed to add task');
      console.error('Add task error:', error);
    }
  }

  // Delete task - changed != to !==
  function deleteTask(idDel) {
    const afterDel = tasks.filter(item => item.id !== idDel);
    setTasks(afterDel);
  }

  // Edit task
  function editTask(idEd, newName) {
    const editedTaskList = tasks.map(task => {
      if (task.id === idEd) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  // FIXED: useEffect with proper async handling and empty dependency array
  useEffect(() => {
    async function loadTodos() {
      try {
        setLoading(true);
        const data = await fetchTodos();
        setTasks(data || []);
        setError(null);
      } catch (err) {
        setError('Failed to load todos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    loadTodos();
  }, []); // Empty dependency array - runs only once on mount

  const taskList = tasks?.map((item) => {
    return (
      <Todo 
        key={item.id || item._id} 
        name={item.name} 
        completed={item.completed} 
        id={item.id || item._id} 
        deleteTask={deleteTask} 
        editTask={editTask} 
      />
    );
  });

  if (loading) {
    return <div>Loading todos...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  return (
    <>
      <Form addTask={addTask} />
      <div>Total tasks: {tasks.length}</div>
      {tasks.length === 0 ? <p>No tasks yet. Add one above!</p> : <ul>{taskList}</ul>}
    </>
  );
}

function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!newName.trim()) {
      return;
    }
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
          id={props.id}
          className="todo-text"
          type="text"
          value={newName || props.name}
          onChange={handleChange}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
        >
          Edit <span className="visually-hidden">{props.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteTask(props.id)}
        >
          Delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}

function Form(props) {
  const [name, setName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      return;
    }
    props.addTask(name);
    setName("");
  }

  function handleChange(e) {
    setName(e.target.value);
  }

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
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

export default App