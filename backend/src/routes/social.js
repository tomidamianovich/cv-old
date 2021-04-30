const { Router } = require('express');
const router = Router();

const {
	getSocial, getSocialByPersonId, createSocial, updateSocial, deleteSocial 
} = require('../controllers/social.controller')

router.route('/')
	.get(getSocial)
	.post(createSocial);
	
router.route('/:id')
	.get(getSocialByPersonId)
	.put(updateSocial)
	.delete(deleteSocial)

module.exports = router;