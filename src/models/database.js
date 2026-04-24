const groups = [];
let currentId = 1;

function getNextId() {
    return currentId++;
}

function resetDatabase() {
    groups.length = 0;
    currentId = 1;
}

module.exports = {
    groups,
    getNextId,
    resetDatabase
}; 