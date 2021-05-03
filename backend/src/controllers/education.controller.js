const educationCtrl = {};
const Education = require('../models/Education');
const Place = require('../models/Place');

educationCtrl.getEducation = async (req, res) => {
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
	res.json(educationsWithPlace);
};

educationCtrl.getEducationByPersonId = async (req, res) => {
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
	res.json(educationsWithPlace);
}

educationCtrl.createEducation = async (req, res) => {
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
	res.json({
		message: 'Education Saved.'
	})
}

educationCtrl.updateEducation = async (req, res) => {
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
		res.json({ message: err ? 'Error' : 'Education Updated' })
	);
}

educationCtrl.deleteEducation = async (req, res) => {
	await Education.findByIdAndDelete(req.params.id);
	res.json({
		message: 'Education Deleted'
	});
}

module.exports = educationCtrl;