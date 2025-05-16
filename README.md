# todo-shopping-list-apps

## tree

```
C:\Users\localepsilon\Documents\2025-APRIL-Q3-PM\todo-shopping-list-apps>tree /f
Folder PATH listing
Volume serial number is AA58-195E
C:.
│   .gitignore
│   LICENSE
│   README.md
│
├───back-express
│   │   .babelrc
│   │   package-lock.json
│   │   package.json
│   │
│   ├───public
│   │       index.html
│   │
│   └───src
│       │   index.js
│       │   README.md
│       │
│       ├───controllers
│       │       item.controller.js
│       │
│       ├───helpers
│       │       dbErrorHandler.js
│       │
│       ├───models
│       │       taskModel.js
│       │
│       └───routes
│               routes.js
│
├───frontend
│   │   .editorconfig
│   │   .gitignore
│   │   .nvmrc
│   │   .prettierrc.json
│   │   CODE_OF_CONDUCT.md
│   │   CONTRIBUTING.md
│   │   LICENSE
│   │   package-lock.json
│   │   package.json
│   │   README.md
│   │   REVIEWING.md
│   │
│   ├───public
│   │       favicon.ico
│   │       index.html
│   │       logo192.png
│   │       logo512.png
│   │       manifest.json
│   │       robots.txt
│   │
│   └───src
│       │   App.css
│       │   App.js
│       │   App.js.num
│       │   index.css
│       │   index.js
│       │
│       └───components
│               FilterButton.js
│               Form.js
│               Todo.js
│
└───numbered
        back-express.txt
        frontend.txt


```

## back-express

### package.json

```js
{
  "name": "back-express-with-mongo",
  "version": "4.4.0",
  "description": "Backend express server with mongo connect",
  "main": "index.js",
  "scripts": {
    "development": "nodemon --exec ./node_modules/.bin/babel-node src/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "express",
    "mongo",
    "babel"
  ],
  "author": "Nelson Lopez",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.22.1",
    "@babel/node": "^7.22.1",
    "@babel/preset-env": "^7.22.2",
    "nodemon": "^2.0.22"
  },
  "dependencies": {
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "helmet": "^7.0.0",
    "marked": "^5.0.3",
    "mongoose": "^7.2.1"
  }
}

```

### code

```js
// ========== /src/index.js
// ========= IMPORTS
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import itemRouter from './routes/routes'
import { marked } from 'marked';

// =============== APP DECLARATION
const app = express();

// ============== MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(helmet());
app.use(express.static('public'));

// ============== API ENDPOINTS
app.use('/', itemRouter);



app.get("/", (req, res) => {
//   res.render('index.html');
  res.send(html);
});

app.listen(3001);
//  ============= ============== ============= ============ ========
// ========== /src/controllers/item.controller.js
// import  taskModel  from './taskModel';
import { taskModel } from "../models/taskModel";

// ================ ROUTES OR API END POINTS

const listTask = async (req, res) => {
  try {
    const itemsArr = await taskModel.find();
    await res.json(itemsArr);
  } catch (error) {
    console.log(error);
  }
};

const addTask = async (req, res) => {
  let item = new taskModel(req.body);
  try {
    await item.save();
    return res.status(200).json({ mess: "success adding new task" });
  } catch (error) {
    console.log(error);
  }
};

const getOne = async (req, res) => {
  // itemById(req, res, next, req.params.id);
  try {
    let item = await taskModel.findById(req.params.taskId);
    if (!item) return res.status(400).json({ error: "item not found" });
    await res.json(item);
    //   res.json(item); // ================ not sure what it is doing
  } catch (error) {
    console.log(error);
  }
};

const deleteOne = async (req, res) => {
  try {
    let item = await taskModel.findByIdAndDelete(req.params.taskId);
    res.json(item);
  } catch (error) {
    console.log(error);
  }
};

const editOne = async (req, res) => {
  try {
    let item = await taskModel.findByIdAndUpdate(req.params.taskId, req.body);
    await res.json(item);
  } catch (error) {
    console.log(error);
  }
};

export default {
  listTask,
  addTask,
  getOne,
  deleteOne,
  editOne,
};


//  ============= ============== ============= ============ ========

// ========== /src/helpers/dbErrorHandler.js
const getError = err => {
    let mess = '';
    if (err.code){
        mess: "something is wrong"
        console.log(err)
    } else {
        console.log("else errors in if (err.code)")
    }
}
export default { getError };

//  ============= ============== ============= ============ ========

// ========== /src/models/taksModel.js
import mongoose from 'mongoose';

// ========== MONGO SETUP
// mongoose.Promise = global.Promise;
mongoose.set('debug', true);
mongoose
  .connect("mongodb://localhost/todomatic", {})
  .then(() => console.log("conected to mongo port 27017"));

//============ DEFINING THE MODEL
const Schema = mongoose.Schema;
const task = new Schema({
  name: String,
  completed: Boolean,
});

// export default mongoose.model("Todo", task);
export const taskModel = mongoose.model("Todo", task);

//  ============= ============== ============= ============ ========

// ========== /src/routes/routes.js
import express from 'express';
import itemCtrl from '../controllers/item.controller'

const router = express.Router();


router.route('/api/todos')
   .get(itemCtrl.listTask)
   .post(itemCtrl.addTask);

router.route('/api/todos/:taskId')
   .get(itemCtrl.getOne)
   .delete(itemCtrl.deleteOne)
   .put(itemCtrl.editOne);

export default router;

```

## frontend

### package.json
```js
{
  "name": "frontend",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
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
```
### Code
```js
// ==================== /frontend/src/App.js
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
        editTodo({...task, completed: !task.completed})
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
    console.log("line 75 " + id);
    deleteTodo(id).then((url) => console.log("line 76 " + url));
    const remainingTasks = tasks.filter((task) => id !== task._id);
    setTasks(remainingTasks);
  }

  async function editTodo(updatedTask) {
    console.log(updatedTask);
    try {
      const result = await fetch("http://localhost:3001/api/todos/" + updatedTask._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask)
      });
      console.log(result.url);
      return result.url;
    } catch (error) {
      console.log(error); // error triggered when port number was wrong
    }
  }

  function editTask(id, newName) {
    let updatedTask;
    const editedTaskList = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task._id) {
        //
        updatedTask = { ...task, name: newName }
        editTodo(updatedTask);
        // return { ...task, name: newName };
        return updatedTask;
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
//================ ================ ================ ============= =
// ================= /frontend/src/components/FilterButton.js
import React from "react";

function FilterButton(props) {
  return (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}
    >
      <span className="visually-hidden">Show </span>
      <span>{props.name}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}

export default FilterButton;
//================== ================== =================
// ================= /frontend/src/components/Form.js
import React, { useState } from "react";

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

export default Form;
//======================== ================== =================

// ================= /frontend/src/components/Todo.js
import React, { useEffect, useRef, useState } from "react";


function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');

  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  const wasEditing = usePrevious(isEditing);

  // =============== NEW
  // console.log(props); // I had problems with id vs _id

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
  function deleteTask(id){
    // alert(id)
    props.deleteTask(id);
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
          ref={editFieldRef}
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
          <input
            id={props.id}
            type="checkbox"
            defaultChecked={props.completed}
            onChange={() => props.toggleTaskCompleted(props.id)}
          />
          <label className="todo-label" htmlFor={props.id}>
            {props.name}
          </label>
        </div>
        <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
          ref={editButtonRef}
          >
            Edit <span className="visually-hidden">{props.name}</span>
          </button>
          <button
            type="button"
            className="btn btn__danger"
            onClick={() => {
              console.log(props.id)
              deleteTask(props.id)}
            }
          >
            Delete <span className="visually-hidden">{props.name}</span>
          </button>
        </div>
    </div>
  );


  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);


  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}
//======================= ================= =================== 

```

## 5.26.2023; 5.29.2023

## TODOMATIC fullstack app ONEFILE VERSION 2.0.0 (pending exact number).

1. branch : express-react-todomatic
1. ONEFILE back-express 2.0.0; from grown up
1. ONEFILE frontend: 3.2.0 from top down, started with full MDN version in main, and from zero in expres-react-app
1. In folder numbered/back-express.txt and numbered/frontend.txt

## DONE

1. cloned todo-react todomatic from mdn.github.io/todo-react using https
1. modified so I followed step-by-step instructions in MDN web site
1. Added an express server to develop fullstack app
1. When I tried so nest a repository inside a new repository using git init the warning was about creating a submodule for the cases when you depend on an external respository in your own repository but you want them to be independent just when updates/upgrades become available.
1. So I am not going to try it. I am to fork the project into my account, try to update with the the code I edited (or merge), add the expres/mongo repository in one folder, and then maybe create the submodule.

git rm --cached todo-react to untrack the todo-react orignal and then to clone my own todo-react-todomatic here

1. done
1. Now the question is to start a todomatic from scratch separately or use the latest version and delete everything and start, as I already did. Problem being that if I decide to sync with mdn.react-todo is not going to work. So keep my forked todomatic in sync and start other project from scractch or add it as a module so they can be independent.
1. I need a good react-todo to test the todo-express. So, I need full react version to work on express, meaning I have to add api actions, which are not going to be merged with mdn original. To solve this, I will keep a mdn original, a todomatic that I am going to modify but never do a pull request since I am not fixing issues, just adding integration with express/mongo server.
1. also, to prepare express from scratch, and to present an alternative of using postman, I need a fully integrated todo-react.
1. Once I start quarter on react, I will create a new todo-react from scratch, and the todo-react-todomatic is just a module, and the new todo-react from scratch will be part of the repository todo-apps project. Which will include different versions of todo list: vanilla javascript, html, jquery and others.

## PLAN

1. Start with express one file everything and go from there.
1. Continue with react one file and go from there.

## STEPS

1. created github repository: todo-shopping-list-apps; public; added .gitignore VisualStudio template; license GNU General Public License v3.0; cloned to my-local-repository, first at get2laptop

# last versions

## todo-shopping-list-app 1.0.0 f67c61b

## BACK-EXPRESS - 4.4.0

## FRONTEND TODOMATIC - 1.0.0
