const { Router } = require('express');
const router = Router();

const {
	getPersons, createPerson, getPerson, updatePerson, deletePerson 
} = require('../controllers/person.controller')

router.route('/')
	.get(getPersons)
	.post(createPerson);

router.route('/:id')
	.get(getPerson)
	.put(updatePerson)
	.delete(deletePerson)

module.exports = router;