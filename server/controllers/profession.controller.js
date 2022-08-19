import db from '../../config/sequelize';
import "core-js/stable";
import "regenerator-runtime/runtime";

/**
 * Get professions list.
 */
async function list(req, res, next) {
  const professions = await db.sequelize.query("SELECT * FROM services_categories");
  res.json(professions[0]);
}

export default {
list
};
