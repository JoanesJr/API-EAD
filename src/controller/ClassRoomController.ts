import { ClassRoom } from "../entities/ClassRoom";
import { AppDataSource } from "../config/data-source";
import { Request, Response } from "express";
import { Course } from "../entities/Course";
import { Any, createQueryBuilder } from "typeorm";

interface IclassRoom {
    title: string,
    description: string,
    course?: object[],
    fileStorage?: string
}


export default class ClassRoomController {

    public async getAll(req: Request, res:Response) {
        const repository = AppDataSource.getRepository(ClassRoom);
        const data = await repository.find({
            relations: {
                course: true
            }
        })
        res.status(200).send(data);
    }

    public async getOneId(req: Request, res:Response) {
        try{
            const id = req.params.id;
            const repository = AppDataSource.getRepository(ClassRoom);
            const data = await repository.createQueryBuilder('classroom')
                                            .leftJoinAndSelect('classroom.course', 'course')
                                            .where('classroom.id = :id', {id})
                                            .getMany()

            res.status(200).send(data);
        }catch(e: any) {
            res.status(500).json({error: e.message});
        }
        
    }

    public async create(req: Request, res:Response, {title, description, course, fileStorage}: IclassRoom) {
        try {
            const {title, description, course, fileStorage} = req.body;
            const repository = AppDataSource.getRepository(ClassRoom);

                let existclassRoom =  await repository.findOneBy({title});
                if (existclassRoom != null) {
                    return res.status(404).json({error: "Aula já cadastrada."});
                }
            
            const classRoom = new ClassRoom();
            classRoom.title = title;
            classRoom.description = description;
            classRoom.course = course;
            if (fileStorage != null) {
                classRoom.fileStorage = fileStorage;
            }
            
            const data = await repository.save(classRoom);
            res.status(200).send(data);
        }catch(e: any) {
            return res.status(500).json({error: e.message});
        } 
    }

    public async update(req: Request, res: Response, {title, description, course, fileStorage}:IclassRoom) {
        try {
            const id = req.params.id;
            const {title, description, course, fileStorage} = req.body;
            const repository = AppDataSource.getRepository(ClassRoom);

            const existClass = await repository.createQueryBuilder("classroom")
                                                .where("classroom.title = :title", {title})
                                                .andWhere("classroom.id != :id", {id})
                                                .getOne();
            if (existClass != undefined) {
                return res.status(404).json({errors: "Aula já cadastrada."});
            }

            const classRoom = await repository.createQueryBuilder("classroom")
                                        .leftJoinAndSelect("classroom.course", "class_room_course_course")
                                        .where("classroom.id = :id", {id})
                                        .getOne();
            
            classRoom!.title = title;
            classRoom!.description = description;
            classRoom!.course = course;
            if (fileStorage != undefined) {
                classRoom!.fileStorage = fileStorage;
            }
        
            const data = await repository.save(classRoom!);
                            
            res.status(200).send(data);
            

        }catch(e: any) {
            res.status(500).json({error: e.message})
        }
    }
} 