const skillCtrl = {};
const Skill = require('../models/Skill');
const Place = require('../models/Place');

skillCtrl.getSkill = async (req, res) => {
	const skills = await Skill.find().sort("-endDate");
	let skillsWithPlace = [];
	let place;
	for (const skill of skills) {
		place = await Place.findOne({ "_id": skill.place_id });
		const { name, percentage, id } = skill
		skillsWithPlace = [...skillsWithPlace, {
			id,
			percentage,
      name,
			...place && {
				place: {
					name: place.name,
					image: place.image
				}
			}
		}]
	}
	res.status(200).json(skillsWithPlace);
};

skillCtrl.getSkillByPersonId = async (req, res) => {
	const skills = await Skill
		.find({ person_id:  req.params.id })
		.sort("-endDate")
	let skillsWithPlace = [];
	let place;
	for (const skill of skills) {
		place = await Place.findOne({ "_id": skill.place_id });
		const { name, percentage, id } = skill
		skillsWithPlace = [...skillsWithPlace, {
			id,
			percentage,
      name,
			...place && {
				place: {
					name: place.name,
					image: place.image
				}
			}
		}]
	}
	res.status(200).json(skillsWithPlace);
}

skillCtrl.createSkill = async (req, res) => {
	const { name, percentage, person_id } = req.body;
  const newSkill = new Skill({
		name,
    percentage,
    person_id
	})
	await newSkill.save();
	res.status(200).json({
		message: 'Skill Saved.'
	})
}

skillCtrl.updateSkill = async (req, res) => {
	const {
		name,
    percentage,
    person_id
  } = req.body;
	await Skill.findByIdAndUpdate({
		_id: req.params.id
	},
		{
			name,
      percentage,
      person_id
		}, (err, result) =>
		res.status(200).json({ message: err ? 'Error' : 'Skill Updated' })
	);
}

skillCtrl.deleteSkill = async (req, res) => {
	await Skill.findByIdAndDelete(req.params.id);
	res.status(200).json({
		message: 'Skill Deleted'
	});
}

module.exports = skillCtrl;