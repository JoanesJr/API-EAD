import { Router } from "express";
import ClassRoomController from '../controller/ClassRoomController';
import { ClassRoomValidator } from "../middlerares/classRoom";
import {validate} from '../middlerares/handleValidation';

const url = Router();
const classRoomController = new ClassRoomController()

url.route('/')
    .get(classRoomController.getAll)
    .post(ClassRoomValidator(), validate, classRoomController.create)

url.route('/:id')
    .get(classRoomController.getOneId)
    .put(classRoomController.update)

export default url;