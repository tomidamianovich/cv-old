const { Router } = require('express');
const router = Router();

const {
	getEducation, createEducation, getEducationByPersonId, updateEducation, deleteEducation
} = require('../controllers/education.controller')

router.route('/')
	.get(getEducation)
	.post(createEducation);

router.route('/:id')
	.get(getEducationByPersonId)
	.put(updateEducation)
	.delete(deleteEducation)

module.exports = router;