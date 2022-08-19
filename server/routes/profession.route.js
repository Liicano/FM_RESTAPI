import express from 'express';
import professionController from '../controllers/profession.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .get(professionController.list);

export default router;
