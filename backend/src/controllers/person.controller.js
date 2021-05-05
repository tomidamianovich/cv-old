const personsCtrl = {};
const Person = require('../models/Person');

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
			res.json({
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
				age: calculateAge(birthdate)
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
	res.json({
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
		res.json({
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
		res.json({ message: err ? 'Error' : 'Person Updated' })
	);
}

personsCtrl.deletePerson = async (req, res) => {
	await Person.findByIdAndDelete(req.params.id);
	res.json({
		message: 'Person Deleted'
	});
}

module.exports = personsCtrl;