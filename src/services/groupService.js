const { groups, getNextId } = require('../models/database.js');
const Group = require('../models/groupModel.js');

function createGroup(data) {
    const { name, debutDate, company, members, fandom, albuns } = data;

    if (!name || !debutDate || !company) {
        throw new Error('Campos obrigatorios nao informados');
    }

    const newGroup = new Group(
        getNextId(),
        name,
        debutDate,
        company,
        members,
        fandom,
        albuns,
        []

    );

    groups.push(newGroup);
    return newGroup;
}

module.exports = {
    createGroup
};

