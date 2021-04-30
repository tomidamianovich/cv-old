const placesCtrl = {};
const Place = require('../models/Place');
const Social = require('../models/Social');

placesCtrl.getPlaces = async (req, res) => {
	const place = await Place.find();
	res.json(place);
};

placesCtrl.createPlace = async (req, res) => {
	const { name, image } = req.body;
	const newPlace = new Place({ name, image })
	await newPlace.save();
	res.json({
		message: 'Place Created.'
	})
}

placesCtrl.getPlaceByPersonId = async (req, res) => {
	const place = await Place.find(place => place.person_id === req.params.person_id)
	res.json(place);
}

placesCtrl.deletePlace = async (req, res) => {
	await Place.findByIdAndDelete(req.params.id);
	res.json({
		message: 'Place Deleted'
	});
}

module.exports = placesCtrl;