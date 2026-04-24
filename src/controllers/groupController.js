const groupService = require('../services/groupService.js');

function createGroup(req, res) {
    try {
        const group = groupService.createGroup(req.body);
        res.status(201).json(group);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
    }

    module.exports = {
        createGroup
    }; 