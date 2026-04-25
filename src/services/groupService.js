const { groups, getNextId } = require('../models/database');

function createGroup(data) {
  const { name, fandom, debutYear } = data;

  // validações
  if (!name || name.trim() === '') {
    throw new Error('Nome é obrigatório');
  }

  if (!fandom || fandom.trim() === '') {
    throw new Error('Fandom é obrigatório');
  }

  if (debutYear === undefined || isNaN(Number(debutYear))) {
    throw new Error('Ano de debut inválido');
  }
  // duplicidade
  const alreadyExists = groups.find(
    (group) => group.name.toLowerCase() === name.toLowerCase()
  );

  if (alreadyExists) {
    throw new Error('Grupo já cadastrado');
  }

  const newGroup = {
    id: getNextId(),
    name,
    fandom,
    debutYear: Number(debutYear)
  };

  groups.push(newGroup);

  return newGroup;
}

function getAllGroups(page = 1, limit = 10) {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedGroups = groups.slice(startIndex, endIndex);

  return {
    total: groups.length,
    page,
    limit,
    data: paginatedGroups
  };
}

function getGroupById(id) {
  return groups.find(g => g.id === Number(id));
}

module.exports = {
  createGroup,
  getAllGroups,
  getGroupById
};