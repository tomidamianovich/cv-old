const { Router } = require('express');
const router = Router();

const {
	getExperience, createExperience, getExperienceByPersonId, updateExperience, deleteExperience
} = require('../controllers/experience.controller')

router.route('/')
	.get(getExperience)
	.post(createExperience);

router.route('/:id')
	.get(getExperienceByPersonId)
	.put(updateExperience)
	.delete(deleteExperience)

module.exports = router;