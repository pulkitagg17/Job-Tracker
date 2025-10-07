import { Router } from 'express';
import { getJobs, createJob, updateJob, deleteJob, getAnalytics } from '../controllers/job.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
router.use(authMiddleware);

router.get('/', getJobs);
router.post('/', createJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);
router.get('/analytics', getAnalytics);

export default router;
