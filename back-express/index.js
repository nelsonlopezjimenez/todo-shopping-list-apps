// ========= IMPORTS
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";

// =============== APP DECLARATION
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(helmet());

// ========== MONGO SETUP
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost/todomatic", {})
  .then(() => console.log("conected to mongo port 27017"));

//============ DEFINING THE MODEL
const Schema = mongoose.Schema;
const task = new Schema({
  name: String,
  completed: Boolean,
});
const taskModel = mongoose.model("Todo", task);

// ================ ROUTES OR API END POINTS

const listTask = async (req, res) => {
  try {
    const itemsArr = await taskModel.find();
    await res.json(itemsArr);
  } catch (error) {
    console.log(error);
  }
};
app.get("/api/todos", listTask);

const addTask = async (req, res) => {
  let item = new taskModel(req.body);
  try {
    await item.save();
    return res.status(200).json({ mess: "success adding new task" });
  } catch (error) {
    console.log(error);
  }
};
app.post("/api/todos", addTask);

const getOne = async (req, res) => {
  // itemById(req, res, next, req.params.id);
  try {
    let item = await taskModel.findById(req.params.id);
    if (!item) return res.status(400).json({ error: "item not found" });
    await res.json(item);
    //   res.json(item); // ================ not sure what it is doing
  } catch (error) {
    console.log(error);
  }
};
app.get("/api/todos/:id", getOne);

const deleteOne = async (req, res) => {
  try {
    let item = await taskModel.findByIdAndDelete(req.params.id);
    res.json(item);
  } catch (error) {
    console.log(error);
  }
};
app.delete("/api/todos/:id", deleteOne);

const editOne = async (req, res) => {
  try {
    let item = await taskModel.findByIdAndUpdate(req.params.id, req.body);
    await res.json(item);
  } catch (error) {
    console.log(error);
  }
};
app.put("/api/todos/:id", editOne);

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.listen(3001);
