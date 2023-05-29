# TODOMATIC REACT TUTORIAL

## version
### 0.1.0 fresh npx create-react-app
### 1.0.0 Beginning our React todo list
### 1.1.0 Componentizing our React app

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
1.
