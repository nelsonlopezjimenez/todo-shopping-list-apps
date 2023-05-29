# TODOMATIC REACT TUTORIAL

## version
### 0.1.0 fresh npx create-react-app
### 1.0.0 Beginning our React todo list
### 1.1.0 Full app before adding events ONEFILE
### 2.0.0 Events and state added, ONEFILE.
### 2.2.0 Functions addTask, toggle task, delete task ONEFILE
### 2.1.0 Componentizing our React app

## from https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_todo_list_beginning

## Beginning our React todo list

### Our app's user stories
As a user, I can

1. read a list of tasks.
1. add a task using the mouse or keyboard.
1. mark any task as completed, using the mouse or keyboard.
1. delete any task, using the mouse or keyboard.
1. edit any task, using the mouse or keyboard.
1. view a specific subset of tasks: All tasks, only the active task, or only the completed tasks.

We'll tackle these stories one-by-one.

### Pre-project housekeeping 

1. run npx create-react-app and delete some unneeded files. 
```
# Move into the src directory of your project
cd src
# Delete a few files
rm -- App.test.js App.css logo.svg reportWebVitals.js setupTests.js
# Move back up to the root of the project
cd ..
```
### Project starter code
1. src/App.js
1. src/index.css
1. SUMMARY: Now our todo list app actually looks a bit more like a real app!. The problem is: it doesn't actually do anything. We'll start fixing that in the next chapter.

## Componentizing the app
1. Defining our first component
1. Make a <Todo/>
1. Make a unique <Todo />
1. is it completed?
1. Tasks as data.
1. Rendering with iteration
1. Unique keys
1. Componentizing the rest of the app
1. Importing all our components
1. Summary

### Defining our first component
1. mkdir src/components
1. touch src/components/Todo.js
1. Edit src/components/Todo.js file: 
```
import React from 'react';

function Todo() {
    return (

    )
}
export default Todo
```
1. Copy/paste (write all at least once!!!!)
1. Make a unique <Todo name="One" />
1. is it completed? <Todo name="One" completed={true}/>
1. Tasks as data.
1. Rendering with iteration
1. Unique keys <Todo name="One" completed={true} id={todo-0}/>
1. Componentizing the rest of the app NOT DONE!!!
1. Importing all our components NOT DONE!!!!
1. Summary: We've gone into some depth on how to break up the app nicely into components, and render them efficiently. 

## React interactivity: Events and state

1. Handling events
1. Callback props: Things that happen in the <Form/> component will affect the list rendered in <App />. We can't pass data from child to parent. Instead, we can write a function in App that will expect some data from Form as an input, then pass the function to Form as a prop. Once we have the callback prop, we can call it inside the Form to send the right data to App. What results in the click event in the Form, is implemented in the App component. 
```
App(props){
    function addTask(name){
        alert(`About to add ${name}`)
    }
    return(
        <Form addTask={addTask}>
    )
}
Form(props){
    function handleSubmit(e){
        e.preventDefault();
        props.addTask("Say something")
    }
    return(
        <form onSubmit={handleSubmit}>
    )
}
```
1. State and the useState hook: Props come from the parent of a component. The <Form/> will not be inheriting a new name for the task; the <input > element lives directly inside the Form, so Form owns the input. We need to track it using state and be able to change it too. It is not possible to update the props a component receives; only to read them. 
```
function Form(props) {
  const [name, setName] = useState("Use hooks!");  
```
We are setting the initial name value as "Use hooks!"; we are defining a function whose job is to modify name, called setName(); useState() returns these two things.
1. Putting it all together: Adding a task
```
in App(props){ 
    const [tasks, setTasks] = useState(props.tasks);
    return (
        ....
    )
}
1. Detour: counting tasks
1. Completing task
1. Deleting task
1. Deleting task from state and UI
1. Summary: How React deals with events and handles state. How to implement add tasks, delete tasks, and toggles tasks as completed. 
