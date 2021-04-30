const socialCtrl = {};
const Social = require('../models/Social');

socialCtrl.getSocial = async (req, res) => {
	const social = await Social.find();
	res.json(social);
};

socialCtrl.createSocial = async (req, res) => {
	const { instagram, facebook, telephone, mail, linkedIn, person_id } = req.body;
	const newSocial = new Social({
		instagram,
		facebook,
		telephone,
		mail,
		linkedIn,
		person_id
	})
	await newSocial.save();
	res.json({
		message: 'Social Saved.'
	})
}

socialCtrl.getSocialByPersonId = async (req, res) => {
	const social = await Social.findOne({ person_id:  req.params.id })
	res.json(social);
}

socialCtrl.updateSocial = async (req, res) => {
	const { instagram, facebook, telephone, mail, linkedIn, person_id } = req.body;
	console.log(person_id)
	await Social.findByIdAndUpdate({
		_id: req.params.id	
	}, 
	{
		instagram,
		facebook,
		telephone,
		mail,
		linkedIn,
		person_id
	});
	res.json({
		message: 'Social Updated'
	});
}

socialCtrl.deleteSocial = async (req, res) => {
	await Social.findByIdAndDelete(req.params.id);
	res.json({
		message: 'Social Deleted'
	});
}

module.exports = socialCtrl;