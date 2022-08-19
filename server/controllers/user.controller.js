import httpStatus from 'http-status';
import db from '../../config/sequelize';
import "core-js/stable";
import "regenerator-runtime/runtime";

const { User } = db;

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  User.findOne({ where: { id } })
    .then((user) => {
      if (!user) {
        const e = new Error('User does not exist');
        e.status = httpStatus.NOT_FOUND;
        return next(e);
      }
      req.user = user; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch((e) => next(e));
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  return res.json(req.user);
}

async function getByType(req, res) {
  const users = await db.sequelize.query(`select * from users where user_type = '${req.params.type}'`);
  res.json(users[0]);
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
async function create(req, res, next) {
  const userCreated = await db.sequelize.query(`
  INSERT INTO public.users
  ("name", rut, "password", username, email, "number", created_at, updated_at, is_validated, validation_method, user_type, photo)
  VALUES('${req.body.name}', '${req.body.rut}', '${req.body.password}', '${req.body.username}', '${req.body.email}', '${req.body.number}', now(), now(), false, 'idphoto', '${req.body.usertype}', null)`);

  res.json(userCreated);
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function update(req, res, next) {
  const { user } = req;
  user.username = req.body.username;
  user.mobileNumber = req.body.mobileNumber;

  user.save()
    .then((savedUser) => res.json(savedUser))
    .catch((e) => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
async function list(req, res, next) {
  const users = await db.sequelize.query("SELECT * FROM users");
  res.json(users[0]);
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  const { user } = req;
  const { username } = req.user;
  user.destroy()
    .then(() => res.json(username))
    .catch((e) => next(e));
}

export default {
  load, get, create, update, list, remove, getByType
};
