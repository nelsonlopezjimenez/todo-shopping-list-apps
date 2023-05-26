// ========= IMPORTS
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';

// =============== APP DECLARATION
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(cookieParser());
app.use(helmet());

// ========== MONGO SETUP
mongoose.Promise = global.Promise 
mongoose.connect('mongodb://localhost/todomatic', {})
    .then( () => console.log("conected to mongo port 27017"));

const Schema = mongoose.Schema;
const task = new Schema({
    name: String,
    completed: Boolean
});
const taskModel = mongoose.model("Todo", task);

// ================ ROUTES OR API END POINTS
app.get('/api/todos', async (req, res) => {
    try {
        const list = await taskModel.find();
        // const data = await res.json(list);
        await res.json(list);
    } catch (error) {
        console.log(error);
    }
});
app.post('/api/todos', async (req, res) => {
    let user = new taskModel(req.body);
    try {
        await user.save();
        return res.status(200).json({ mess:"success adding task" })
    } catch (error) {
        console.log(error);
    }
});
app.get('/api/todos/:id', async (req, res, next) => {
    try {
        let item = await taskModel.findById(req.params.id);
        await res.json(item)
    } catch (error) {
        console.log(error);
    }
});
app.delete('/api/todos/:id', async (req, res) => {
    try {
        let item = await taskModel.findByIdAndDelete(req.params.id);
        res.json(item);
    } catch (error) {
        console.log(error)
    }
})
app.put('/api/todos/:id', async (req, res) => {
    try {
        let item = await taskModel.findByIdAndUpdate(req.params.id, req.body);
        await res.json(item);
    } catch (error) {
        console.log(error);
    }
})

//============ DEFINING THE MODEL
app.get('/', (req, res) => {
    res.send("Hello World!!!")
});

app.listen(3001);