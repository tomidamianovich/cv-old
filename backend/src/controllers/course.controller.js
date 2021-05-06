const courseCtrl = {};
const Course = require('../models/Course');
const Place = require('../models/Place');

courseCtrl.getCourse = async (req, res) => {
	try {
		const courses = await Course.find().sort("-endDate");
		let coursesWithPlace = [];
		let place;
		for (const course of courses) {
			place = await Place.findOne({ "_id": course.place_id });
			const { name, description, date, id, person_id } = course
			coursesWithPlace = [...coursesWithPlace, {
				id,
				name,
				description,
				date,
				person_id,
				...place && {
					place: {
						name: place.name,
						image: place.image
					}
				}
			}]
		}
		res.status(200).json(coursesWithPlace);
	} catch (err) {
		res.status(500).json({
			error: "Error Found " + err
		})
	}
};

courseCtrl.getCourseByPersonId = async (req, res) => {
	try {
		const courses = await Course
			.find({ person_id:  req.params.id })
			.sort("-endDate")
		let coursesWithPlace = [];
		let place;
		for (const course of courses) {
			place = await Place.findOne({ "_id": course.place_id });
			const { name, description, date } = course
			coursesWithPlace = [...coursesWithPlace, {
				name,
				description,
				date,
				...place && {
					place: {
						name: place.name,
						image: place.image
					}
				}
			}]
		}
		res.status(200).json(coursesWithPlace);
	} catch (err) {
		res.status(500).json({
			error: "Error Found " + err
		})
	}
}

courseCtrl.createCourse = async (req, res) => {
	try {
		const { name, description, date, place_id, person_id } = req.body;
		const newCourse = new Course({
			name,
			description,
			date,
			place_id,
			person_id
		})
		await newCourse.save();
		res.status(200).json({
			message: 'Course Saved.'
		})
	} catch (err) {
		res.status(500).json({
			error: "Error Found " + err
		})
	}
}

courseCtrl.updateCourse = async (req, res) => {
	try {
		const {
			name,
			description,
			date,
			place_id,
			person_id
		} = req.body;
		await Course.findByIdAndUpdate({
			_id: req.params.id
		},
			{
				name,
				description,
				date,
				place_id,
				person_id
			}, (err, result) =>
			res.status(200).json({ message: err ? 'Error' : 'Course Updated' })
		);
	} catch (err) {
		res.status(500).json({
			error: "Error Found " + err
		})
	}
}

courseCtrl.deleteCourse = async (req, res) => {
	try {
		await Course.findByIdAndDelete(req.params.id);
		res.status(200).json({
			message: 'Course Deleted'
		});
	} catch (err) {
		res.status(500).json({
			error: "Error Found " + err
		})
	}
}

module.exports = courseCtrl;