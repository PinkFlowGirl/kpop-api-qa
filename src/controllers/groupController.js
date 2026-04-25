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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = groupService.getAllGroups(page, limit);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function getGroupById(req, res) {
  try {
    const group = groupService.getGroupById(req.params.id);

    if (!group) {
      return res.status(404).json({ error: "Grupo não encontrado" });
    }

    return res.status(200).json(group);

  } catch (error) {
    return res.status(500).json({ error: 'Erro interno' });
  }
}

module.exports = {
  createGroup,
  getAllGroups,
  getGroupById
};