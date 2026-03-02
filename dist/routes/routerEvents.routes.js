import { Router } from 'express';
import { RouterEvent } from '../entities/RouterEvent.js';
import { dataSource } from '../config/database.js';
const router = Router();
router.get('/router-event', async (req, res) => {
    try {
        const repo = dataSource.getRepository(RouterEvent);
        const events = await repo.find({ order: { timestamp: 'DESC' } });
        res.json(events);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch router events' });
    }
});
export default router;
