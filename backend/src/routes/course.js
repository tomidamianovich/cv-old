const { Router } = require('express');
const router = Router();

const {
	getCourse, createCourse, getCourseByPersonId, updateCourse, deleteCourse
} = require('../controllers/course.controller')

router.route('/')
	.get(getCourse)
	.post(createCourse);

router.route('/:id')
	.get(getCourseByPersonId)
	.put(updateCourse)
	.delete(deleteCourse)

module.exports = router;