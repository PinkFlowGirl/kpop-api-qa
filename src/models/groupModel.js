class Group {
  constructor({ id, name, fandom, debutYear, generation, members }) {
    this.id = id;
    this.name = name;
    this.fandom = fandom;
    this.debutYear = debutYear;
    this.generation = generation || null;
    this.members = members || [];
  }
}

module.exports = Group;