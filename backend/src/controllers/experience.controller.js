const experienceCtrl = {};
const Experience = require('../models/Experience');
const Place = require('../models/Place');

experienceCtrl.getExperience = async (req, res) => {
	try {
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
		res.status(200).json(experiencesWithPlace);
	} catch (err) {
		res.status(500).json({
			error: "Error Found " + err
		})
	}
};

experienceCtrl.getExperienceByPersonId = async (req, res) => {
	try {
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
		res.status(200).json(experiencesWithPlace);
	} catch (err) {
		res.status(500).json({
			error: "Error Found " + err
		})
	}
}

experienceCtrl.createExperience = async (req, res) => {
	try {
		const experience = req.body;
		const newExperience = new Experience(experience)
		await newExperience.save();
		res.status(200).json({
			message: 'Experience Saved.'
		})
	} catch (err) {
		res.status(500).json({
			error: "Error Found " + err
		})
	}
}

experienceCtrl.updateExperience = async (req, res) => {
	try {
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
			res.status(200).json({ message: err ? 'Error' : 'Experience Updated' })
		);
	} catch (err) {
		res.status(500).json({
			error: "Error Found " + err
		})
	}
}

experienceCtrl.deleteExperience = async (req, res) => {
	try {
		await Experience.findByIdAndDelete(req.params.id);
		res.status(200).json({
			message: 'Experience Deleted'
		});
	} catch (err) {
		res.status(500).json({
			error: "Error Found " + err
		})
	}
}

module.exports = experienceCtrl;