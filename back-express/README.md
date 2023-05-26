# Express backend server with mongo

## Reference: Full-Stack React Projects, Second Edition, Shama Hoque, www.packt.com

## Steps

1. See page 58 and beyond for instructions
1. npm init -> generate the package.json file with metadata about your app
1. In order to use ES6+ latest JS features we need Babel modules to convert ES6+ into older versions of JS
1. Babel: npm install @babel/core @babel/node @babel/preset-env --save-dev
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
    "development" : "nodemon"
}
```
1. npm install express cookie-parser helmet cors
1. helmet: middleware to help secure the app by setting various HTTP headers.
1. cors: middleware to enable cross-origin resource sharing (CORS)
