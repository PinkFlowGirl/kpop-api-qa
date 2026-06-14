const Group = require('../models/groupModel');

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function validateGroup(data) {
  const { name, fandom, debutYear, generation, members } = data;

  if (!name || typeof name !== 'string' || !name.trim()) {
    throw new Error('O campo "name" é obrigatório e deve ser uma string não vazia');
  }

  if (name.length > 100) {
    throw new Error('O campo "name" deve ter no máximo 100 caracteres');
  }

  if (!fandom || typeof fandom !== 'string' || !fandom.trim()) {
    throw new Error('O campo "fandom" é obrigatório e deve ser uma string não vazia');
  }

  if (typeof debutYear !== 'number') {
    throw new Error('O campo "debutYear" é obrigatório e deve ser um número');
  }

  if (generation !== undefined) {
    if (typeof generation !== 'number' || generation < 0) {
      throw new Error('O campo "generation" deve ser um número positivo');
    }
  }

  if (members !== undefined) {
    if (!Array.isArray(members)) {
      throw new Error('O campo "members" deve ser um array de strings');
    }
    const hasNonStringMember = members.some(
      member => typeof member !== 'string' || !member.trim()
    );
    if (hasNonStringMember) {
      throw new Error('O campo "members" deve conter apenas strings não vazias');
    }
  }
}

async function createGroup(data) {
  validateGroup(data);

 const existingGroup = await Group.findOne({ name: { $regex: new RegExp(`^${escapeRegExp(data.name)}$`, 'i') } });
  if (existingGroup) {
    throw new Error(`Um grupo com o nome "${data.name}" já existe`);
  }

  const newGroup = new Group({
    name: data.name,
    fandom: data.fandom,
    debutYear: data.debutYear,
    generation: data.generation || null,
    members: data.members || []
  });

  return await newGroup.save();
}

async function getAllGroups() {
  return await Group.find();
}

async function getGroupById(id) {
  return await Group.findById(id);
}

async function update(id, data) {
  const group = await getGroupById(id);
  if (!group) return null;

  validateGroup({ ...group.toObject(), ...data });

  return await Group.findByIdAndUpdate(id, data, { new: true });
}

async function remove(id) {
  return await Group.findByIdAndDelete(id);
}

module.exports = {
  createGroup,
  getAllGroups,
  getGroupById,
  update,
  remove
};
