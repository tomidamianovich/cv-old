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
	try {
		const { name, image } = req.body;
		const newPlace = new Place({ name, image })
		await newPlace.save();
		res.status(200).json({
			message: 'Place Created.'
		})
	} catch (err) {
		res.status(500).json({
			error: "Error Found " + err
		})
	}
}

placesCtrl.updatePlace = async (req, res) => {
	try {	
		const {
			name,
			image
		} = req.body;
		await Place.findByIdAndUpdate({
			_id: req.params.id
		}, {
				name,
				image
			}, (err, result) =>
			res.status(200).json({ message: err ? err : 'Place Updated' })
		);
	} catch (err) {
		res.status(500).json({
			error: "Error Found " + err
		})
	}
}

placesCtrl.deletePlace = async (req, res) => {
	try {
		await Place.findByIdAndDelete(req.params.id);
		res.status(200).json({
			message: 'Place Deleted'
		});
	} catch (err) {
		res.status(500).json({
			error: "Error Found " + err
		})
	}
}

module.exports = placesCtrl;