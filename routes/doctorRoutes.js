const express = require('express');
const DoctorRouter = express.Router();
const verifyToken = require('../middleware/verifytoken');
const { getAllDoctors, addDoctor, editDoctor, deleteDoctor } = require('../controllers/doctorController');

DoctorRouter.get('/',verifyToken, getAllDoctors);
DoctorRouter.post('/add',verifyToken, addDoctor);
DoctorRouter.put('/edit/:id',verifyToken, editDoctor);
DoctorRouter.delete('/delete/:id',verifyToken, deleteDoctor);

module.exports = {DoctorRouter};
