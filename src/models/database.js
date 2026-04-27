let currentId = 1;

const groups = [
  {
    id: currentId++,
    name: "BTS",
    fandom: "ARMY",
    debutYear: 2013
  },
  {
    id: currentId++,
    name: "BLACKPINK",
    fandom: "BLINK",
    debutYear: 2016
  }
];

function getNextId() {
  return currentId++;
}

module.exports = { groups, getNextId };