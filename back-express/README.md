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

## NOTES
1. To avoid using postman, there is the syntax for curl:
```
curl -X GET http://localhost:3001/api/todos = list/display all records
curl -d "name=nameofitem" -X POST http://localhost:3001/api/todos = create/add new item
curl -d "name=newName&completed=true" -X PUT http://localhost:3001/api/todos/uniqueId
curl -X DELETE http://localhost:3001/api/todos/uniqueId
curl -X GET  http://localhost:3001/api/todos/uniqueId

## Versions
### 1.0.0 : npm init 
### 2.0.0 : one file everything, OK