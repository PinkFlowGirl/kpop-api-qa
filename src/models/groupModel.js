class Group {
    constructor(id, name, debutDate, company, members, fandom, albuns) {
        this.id = id;
        this.name = name;
        this.debutDate = debutDate;
        this.company = company;
        this.fandom = fandom;
        this.albuns = albuns || [];
    }
}

module.exports = Group; 