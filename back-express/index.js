// ========= IMPORTS
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import * as api from './routes';
import { marked } from 'marked';
// or const { marked } = require('marked');



// =============== APP DECLARATION
const app = express();

const html = marked.parse(
    `
    # Express backend server with mongo

## Reference: Full-Stack React Projects, Second Edition, Shama Hoque, www.packt.com

## Steps

1. See page 58 and beyond for instructions
1. npm init -> generate the package.json file with metadata about your app
1. In order to use ES6+ latest JS features we need Babel modules to convert ES6+ into older versions of JS
1. Babel: npm install @babel/core @babel/node @babel/preset-env nodemon --save-dev
1. edit .babelrc:


    "presets" : 
        "@babel/preset-env"
    


1. Nodemon: to automatically restart the Node server as we update the code during development. 
1. npm install nodemon
1. edit package.json file script:


scripts :
    "development": "nodemon --exec ./node_modules/.bin/babel-node index.js",


1. npm install express cookie-parser helmet cors mongoose
1. helmet: middleware to help secure the app by setting various HTTP headers.
1. cors: middleware to enable cross-origin resource sharing (CORS)
1. lodash: library for manipulation of arrays and objects (page76);

## NOTES
1. To avoid using postman, there is the syntax for curl:

curl -X GET http://localhost:3001/api/todos = list/display all records
curl -d "name=nameofitem" -X POST http://localhost:3001/api/todos = create/add new item
curl -d "name=newName&completed=true" -X PUT http://localhost:3001/api/todos/uniqueId
curl -X DELETE http://localhost:3001/api/todos/uniqueId
curl -X GET  http://localhost:3001/api/todos/uniqueId

## Versions

### 1.0.0 : npm init 
### 2.0.0 : one file everything, OK
### 3.0.0 : one file, 
1. app.get(URL, listTask), 
1. app.post(URL, addTask), 
1. app.get(URL/:id, getOne),
1. app.delete(URL/:id, deleteOne), 
1. app.put(URL/:id, editOne)
    `
);

// ============== MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(helmet());
app.use(express.static('public'));


// ================ ROUTES OR API END POINTS
app.get("/api/todos", api.listTask);

app.post("/api/todos", api.addTask);

app.get("/api/todos/:id", api.getOne);

app.delete("/api/todos/:id", api.deleteOne);

app.put("/api/todos/:id", api.editOne);

app.get("/tmp", (req, res) => {
//   res.render('index.html');
  res.send(html);
});

app.listen(3001);
