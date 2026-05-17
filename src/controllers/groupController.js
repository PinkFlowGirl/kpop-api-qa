const groupService = require('../services/groupService');

exports.createGroup = async (req, res) => {
  try {
    const newGroup = await groupService.createGroup(req.body);
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

exports.getAllGroups = async (req, res) => {
  try {
    const groups = await groupService.getAllGroups();
    return res.json({
      ok: true,
      message: "Lista de grupos retornada com sucesso",
      data: groups
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message
    });
  }
};

exports.getGroupById = async (req, res) => {
  try {
    const mongoose = require('mongoose');
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({
        ok: false,
        message: "Grupo não encontrado"
      });
    }
    const group = await groupService.getGroupById(req.params.id);
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
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message
    });
  }
};

exports.updateGroup = async (req, res) => {
  try {
    const updated = await groupService.update(req.params.id, req.body);
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

exports.deleteGroup = async (req, res) => {
  try {
    const deleted = await groupService.remove(req.params.id);
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
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message
    });
  }
};
