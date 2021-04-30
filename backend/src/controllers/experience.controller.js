const experienceCtrl = {};
const Experience = require('../models/Experience');
const Place = require('../models/Place');

experienceCtrl.getExperience = async (req, res) => {
	const experiences = await Experience.find().sort("-endDate");
	let experiencesWithPlace = [];
	let place;
	for (const experience of experiences) {
		place = await Place.findOne({ "_id": experience.place_id });
		const { jobTitle, jobDescription, startDate, endDate, id, person_id } = experience
		experiencesWithPlace = [...experiencesWithPlace, {
			id,
			jobTitle,
			jobDescription,
			startDate,
			endDate,
			person_id,
			...place && {
				place: {
					name: place.name,
					image: place.image
				}
			}
		}]
	}
	res.json(experiencesWithPlace);
};

experienceCtrl.getExperienceByPersonId = async (req, res) => {
	const experiences = await Experience
		.find({ person_id:  req.params.id })
		.sort("-endDate")
	let experiencesWithPlace = [];
	let place;
	for (const experience of experiences) {
		place = await Place.findOne({ "_id": experience.place_id });
		const { jobTitle, jobDescription, startDate, endDate, id, person_id } = experience
		experiencesWithPlace = [...experiencesWithPlace, {
			id,
			jobTitle,
			jobDescription,
			startDate,
			endDate,
			person_id,
			...place && {
				place: {
					name: place.name,
					image: place.image
				}
			}
		}]
	}
	res.json(experiencesWithPlace);
}

experienceCtrl.createExperience = async (req, res) => {
	const {
		jobTitle,
		startDate,
		endDate,
		jobDescription,
		place_id } = req.body;
	const newExperience = new Experience({
		jobTitle,
		startDate,
		endDate,
		jobDescription,
		place_id
	})
	await newExperience.save();
	res.json({
		message: 'Experience Saved.'
	})
}

experienceCtrl.updateExperience = async (req, res) => {
	const {
		jobTitle,
		startDate,
		endDate,
		jobDescription,
		place_id,
		person_id
	} = req.body;

	await Experience.findByIdAndUpdate({
		_id: req.params.id
	},
		{
			jobTitle,
			startDate,
			endDate,
			jobDescription,
			place_id,
			person_id
		}, (err, result) =>
		res.json({ message: err ? 'Error' : 'Experience Updated' })
	);
}

experienceCtrl.deleteExperience = async (req, res) => {
	await Experience.findByIdAndDelete(req.params.id);
	res.json({
		message: 'Experience Deleted'
	});
}

module.exports = experienceCtrl;