const groupService = require('../services/groupService');

function createGroup(req, res) {
  try {
    const group = groupService.createGroup(req.body);
    res.status(201).json(group);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

function getAllGroups(req, res) {
  try {
    const groups = groupService.getAllGroups();
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createGroup, getAllGroups };