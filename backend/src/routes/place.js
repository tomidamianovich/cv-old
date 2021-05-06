const { Router } = require('express');
const router = Router();

const {
	getPlaces, createPlace, updatePlace, deletePlace
} = require('../controllers/place.controller')

router.route('/')
	.get(getPlaces)
	.post(createPlace);

router.route('/:id')
	.put(updatePlace)
	.delete(deletePlace)

module.exports = router;