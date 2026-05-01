const { groups, getNextId } = require('../models/database');

function validateGroup(data) {
  const { name, fandom, debutYear, generation, members } = data;

  if (!name || typeof name !== 'string') {
    throw new Error('name é obrigatório e deve ser string');
  }

  if (!fandom || typeof fandom !== 'string') {
    throw new Error('fandom é obrigatório e deve ser string');
  }

  if (!debutYear || typeof debutYear !== 'number') {
    throw new Error('debutYear deve ser número');
  }

  if (generation && typeof generation !== 'number') {
    throw new Error('generation deve ser número');
  }

  if (members && !Array.isArray(members)) {
    throw new Error('members deve ser um array de strings');
  }
}

function createGroup(data) {
  validateGroup(data);

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