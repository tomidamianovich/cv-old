const { Router } = require('express');
const router = Router();

const {
	getPersonByLanguage, createPerson, getPersonById, updatePerson, deletePerson 
} = require('../controllers/person.controller')

router.route('/')
	.get(getPersonByLanguage)
	.post(createPerson);

router.route('/:id')
	.get(getPersonById)
	.put(updatePerson)
	.delete(deletePerson)

router.route('/language/:lang')
	.get(getPersonByLanguage)

module.exports = router;