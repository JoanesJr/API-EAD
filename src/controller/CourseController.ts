import { Course } from "../entities/Course";
import { AppDataSource } from "../config/data-source";
import {Request, Response} from 'express'

interface ICourse {
    name: string,
    description: string,
    filename: string
}

export default class CourseController {

    public async getAll(req: Request, res:Response) {
        try {
            const courseRepository = AppDataSource.getRepository(Course);
            const courses = await courseRepository.find();
            res.status(200).json(courses);
        }catch(e:any) {
            res.status(500).json({error: e.message})
        }
    }

    public async getOneId(req:Request, res:Response) {
        try {
            const id = req.params.id;
            const courseRepository = AppDataSource.getRepository(Course);
            const course = await courseRepository.findOneBy({id});
            res.status(200).json(course);
        }catch(e: any) {
            res.status(500).json({error: e.message})
        }
    }

    public async create(req: Request, res:Response, {name, description, filename}: ICourse) {
        try {
            const {name, description, filename} = req.body;
            const courseRepository = AppDataSource.getRepository(Course);
            const imgName = req.file?.filename;

            const existCourse = await courseRepository.findOneBy({name});
            if (existCourse != null) {
                return res.status(404).json({error: "O Curso já existe."});
            }

            const course = new Course();
            course.name = name;
            course.description = description;
            course.filename = imgName;
            
            const data = await courseRepository.save(course);
            res.status(200).send(data);
        }catch(e: any) {
            return res.status(500).json({error: e.message});
        } 
    }

    public async update(req: Request, res:Response, { name, description, filename}:ICourse) {
        try {
            const {name, description, filename} = req.body;
            const id = req.params.id;
            const courseRepository = AppDataSource.getRepository(Course);
            const existCourse = await courseRepository.createQueryBuilder("course").where("course.name = :name", {name})
            .andWhere("course.id != :id", {id}).getOne();

            if (existCourse != null) {
                return res.status(404).json({error: "Já existe um curso com este nome."});
            }

            const courseUpdate = await courseRepository.findOneBy({id});
            if (name != undefined) {
                courseUpdate!.name = name;
            }
            if (description != undefined) {
                courseUpdate!.description = description;
            }
            if (filename != undefined) {
                courseUpdate!.filename = filename;
            }
            
            const data = await courseRepository.save(courseUpdate);
            res.status(200).send(data)
        }catch(e:any) {
            res.status(500).json({error: e.message});
        } 
    }

    public async delete(req: Request, res:Response) {
        try {
            const id: number = parseInt(req.params.id);

            const courseRepository = AppDataSource.getRepository(Course);

            const course = await courseRepository.findOneBy({id});

            if (course != null) {
                await courseRepository.remove(course);
                return res.status(200).send("Curso removido com sucesso.")
            }

            res.status(200).send("Curso inexistente");

            
        }catch(e:any) {
            res.status(500).json({error: e.message});
        }      
    }

    public async teste(req: Request, res:Response) {
        console.log(req.file)
        res.status(200).send('deu bom meu parceiro.')
    }
}