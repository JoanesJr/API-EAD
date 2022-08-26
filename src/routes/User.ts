import { Router } from "express";
import UserController from "../controller/UserController";
import { UserCreateValidator } from "../middlerares/userValidation";
import {validate} from '../middlerares/handleValidation';

const url = Router();
const userController = new UserController();
url.route('/')
    .post(UserCreateValidator(), validate, userController.create)
    .get(userController.getAll)

url.route('/:id')
    .get(userController.getOneId)
    .delete(userController.delete)
    .put(UserCreateValidator(), validate, userController.update)



export default url;