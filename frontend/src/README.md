# TODOMATIC REACT TUTORIAL

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
