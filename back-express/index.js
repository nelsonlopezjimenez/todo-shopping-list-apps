// ========= IMPORTS
import express from "express";
import cors from "cors";
import itemRouter from './routes/routes.js'


// =============== APP DECLARATION
const app = express();
const PORT = 3001;

// ================= PENDING TO EXTRACT OUT


// ============== MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'));

// ============== API ENDPOINTS
app.use('/', itemRouter);

app.get("/", (req, res) => {
//   res.render('index.html');
  res.send("<h1>Hello World</h1>");
});


app.listen(PORT, () => {
  console.log("server running on port:", PORT)
});

