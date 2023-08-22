import { Router } from 'express';

import addresses from './addresses.route';

const router = Router();

router.use('/addresses', addresses);

export default router;