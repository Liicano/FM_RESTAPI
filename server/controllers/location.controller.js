import httpStatus from 'http-status';
import db from '../../config/sequelize';
import "core-js/stable";
import "regenerator-runtime/runtime";

async function listCountries(req, res, next) {
  const countries = await db.sequelize.query("SELECT * FROM countries");
  res.json(countries[0]);
}

async function listRegions(req, res, next) {
  const regions = await db.sequelize.query("SELECT * FROM regions where id_country = " + req.params.country);
  res.json(regions[0]);
}

async function listComunes(req, res, next) {
  const comune = await db.sequelize.query("SELECT * FROM cities where id_region = " + req.params.region + " and id_country = " + req.params.country);
  res.json(comune[0]);
}

export default {
    listCountries,
    listRegions,
    listComunes
};
