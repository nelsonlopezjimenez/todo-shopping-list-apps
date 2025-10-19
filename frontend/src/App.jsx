import { useState, useRef, useEffect } from 'react'
import './App.css'

const hardCodedtasks = [
  { name: 'This is One', completed: true, id: "abc"}
]
function App() {
  const [tasks, setTasks] = useState(hardCodedtasks);

  function addTask (item) {
    const newTask = { name: item, completed: false};
    setTasks([...tasks, newTask])
  }
  const taskList = tasks.map((item) => {
    return (
      <Todo name={item.name} completed={item.completed}/>
    )
  });


  return (
    <>
    <Form />
    <Todo name="This is hardcoded" completed={false}/>
    {taskList}
    </>
  )
  
}
function Todo (props) {
  const [newTodo, setNewTodo] = useState('');

  return (
    <li>
      {props.name}
    </li>
  )
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
