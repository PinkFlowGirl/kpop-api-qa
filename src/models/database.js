let currentId = 1;

const initialGroups = [
  {
    id: currentId++,
    name: "BTS",
    fandom: "ARMY",
    debutYear: 2013,
    generation: 3,
    members: ["RM", "Jin", "Suga", "J-Hope", "Jimin", "V", "Jungkook"]
  },
  {
    id: currentId++,
    name: "BLACKPINK",
    fandom: "BLINK",
    debutYear: 2016,
    generation: 3,
    members: ["Jisoo", "Jennie", "Rosé", "Lisa"]
  }
];

let groups = [...initialGroups];

function getNextId() {
  return currentId++;
}

function resetDatabase() {
  currentId = 1;
  groups = initialGroups.map(group => ({ ...group }));
}

module.exports = { 
  groups, 
  getNextId,
  resetDatabase
};