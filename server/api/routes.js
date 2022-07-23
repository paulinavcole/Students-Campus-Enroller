const router = require('express').Router();
const { models: { Student, Campus } } = require('../db');

// GET /api/students
router.get('/students', async (req, res, next) => {
    try {
        res.send(await Student.findAll());
    }
    catch(ex) {
        next(ex);
    }
});

//GET /api/campuses
router.get('/campuses', async (req, res, next) => {
    try {
        res.send(await Campus.findAll());
    }
    catch(ex) {
        next(ex);
    }
});

//POST /api/students
router.post('/students', async (req, res, next) => {
    try {
        res.status(201).send(await Student.create(req.body));
    }
    catch(ex) {
        next(ex);
    }
});

//POST /api/campuses
router.post('/campuses', async (req, res, next) => {
    try {
        res.status(201).send(await Campus.create(req.body));
    }
    catch(ex) {
        next(ex);
    }
});

//DELETE /api/students/:id
router.delete('/students/:id', async (req, res, next) => {
    try {
        const student = await Student.findByPk(req.params.id);
        await student.destroy();
        res.sendStatus(204);
    }
    catch(ex) {
        next(ex);
    }
});

//DELETE /api/campuses/:id
router.delete('/campuses/:id', async (req, res, next) => {
    try {
        const campus = await Campus.findByPk(req.params.id);
        await campus.destroy();
        res.sendStatus(204);
    }
    catch(ex) {
        next(ex);
    }
});

//PUT /api/students/:id
router.put('/students/:id', async (req, res, next) => {
    try {
        const student = await Student.findByPk(req.params.id);
        res.send(await student.update(req.body));
    }
    catch (ex) {
        next(ex);
    }
});

//PUT /api/campuses/:id
router.put('/campuses/:id', async (req, res, next) => {
    try {
        const campus = await Campus.findByPk(req.params.id);
        res.send(await campus.update(req.body));
    }
    catch (ex) {
        next(ex);
    }
});

module.exports = router;