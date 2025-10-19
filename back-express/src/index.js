// ========= IMPORTS
import express from "express";

import cors from "cors";

import itemRouter from './routes/routes'
import { marked } from 'marked';

// =============== APP DECLARATION
const app = express();

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
  res.send(html);
});

app.listen(3001);
