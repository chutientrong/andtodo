import Router from 'express';

const router = Router();
router.get('/test', (req, res) => {
    res.json({
        a: 1,
        b: null,
        c: undefined,
    });
});

export default router;
