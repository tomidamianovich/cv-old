const { Router } = require('express');
const router = Router();

const {
	getPlaces, createPlace, getPlaceByPersonId, deletePlace
} = require('../controllers/place.controller')

router.route('/')
	.get(getPlaces)
	.post(createPlace);

router.route('/:id')
	.get(getPlaceByPersonId)
	.delete(deletePlace)

module.exports = router;