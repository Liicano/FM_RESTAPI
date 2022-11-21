import express from 'express';
import { validate } from 'express-validation';
import paramValidation from '../../config/param-validation';
import userCtrl from '../controllers/user.controller';
const isLoggedIn = require("../middlewares/auth.middleware");

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .get(isLoggedIn, userCtrl.list)
  .post(validate(paramValidation.createUser), userCtrl.create);

router.route('/:userId').get(userCtrl.get)
  .put(validate(paramValidation.updateUser), userCtrl.update)
  .delete(userCtrl.remove);

router.route('/type/:type')
.get(userCtrl.getByType);

router.route('/search/:service/:country/:region/:city')
.get(userCtrl.getBySearch);

router.route('/profession/:id')
.get(userCtrl.getByProfessions);

router.param('userId', userCtrl.load);

export default router;
