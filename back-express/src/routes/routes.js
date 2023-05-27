// import  taskModel  from './taskModel';
import  { taskModel }  from '../models/taskModel';

// ================ ROUTES OR API END POINTS

export const listTask = async (req, res) => {
  try {
    const itemsArr = await taskModel.find();
    await res.json(itemsArr);
  } catch (error) {
    console.log(error);
  }
};

export const addTask = async (req, res) => {
  let item = new taskModel(req.body);
  try {
    await item.save();
    return res.status(200).json({ mess: "success adding new task" });
  } catch (error) {
    console.log(error);
  }
};

export const getOne = async (req, res) => {
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

export const deleteOne = async (req, res) => {
  try {
    let item = await taskModel.findByIdAndDelete(req.params.id);
    res.json(item);
  } catch (error) {
    console.log(error);
  }
};

export const editOne = async (req, res) => {
  try {
    let item = await taskModel.findByIdAndUpdate(req.params.id, req.body);
    await res.json(item);
  } catch (error) {
    console.log(error);
  }
};
