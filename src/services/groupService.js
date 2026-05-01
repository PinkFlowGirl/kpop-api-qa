const { groups, getNextId } = require('../models/database');

function validateGroup(data) {
  const { name, fandom, debutYear, generation, members } = data;

  if (!name || typeof name !== 'string' || !name.trim()) {
    throw new Error('O campo "name" é obrigatório e deve ser uma string não vazia');
  }

  if (!fandom || typeof fandom !== 'string' || !fandom.trim()) {
    throw new Error('O campo "fandom" é obrigatório e deve ser uma string não vazia');
  }

  if (typeof debutYear !== 'number') {
    throw new Error('O campo "debutYear" é obrigatório e deve ser um número');
  }

  if (generation !== undefined && typeof generation !== 'number') {
    throw new Error('O campo "generation" deve ser um número');
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

function createGroup(data) {
  validateGroup(data);

  // Valida se já existe um grupo com esse nome
  const existingGroup = groups.find(g => g.name.toLowerCase() === data.name.toLowerCase());
  if (existingGroup) {
    throw new Error(`Um grupo com o nome "${data.name}" já existe`);
  }

  const newGroup = {
    id: getNextId(),
    name: data.name,
    fandom: data.fandom,
    debutYear: data.debutYear,
    generation: data.generation || null,
    members: data.members || []
  };

  groups.push(newGroup);
  return newGroup;
}

function getAllGroups() {
  return groups;
}

function getGroupById(id) {
  return groups.find(g => g.id === Number(id));
}

function update(id, data) {
  const group = getGroupById(id);
  if (!group) return null;

  // valida só os campos enviados
  validateGroup({ ...group, ...data });

  Object.assign(group, data);

  return group;
}

function remove(id) {
  const index = groups.findIndex(g => g.id === Number(id));
  if (index === -1) return null;

  const removed = groups[index];
  groups.splice(index, 1);

  return removed;
}

module.exports = {
  createGroup,
  getAllGroups,
  getGroupById,
  update,
  remove
};