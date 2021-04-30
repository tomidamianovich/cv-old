const personsCtrl = {};
const Person = require('../models/Person');
const Social = require('../models/Social');

personsCtrl.getPersons = async (req, res) => {
	const person = await Person.findOne();
	res.json(person);
};

personsCtrl.createPerson = async (req, res) => {
	const { 
		name,
		lastname,
		civilStatus,
		birthdate,
		locationName,
		locationValue,
  	profilePhoto } = req.body;
	const newPerson = new Person({
		name,
		lastname,
		civilStatus,
		birthdate,
		locationName,
		locationValue,
  	profilePhoto
	})
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

personsCtrl.getPerson = async (req, res) => {
	const person = await Person.findById(req.params.id);
	const social = await Social.findOne({"person_id": req.params.id});
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
		profilePhoto,
		social
	});
}

personsCtrl.updatePerson = async (req, res) => {
	const {
		birthdate } = req.body;
	console.log(birthdate)
	await Social.findByIdAndUpdate({
		_id: req.params.id	
	}, 
	{
		birthdate: "1994-12-26T00:00:00.244Z"
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