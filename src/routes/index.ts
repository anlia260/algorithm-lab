'use strict';

import * as express from 'express';
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/1-1', (req, res, next) => {
    res.render('canvas_01_01');
});

router.get('/1-2', (req, res, next) => {
    res.render('canvas_01_02');
});

export default router;