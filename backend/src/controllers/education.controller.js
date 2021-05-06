const educationCtrl = {};
const Education = require('../models/Education');
const Place = require('../models/Place');

educationCtrl.getEducation = async (req, res) => {
	try {
		const educations = await Education.find().sort("-endDate");
		let educationsWithPlace = [];
		let place;
		for (const education of educations) {
			place = await Place.findOne({ "_id": education.place_id });
			const { degree, description, startDate, endDate, place_id, person_id, _id } = education
			educationsWithPlace = [...educationsWithPlace, {
				degree,
				description,
				startDate,
				endDate,
				place_id,
				person_id,
				_id,
				...place && {
					place: {
						name: place.name,
						image: place.image
					}
				}
			}]
		}
		res.status(200).json(educationsWithPlace);
	} catch (err) {
		res.status(500).json({
			error: "Error Found " + err
		})
	}
};

educationCtrl.getEducationByPersonId = async (req, res) => {
	try {
		const educations = await Education
			.find({ person_id:  req.params.id })
			.sort("-endDate")
		let educationsWithPlace = [];
		let place;
		for (const education of educations) {
			place = await Place.findOne({ "_id": education.place_id });
			const { degree, description, startDate, endDate, place_id, person_id } = education
			educationsWithPlace = [...educationsWithPlace, {
				degree,
				description,
				startDate,
				endDate,
				place_id,
				person_id,
				...place && {
					place: {
						name: place.name,
						image: place.image
					}
				}
			}]
		}
		res.status(200).json(educationsWithPlace);
	} catch (err) {
		res.status(500).json({
			error: "Error Found " + err
		})
	}
}

educationCtrl.createEducation = async (req, res) => {
	try {
		const { degree, description, startDate, endDate, place_id, person_id } = req.body
		const newEducation = new Education({
			degree,
			description,
			startDate,
			endDate,
			place_id,
			person_id
		})
		await newEducation.save();
		res.status(200).json({
			message: 'Education Saved.'
		})
	} catch (err) {
		res.status(500).json({
			error: "Error Found " + err
		})
	}
}

educationCtrl.updateEducation = async (req, res) => {
	try {	
		const { degree, description, startDate, endDate, place_id, person_id } = req.body
		await Education.findByIdAndUpdate({
			_id: req.params.id
		},
			{
				degree,
				description,
				startDate,
				endDate,
				place_id,
				person_id
			}, (err, result) =>
			res.status(200).json({ message: err ? 'Error' : 'Education Updated' })
		);
	} catch (err) {
		res.status(500).json({
			error: "Error Found " + err
		})
	}
}

educationCtrl.deleteEducation = async (req, res) => {
	try {
		await Education.findByIdAndDelete(req.params.id);
		res.status(200).json({
			message: 'Education Deleted'
		});
	} catch (err) {
		res.status(500).json({
			error: "Error Found " + err
		})
	}
}

module.exports = educationCtrl;