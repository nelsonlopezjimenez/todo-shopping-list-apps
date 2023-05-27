import express from 'express';
import itemCtrl from '../controllers/item.controller'

const router = express.Router();


router.route('/api/todos')
   .get(itemCtrl.listTask)
   .post(itemCtrl.addTask);

router.route('/api/todos/:taskId')
   .get(itemCtrl.getOne)
   .delete(itemCtrl.deleteOne)
   .put(itemCtrl.editOne);

// router.param('taskId', itemCtrl.itemById)

export default router;