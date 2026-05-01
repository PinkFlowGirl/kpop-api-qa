const groupService = require('../services/groupService');

exports.createGroup = (req, res) => {
  try {
    const newGroup = groupService.createGroup(req.body);
    return res.status(201).json(newGroup);
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: error.message
    });
  }
};

exports.getAllGroups = (req, res) => {
  const groups = groupService.getAllGroups();
  return res.json(groups);
};

exports.getGroupById = (req, res) => {
  const group = groupService.getGroupById(req.params.id);

  if (!group) {
    return res.status(404).json({
      ok: false,
      message: "Grupo não encontrado"
    });
  }

  return res.json(group);
};

exports.updateGroup = (req, res) => {
  try {
    const updated = groupService.update(req.params.id, req.body);

    if (!updated) {
      return res.status(404).json({
        ok: false,
        message: "Grupo não encontrado"
      });
    }

    return res.json(updated);
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: error.message
    });
  }
};

exports.deleteGroup = (req, res) => {
  const deleted = groupService.remove(req.params.id);

  if (!deleted) {
    return res.status(404).json({
      ok: false,
      message: "Grupo não encontrado"
    });
  }

  return res.json({
    message: "Grupo removido",
    group: deleted
  });
};