const socialCtrl = {};
const Social = require('../models/Social');

socialCtrl.getSocial = async (req, res) => {
	try {
		const social = await Social.find();
		res.status(200).json(social);
	} catch (err) {
		res.status(500).json({
			error: "Error Found " + err
		})
	}
};

socialCtrl.createSocial = async (req, res) => {
	try {
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
		res.status(200).json({
			message: 'Social Saved.'
		})
	} catch (err) {
		res.status(500).json({
			error: "Error Found " + err
		})
	}
}

socialCtrl.getSocialByPersonId = async (req, res) => {
	try {
		const social = await Social.findOne({ person_id:  req.params.id })
		res.status(200).json(social ? social : []);
	} catch (err) {
		res.status(500).json({
			error: "Error Found " + err
		})
	}
}

socialCtrl.updateSocial = async (req, res) => {
	try {
		const { instagram, facebook, telephone, mail, linkedIn, person_id } = req.body;
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
		res.status(200).json({
			message: 'Social Updated'
		});
	} catch (err) {
		res.status(500).json({
			error: "Error Found " + err
		})
	}
}

socialCtrl.deleteSocial = async (req, res) => {
	try {
		await Social.findByIdAndDelete({
			id: req.params.id	
		});
		res.status(200).json({
			message: 'Social Deleted'
		});
	} catch (err) {
		res.status(500).json({
			error: "Error Found " + err
		})
	}
}

module.exports = socialCtrl;