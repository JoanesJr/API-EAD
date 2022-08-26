import {Request, Response, Router} from 'express';
import user from './User';
import course from './Course';
import classroom from './ClassRoom'

const url = Router();

url.use('/course', course)
url.use('/user', user);
url.use('/classroom', classroom)


export default url;