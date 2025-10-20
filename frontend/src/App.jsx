import { useState, useRef, useEffect } from 'react'
import './App.css'

const hardCodedtasks = [
  { name: 'This is One', completed: true, id: "abc" }
]
const URL = "http://localhost:3001/api/todos"

function App() {
  const [tasks, setTasks] = useState([]);

  async function fetchTodos(URL) {
    try {
      const list = await fetch(URL);
      const data = await list.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async function addTodo(todo) {
    try {
      const item = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
    });
    const data = await item.json();
    return data; 
    } catch (error) {
      console.log(error);
    }
  }
  function addTask(item) {
    const m = Math.floor(Math.random() * 9999 + 1000);
    const newTask = { name: item, completed: false, id: 'abc' + m };
    addTodo(newTask);
    setTasks([...tasks, newTask])
  }

  function deleteTask(idDel) {
    const afterDel = tasks.filter(item => item.id != idDel);
    setTasks(afterDel)
  }

  function editTask(idEd, newName) {
    let updatedTask;
    const editedTaskList = tasks.map(task => {
      if (task.id === idEd) {
        updatedTask = { ...task, name: newName }
        return updatedTask;
      }
      return task
    })
    setTasks(editedTaskList)
  }

  const taskList = tasks?.map((item) => {
    return (
      <Todo key={item.id} name={item.name} completed={item.completed} id={item.id} deleteTask={deleteTask} editTask={editTask} />
    )
  });

  useEffect(() => {
    const data = fetchTodos();
    setTasks(data)
  }, [fetchTodos]);

  return (
    <>
      <Form addTask={addTask} />
      <Todo name="This is hardcoded" completed={false} id="cde" />
      {taskList}
    </>
  )
}
function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');

  function handleChange(e) {
    setNewName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
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
          onClick={() => {
            console.log(props.id)
            props.deleteTask(props.id)
          }
          }
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
