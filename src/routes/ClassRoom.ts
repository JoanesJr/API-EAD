import { Router } from "express";
import ClassRoomController from '../controller/ClassRoomController';
import { ClassRoomValidator } from "../middlerares/classRoom";
import {validate} from '../middlerares/handleValidation';
import multer from "multer";
import multerConfig from "../config/multerConfig";

const url = Router();
const classRoomController = new ClassRoomController()

url.route('/')
    .get(classRoomController.getAll)
    .post(validate, multer(multerConfig).single('file') ,classRoomController.create)

url.route('/:id')
    .get(classRoomController.getOneId)
    .put(classRoomController.update)

export default url;