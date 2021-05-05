const placesCtrl = {};
const Place = require('../models/Place');

placesCtrl.getPlaces = async (req, res) => {
	try {
		const place = await Place.find();
		res.status(200).json(place);
	} catch (err) {
		res.status(500).json({
			error: "Error Found " + err
		})
	}
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
	const place = await Place.find({ person_id: req.params.person_id })
	res.status(200).json(place);
}

placesCtrl.deletePlace = async (req, res) => {
	await Place.findByIdAndDelete(req.params.id);
	res.json({
		message: 'Place Deleted'
	});
}

module.exports = placesCtrl;