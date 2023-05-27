// ========= IMPORTS
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import * as api from './routes';

// =============== APP DECLARATION
const app = express();

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

app.get("/", (req, res) => {
  res.render('index.html');
});

app.listen(3001);
