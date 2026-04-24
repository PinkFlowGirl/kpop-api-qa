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

function getAllGroups() {
  return groups;
}

module.exports = {
  createGroup,
  getAllGroups
};