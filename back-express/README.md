# Express backend server with mongo

## Reference: Full-Stack React Projects, Second Edition, Shama Hoque, www.packt.com

## Steps

1. See page 58 and beyond for instructions
1. npm init -> generate the package.json file with metadata about your app
1. In order to use ES6+ latest JS features we need Babel modules to convert ES6+ into older versions of JS
1. Babel: npm install @babel/core @babel/node @babel/preset-env nodemon --save-dev
1. edit .babelrc:
```
{
    "presets" : [
        "@babel/preset-env"
    ]
}
```
1. Nodemon: to automatically restart the Node server as we update the code during development. 
1. npm install nodemon
1. edit package.json file script:
```
...
"scripts" : {
    "development": "nodemon --exec ./node_modules/.bin/babel-node index.js",
}
```
1. npm install express cookie-parser helmet cors mongoose
1. helmet: middleware to help secure the app by setting various HTTP headers.
1. cors: middleware to enable cross-origin resource sharing (CORS)
1. lodash: library for manipulation of arrays and objects (page76);

## NOTES
1. To avoid using postman, there is the syntax for curl:
```
curl -X GET http://localhost:3001/api/todos = list/display all records
curl -d "name=nameofitem" -X POST http://localhost:3001/api/todos = create/add new item
curl -d "name=newName&completed=true" -X PUT http://localhost:3001/api/todos/uniqueId
curl -X DELETE http://localhost:3001/api/todos/uniqueId
curl -X GET  http://localhost:3001/api/todos/uniqueId
```
## Versions

### 1.0.0 : npm init 
### 2.0.0 : one file everything, OK
### 3.0.0 : one file, 
1. app.get(URL, listTask), 
1. app.post(URL, addTask), 
1. app.get(URL/:id, getOne),
1. app.delete(URL/:id, deleteOne), 
1. app.put(URL/:id, editOne)
#### 3.1.0
callback routes extracted to routes.js file. I had to transfer also the mongo setup because of the model. Callback objects imported * as api and accessed as api.listask, api.addTask, api.getOne, api.deleteOne, api.editOne.
#### 3.2.0
Import syntax for api call changed to destructuring option: import { listTask, addTask, getOne, deleteOne, editOne } and used straight in index.js. Also, marked added to the project to be able to render md files. The html obj with the whole code for README.md passed as a string render at the root route '/'. I had to delete the pre code with 3 backticks, as well as curly braces, straight braces, colons. Pending import the code highligter library. 

1. 3.2.1 export from { listTask, addTask, getOne, deleteOne, editOne } to export.listTasks, export.addTask, export.getOne, etc

### 3.3.0
1. 3.3.1 : mongoose setup taken from routes.js to taskModel.js and exported as "export default mongoose.model('Todo', task)" and imported into routes.js as 'import  taskModel  from './taskModel';'
