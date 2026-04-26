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
  res.json(groupService.getAllGroups());
}

function getGroupById(req, res) {
  const group = groupService.getGroupById(req.params.id);

  if (!group) {
    return res.status(404).json({ error: "Grupo não encontrado" });
  }

  res.json(group);
}

function updateGroup(req, res) {
  const updated = groupService.update(req.params.id, req.body);

  if (!updated) {
    return res.status(404).json({ error: "Grupo não encontrado" });
  }

  res.json(updated);
}

function deleteGroup(req, res) {
  const removed = groupService.remove(req.params.id);

  if (!removed) {
    return res.status(404).json({ error: "Grupo não encontrado" });
  }

  res.status(204).send();
}

module.exports = {
  createGroup,
  getAllGroups,
  getGroupById,
  updateGroup,
  deleteGroup
};