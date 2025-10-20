// import  taskModel  from './taskModel';
import { taskModel } from "../models/taskModel.js";

// ================ ROUTES OR API END POINTS

const listTask = async (req, res) => {
  try {
    const itemsArr = await taskModel.find();
    await res.json(itemsArr);
  } catch (error) {
    console.log(error);
  }
};

const addTask = async (req, res) => {
  let item = new taskModel(req.body);
  try {
    await item.save();
    return res.status(200).json({ mess: "success adding new task" });
  } catch (error) {
    console.log(error);
  }
};

const getOne = async (req, res) => {
  // itemById(req, res, next, req.params.id);
  try {
    let item = await taskModel.findById(req.params.taskId);
    if (!item) return res.status(400).json({ error: "item not found" });
    await res.json(item);
    //   res.json(item); // ================ not sure what it is doing
  } catch (error) {
    console.log(error);
  }
};

const deleteOne = async (req, res) => {
  try {
    let item = await taskModel.findByIdAndDelete(req.params.taskId);
    res.json(item);
  } catch (error) {
    console.log(error);
  }
};

const editOne = async (req, res) => {
  try {
    let item = await taskModel.findByIdAndUpdate(req.params.taskId, req.body);
    await res.json(item);
  } catch (error) {
    console.log(error);
  }
};

// Database Seeding
const seedDb11 = async () => {
    const todo1 = new taskModel({
        title: "Feed the cat with the fish"
    });
    const todo2 = new taskModel({
        title: 'Walk the fish',
    });
    await todo1.create();
    await todo2.create();
    console.log('line65 seeding Db')
};

// Alternative: Insert one task at a time
async function seedDb22(task) {
  try {
    const newTask = await taskModel.create(task);
    console.log('Task added:', newTask);
    return newTask;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
}
async function seedDb (){
  await addTasksToDatabase(tasksToAdd);
}
// Function to add multiple tasks to MongoDB
async function addTasksToDatabase (tasks) {
  try {
    // Insert multiple documents
    const result = await taskModel.insertMany(tasks);
    return result;
  } catch (error) {
    console.error('Error adding tasks:', error);
    throw error;
  }
}

// Example usage:
const tasksToAdd = [
  {
    name:  'Review code',
    completed: false
  },
  {
    name: 'Walk the cat',
    completed: false
  },
  {
    name: 'Update documentation',
    completed: false
  },
];
const tasksToAddNewModel = [
  {
    title: 'Complete project proposal',
    description: 'Write and submit the Q4 project proposal',
    status: 'pending',
    dueDate: new Date('2025-11-01')
  },
  {
    title: 'Review code',
    description: 'Review pull requests from team members',
    status: 'in-progress',
    dueDate: new Date('2025-10-25')
  },
  {
    title: 'Update documentation',
    description: 'Update API documentation with new endpoints',
    status: 'pending',
    dueDate: new Date('2025-10-30')
  }
];

// Call the function
// addTasksToDatabase(tasksToAdd)
//   .then(tasks => {
//     console.log('Tasks inserted:', tasks);
//   })
//   .catch(err => {
//     console.error('Failed to insert tasks:', err);
//   });

// Alternative: Insert one task at a time
async function addSingleTask(task) {
  try {
    const newTask = await taskModel.create(task);
    console.log('Task added:', newTask);
    return newTask;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
}

// Alternative: Add tasks with validation
async function addTasksWithValidation(tasks) {
  try {
    // Validate tasks before inserting
    const validTasks = tasks.filter(task => {
      return task.title && task.title.trim().length > 0;
    });

    if (validTasks.length === 0) {
      throw new Error('No valid tasks to insert');
    }

    const result = await taskModel.insertMany(validTasks, {
      ordered: false // Continue inserting even if some fail
    });

    console.log(`${result.length} out of ${tasks.length} tasks added`);
    return result;
  } catch (error) {
    console.error('Error adding tasks:', error);
    throw error;
  }
}

export default {
  listTask,
  addTask,
  getOne,
  deleteOne,
  editOne,
  seedDb,
};
