import express from 'express';
import userRoutes from './user.route';
import authRoutes from './auth.route';
import professionRoutes from './profession.route';
import locationRoutes from './location.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'));

// mount user routes at /users
router.use('/users', userRoutes);

// mount user routes at /professions
router.use('/professions', professionRoutes);

// mount user routes at /location
router.use('/locations', locationRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

export default router;
