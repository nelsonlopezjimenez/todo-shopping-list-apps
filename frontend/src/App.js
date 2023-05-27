import React, { useState, useRef, useEffect } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";


function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  // ================  NEW 10
  async function fetchTodos() {
    try {
      const list = await fetch("http://localhost:3001/api/todos");
      const data = await list.json();
      // console.log(data)
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTodos().then((data) => {
      setTasks(data);
    });
  }, [props]);

  // ==================== NEW 11

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task._id) {
        // use object spread to make a new obkect
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  async function deleteTodo(id) {
    console.log(`line 60 ${id}`);
    try {
      const result = await fetch("http://localhost:3001/api/todos/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log(result);
      return result.url;
    } catch (error) {
      console.log(error); // error triggered when port number was wrong
    }
  }
  function deleteTask(id) {
    console.log('line 75 ' + id)
    deleteTodo(id).then( (url) => console.log('line 76 ' + url));
    const remainingTasks = tasks.filter((task) => id !== task._id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task._id) {
        //
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task._id}
        name={task.name}
        completed={task.completed}
        key={task._id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  async function addTodo(todo) {
    try {
      const item = await fetch("http://localhost:3001/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      console.log(JSON.stringify(todo));
      const data = await item.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  function addTask(name) {
    const newTask = { name: name, completed: false };
    addTodo(newTask);
    setTasks([...tasks, newTask]);
  }

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <div className="todoapp stack-large">
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;
