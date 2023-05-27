import mongoose from 'mongoose';

// ========== MONGO SETUP
// mongoose.Promise = global.Promise;
mongoose.set('debug', true);
mongoose
  .connect("mongodb://localhost/todomatic", {})
  .then(() => console.log("conected to mongo port 27017"));

//============ DEFINING THE MODEL
const Schema = mongoose.Schema;
const task = new Schema({
  name: String,
  completed: Boolean,
});

export const taskModel = mongoose.model("Todo", task);