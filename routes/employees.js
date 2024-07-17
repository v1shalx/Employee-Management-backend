const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// GET all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET employee by ID
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST new employee
router.post('/', async (req, res) => {
  const { name, mobile, email, position, salary } = req.body;
  const newEmployee = new Employee({ name, mobile, email, position, salary });

  try {
    await newEmployee.save();
    res.status(201).json({ message: 'Employee added successfully', employee: newEmployee });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE employee by ID
router.put('/:id', async (req, res) => {
  const { name, mobile, email, position, salary } = req.body;
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, mobile, email, position, salary },
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee updated successfully', employee: updatedEmployee });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE employee by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully', employee: deletedEmployee });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
