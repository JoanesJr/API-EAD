import { Router } from "express";
import CourseController from '../controller/CourseController';
import { CourseValidator, UpdateCourseValidator } from '../middlerares/courseValidation';
import {validate} from '../middlerares/handleValidation';
import multer from "multer";
import multerConfig from "../config/multerConfig";

const url = Router();
const courseController = new CourseController()

url.route('/')
    .get(courseController.getAll)
    .post(validate, multer(multerConfig).single('file'), courseController.create)
     
url.route('/teste').post(multer(multerConfig).single('filename'), courseController.teste)

url.route('/:id')
    .get(courseController.getOneId)
    .put(UpdateCourseValidator(), validate, courseController.update)
    .delete(courseController.delete)

export default url;