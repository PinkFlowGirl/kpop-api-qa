const groupService = require('../services/groupService');

exports.createGroup = (req, res) => {
  try {
    const newGroup = groupService.createGroup(req.body);
    return res.status(201).json({
      ok: true,
      message: "Grupo criado com sucesso",
      data: newGroup
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: error.message
    });
  }
};

exports.getAllGroups = (req, res) => {
  const groups = groupService.getAllGroups();
  return res.json({
    ok: true,
    message: "Lista de grupos retornada com sucesso",
    data: groups
  });
};

exports.getGroupById = (req, res) => {
  const group = groupService.getGroupById(req.params.id);

  if (!group) {
    return res.status(404).json({
      ok: false,
      message: "Grupo não encontrado"
    });
  }

  return res.json({
    ok: true,
    message: "Grupo encontrado com sucesso",
    data: group
  });
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

    return res.json({
      ok: true,
      message: "Grupo atualizado com sucesso",
      data: updated
    });
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
    ok: true,
    message: "Grupo removido com sucesso",
    data: deleted
  });
};