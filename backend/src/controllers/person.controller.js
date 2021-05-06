const personsCtrl = {};
const Person = require('../models/Person');
const Experience = require('../models/Experience');
const Place = require('../models/Place');

personsCtrl.getPersonByLanguage = async (req, res) => {
	try {
		const person = await Person.findOne({ language: "lang" in req.params ? req.params.lang : "es" });
		if (!person) {
			res.status(404).json({
				error: 'Person not found'
			})
	 	} else {
			const { _id, language, prefix, name, birthdate, lastname, civilStatus, locationName,
				locationValue, profilePhoto, description } = person
			const experience = await Experience.findOne({"person_id": _id}).sort("-endDate");
			let place
			if (experience) {
				place = await Place.findOne({"_id": experience.place_id})
			}
			res.status(200).json({
				_id,
				language,
				prefix,
				name,
				lastname,
				civilStatus,
				locationName,
				locationValue,
				profilePhoto,
				description,
				age: calculateAge(birthdate),
				...(experience && {
					experience: {
						title: experience.jobTitle,
						...(place && {
							place: place.name
						})
					}
				})
			});
		}
	} catch (err) {
		res.status(500).json({
			error: "Error Found " + err
		})
	}
};

personsCtrl.createPerson = async (req, res) => {
	const person = req.body;
	if (!person) {
		res.status(400).json({
			error: 'Body should be passed in the request.'
		})
	}
	const newPerson = new Person(person)
	await newPerson.save();
	res.status(200).json({
		message: 'Person Created.'
	})
}

const calculateAge = (birthday) => { 
	const ageDifMs = Date.now() - birthday.getTime();
	const ageDate = new Date(ageDifMs);
	return Math.abs(ageDate.getUTCFullYear() - 1970);
}

personsCtrl.getPersonById = async (req, res) => {
	try {
    const person = await Person.findById(req.params.id);
		if (!person) return res.status(404).json({
			error: 'Person not found'
		})
		const {
			name, lastname, birthdate, civilStatus, locationName, locationValue, profilePhoto 
		} = person
		res.status(200).json({
			name,
			lastname,
			age: calculateAge(birthdate),
			civilStatus,
			location: {
				name: locationName,
				value: locationValue,
			},
			profilePhoto
		});
	} catch (err) {
		res.status(500).json({
			error: "Error Found " + err
		})
	}
}

personsCtrl.updatePerson = async (req, res) => {
	try {
		const {
			language,
			prefix,
			name,
			lastname,
			civilStatus,
			birthdate,
			locationName,
			locationValue,
			profilePhoto,
			description
		} = req.body;
		await Person.findByIdAndUpdate({
			_id: req.params.id	
		}, 
		{
			language,
			prefix,
			name,
			lastname,
			civilStatus,
			birthdate,
			locationName,
			locationValue,
			profilePhoto,
			description
		}, (err, result) => 
			res.status(200).json({ message: err ? 'Error' : 'Person Updated' })
		);
	} catch (err) {
		res.status(500).json({
			error: "Error Found " + err
		})
	}
}

personsCtrl.deletePerson = async (req, res) => {
	try {
		await Person.findByIdAndDelete(req.params.id);
		res.status(200).json({
			message: 'Person Deleted'
		});
	} catch (err) {
		res.status(500).json({
			error: "Error Found " + err
		})
	}
}

module.exports = personsCtrl;