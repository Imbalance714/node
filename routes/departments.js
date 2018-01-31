const express = require('express');
const router = express.Router();

const DepartmentService = require('../services/DepartmentService');

router.get('/', async (req, res, next) => {
  try {
    let departmentService = new DepartmentService();
    let departments = await departmentService.getAll();
    res.status(200).json(departments);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    let departmentId = parseInt(req.params.id);
    if (isNaN(departmentId)) {
      return res.status(422).json({
        message: 'Incorrect department id'
      });
    }
    let departmentService = new DepartmentService();
    let department = await departmentService.getById(departmentId);

    if (department.length === 0) {
      return res.status(404).json({
        message: 'Department was not found'
      });
    }
    res.status(200).json(department);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    let departmentId = parseInt(req.params.id);
    if (isNaN(departmentId)) {
      return res.status(422).json({
        message: 'Incorrect department id'
      });
    }
    let departmentService = new DepartmentService();
    let department = await departmentService.delete(departmentId);
    if (department.affectedRows === 0) {
      return res.status(404).json({
        message: 'Department was not found'
      });
    }
    res.status(200).json({
      message: 'The department was successfully deleted'
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    let departmentId = parseInt(req.params.id);
    let departmentData = req.body;
    if (isNaN(departmentId)) {
      return res.status(422).json({
        message: 'Incorrect department id'
      });
    }
    if (!departmentData.name) {
      return res.status(422).json({
        message: 'Department name can not be empty'
      });
    }
    let departmentService = new DepartmentService();
    let department = await departmentService.update(departmentId, departmentData);
    if (department.affectedRows === 0) {
      return res.status(404).json({
        message: 'Department was not found'
      });
    }
    res.status(200).json('The department was successfully updated');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    let departmentData = req.body;
    if (!departmentData.name) {
      return res.status(422).json({
        message: 'Department name can not be empty'
      });
    }
      let departmentService = new DepartmentService();
      await departmentService.create(departmentData);
      res.status(201).json({
        message: 'The department was successfully created'
      });
  } catch (err) {
      res.status(500).json(err);
  }
});

module.exports = router;