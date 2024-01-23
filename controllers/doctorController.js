const Doctor = require('../models/doctor');
const jwt = require('jsonwebtoken');

const getAllDoctors = async (req, res) => {
    try {
        const { authorization } = req.headers;
        let query = {};

        // Filter by Specialization
        if (req.query.specialization) {
            query.specialization = req.query.specialization;
        }

        // Sort by date
        if (req.query.sort === 'date') {
            query = { ...query, $orderby: { date: -1 } };
        }

        // Search by doctor name
        if (req.query.search) {
            query.name = { $regex: req.query.search, $options: 'i' };
        }

        const doctors = await Doctor.find(query);
        res.json(doctors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
const addDoctor = async (req, res) => {
    try {
        const newDoctor =  new Doctor(req.body);
        await newDoctor.save();
        res.status(201).json({message: 'Doctor added successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
};

const editDoctor = async (req, res) => {
    try {
        const {id} = req.params;
        const updatedDoctor = await Doctor.findByIdAndUpdate(id, req.body, {new : true});
        res.status(201).json({message: 'Doctor updated successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
};

const deleteDoctor = async (req, res) => {
    try {
        const {id} = req.params;
        await Doctor.findByIdAndDelete(id);
        res.json({message: 'Doctor deleted successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
};


module.exports = {getAllDoctors, addDoctor, editDoctor, deleteDoctor};