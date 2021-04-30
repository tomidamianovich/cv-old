const courseCtrl = {};
const Course = require('../models/Course');
const Place = require('../models/Place');

courseCtrl.getCourse = async (req, res) => {
	const courses = await Course.find().sort("-endDate");
	let coursesWithPlace = [];
	let place;
	for (const course of courses) {
		place = await Place.findOne({ "_id": course.place_id });
		const { name, description, date, id } = course
		coursesWithPlace = [...coursesWithPlace, {
			id,
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
	res.json(coursesWithPlace);
};

courseCtrl.getCourseByPersonId = async (req, res) => {
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
	res.json(coursesWithPlace);
}

courseCtrl.createCourse = async (req, res) => {
	const { name, description, date, place_id, person_id } = req.body;
	const newCourse = new Course({
		name,
		description,
		date,
		place_id,
    person_id
	})
	await newCourse.save();
	res.json({
		message: 'Course Saved.'
	})
}

courseCtrl.updateCourse = async (req, res) => {
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
		res.json({ message: err ? 'Error' : 'Course Updated' })
	);
}

courseCtrl.deleteCourse = async (req, res) => {
	await Course.findByIdAndDelete(req.params.id);
	res.json({
		message: 'Course Deleted'
	});
}

module.exports = courseCtrl;