import { useState, useRef, useEffect } from 'react'
import './App.css'

const hardCodedtasks = [
  { name: 'This is One', completed: true, id: "abc"}
]


function App() {
  const [tasks, setTasks] = useState(hardCodedtasks);

  function addTask (item) {
    const m = Math.floor(Math.random() * 9999 + 1000);
    const newTask = { name: item, completed: false, id:'abc'+ m};
    setTasks([...tasks, newTask])
  }

  function deleteTask (idDel) {
    const afterDel = tasks.filter( item => item.id != idDel);
    setTasks(afterDel)
  }

  function editTask (idEd, newName){
    let updatedTask;
    const editedTaskList = tasks.map( task => {
      if (task.id === idEd){
        updatedTask = { ...task, name: newName }
        return updatedTask;
      }
      return task
    })
    setTasks(editedTaskList)
  }

  const taskList = tasks.map((item) => {
    return (
      <Todo key={item.id}  name={item.name} completed={item.completed} id={item.id}  deleteTask={deleteTask} editTask={editTask} />
    )
  });


  return (
    <>
    <Form addTask={addTask} />
    <Todo name="This is hardcoded" completed={false} id="cde" />
    {taskList}
    </>
  )
  
}
function Todo (props) {
  const [newTodo, setNewTodo] = useState('');

  return (
    <li>
      {props.name} 
      <button onClick={() => props.deleteTask(props.id)}>DELETE</button>
      {/* {props.name} <button onClick={() => alert(props.id)}>DELETE</button> */}
      <button onClick={() => props.editTask(props.id, props.name)}>EDIT</button>
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
