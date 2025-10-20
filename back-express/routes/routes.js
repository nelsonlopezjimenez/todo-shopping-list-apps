import express from 'express';
import itemCtrl from '../controllers/item.controller.js'

const router = express.Router();


router.route('/api/todos')
   .get(itemCtrl.listTask)
   .post(itemCtrl.addTask);

router.route('/api/todos/:taskId')
   .get(itemCtrl.getOne)
   .delete(itemCtrl.deleteOne)
   .put(itemCtrl.editOne);

router.route('/api/populate')
   .get(itemCtrl.seedDb);

export default router;