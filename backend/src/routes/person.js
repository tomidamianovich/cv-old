const { Router } = require('express');
const router = Router();

const {
	getPerson, createPerson, getPersonById, updatePerson, deletePerson 
} = require('../controllers/person.controller')

router.route('/')
	.get(getPerson)
	.post(createPerson);

router.route('/:id')
	.get(getPersonById)
	.put(updatePerson)
	.delete(deletePerson)

module.exports = router;