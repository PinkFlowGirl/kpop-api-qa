const { groups, getNextId } = require('../models/database');

function createGroup(data) {
  const { name, fandom, debutYear } = data;

  if (!name || !fandom || !debutYear) {
    throw new Error("Dados obrigatórios");
  }

  const newGroup = {
    id: getNextId(),
    name,
    fandom,
    debutYear
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

  if (data.name) group.name = data.name;
  if (data.fandom) group.fandom = data.fandom;
  if (data.debutYear) group.debutYear = data.debutYear;

  return group;
}

function remove(id) {
  const index = groups.findIndex(g => g.id === Number(id));
  if (index === -1) return null;

  return groups.splice(index, 1);
}

module.exports = {
  createGroup,
  getAllGroups,
  getGroupById,
  update,
  remove
};