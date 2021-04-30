const { Router } = require('express');
const router = Router();

const {
	getSkill, createSkill, getSkillByPersonId, updateSkill, deleteSkill
} = require('../controllers/skill.controller')

router.route('/')
	.get(getSkill)
	.post(createSkill);

router.route('/:id')
	.get(getSkillByPersonId)
	.put(updateSkill)
	.delete(deleteSkill)

module.exports = router;