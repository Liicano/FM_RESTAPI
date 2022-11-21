import express from 'express';
import locationController from '../controllers/location.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/countries')
  .get(locationController.listCountries)


  router.route('/regions/:country')
    .get(locationController.listRegions)

  router.route('/comunes/:region/:country')
    .get(locationController.listComunes)

export default router;
