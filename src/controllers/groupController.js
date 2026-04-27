let groups = [];
let id = 1;

/**
 * Criar grupo
 */
exports.createGroup = (req, res) => {
  const body = req.body;

  // segurança contra body vazio
  if (!body) {
    return res.status(400).json({
      message: "Body não enviado"
    });
  }

  const { name, debutYear, fandom } = body;

  // validação obrigatória
  if (!name || !debutYear || !fandom) {
    return res.status(400).json({
      message: "name, debutYear e fandom são obrigatórios"
    });
  }

  const newGroup = {
    id: id++,
    name,
    debutYear,
    fandom
  };

  groups.push(newGroup);

  return res.status(201).json(newGroup);
};

/**
 * Listar todos os grupos
 */
exports.getAllGroups = (req, res) => {
  return res.json(groups);
};

/**
 * Buscar grupo por ID
 */
exports.getGroupById = (req, res) => {
  const group = groups.find(g => g.id == req.params.id);

  if (!group) {
    return res.status(404).json({
      message: "Grupo não encontrado"
    });
  }

  return res.json(group);
};

/**
 * Atualizar grupo
 */
exports.updateGroup = (req, res) => {
  const group = groups.find(g => g.id == req.params.id);

  if (!group) {
    return res.status(404).json({
      message: "Grupo não encontrado"
    });
  }

  const { name, debutYear, fandom } = req.body;

  if (name) group.name = name;
  if (debutYear) group.debutYear = debutYear;
  if (fandom) group.fandom = fandom;

  return res.json(group);
};

/**
 * Deletar grupo
 */
exports.deleteGroup = (req, res) => {
  const index = groups.findIndex(g => g.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({
      message: "Grupo não encontrado"
    });
  }

  const deleted = groups.splice(index, 1);

  return res.json({
    message: "Grupo removido",
    group: deleted[0]
  });
};