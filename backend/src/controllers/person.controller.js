const personsCtrl = {};
const Person = require('../models/Person');
const Experience = require('../models/Experience');
const Place = require('../models/Place');

personsCtrl.getPerson = async (req, res) => {
	try {
		const person = await Person.findOne({ language: 'es' });
		if (!person) return res.status(200).json([]) 
		const experience = await Experience.findOne({"person_id": person._id}).sort("-endDate");
		const place = await Place.findOne({"_id": experience.place_id})
		const {
			_id,
			language,
			prefix,
			name,
			birthdate,
			lastname,
			civilStatus,
			locationName,
			locationValue,
			profilePhoto,
			description
		} = person
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
			age: calculateAge(birthdate),
			experience: {
				title: experience.jobTitle,
				place: place.name
			}
		});
	} catch (err) {
		// handle the error safely
		console.log(err+'asdasd')
	}
};

personsCtrl.createPerson = async (req, res) => {
	const person = req.body;
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
		if (!person) return res.json([])
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
		// handle the error safely
		console.log(err)
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