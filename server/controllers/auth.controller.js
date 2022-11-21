import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import config from '../../config/config';
import db from '../../config/sequelize';


/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
async function login(req, res, next) {
  const result = await db.sequelize.query(`SELECT id, username, rut, email, password FROM users where email = '${req.body.email}' and password = '${req.body.password}'`);
  let user = result[0] && result[0].length > 0 ? result[0][0] : null;

  if(user != null){

    if (user) { 
      const token = jwt.sign({
        username: user.username,
        id: user.id,
        email: user.email,
        rut: user.rut,
        expiresIn: 36000,
      }, config.jwtSecret);
      return res.json({
        token,
        username: user.username,
      });
    }
  } else{
    return res.json({
      token: null,
      username: null,
    });
  }

  const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
  return next(err);
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json({
    user: req.user,
    num: Math.random() * 100,
  });
}

export default { login, getRandomNumber };
