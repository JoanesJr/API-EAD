import { Router } from "express";
import CourseController from '../controller/CourseController';
import { CourseValidator, UpdateCourseValidator } from '../middlerares/courseValidation';
import {validate} from '../middlerares/handleValidation';

const url = Router();
const courseController = new CourseController()

url.route('/')
    .get(courseController.getAll)
    .post(CourseValidator(), validate, courseController.create)
     

url.route('/:id')
    .get(courseController.getOneId)
    .put(UpdateCourseValidator(), validate, courseController.update)
    .delete(courseController.delete)

export default url;