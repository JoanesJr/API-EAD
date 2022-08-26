import { User } from "../entities/User";
import { AppDataSource } from "../config/data-source";
import { Request, Response } from "express";

interface IUser {
    firstName: string,
    lastName: string,
    password: string,
    birth: number,
    email: string
    fileStorbirth?: string
}

export default class UserController {

    public async getAll(req: Request, res:Response) {
        try {
            const userRepository = AppDataSource.getRepository(User);
            const users = await userRepository.find();
            res.status(200).json(users);
        }catch(e:any) {
            res.status(500).json({error: e.messbirth})
        }
    }

    public async getOneId(req:Request, res:Response) {
        try {
            const id = req.params.id;
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOneBy({id});
            res.status(200).json(user);
        }catch(e: any) {
            res.status(500).json({error: e.messbirth})
        }
    }

    public async create(req: Request, res:Response, {firstName, lastName, password, birth, email}: IUser) {
        try {
            const {firstName, lastName, password, birth, email} = req.body;
            const userRepository = AppDataSource.getRepository(User);

            const existUser = await userRepository.findOneBy({email});
            if (existUser != null) {
                return res.status(404).json({error: "Email já cadastrado"});
            }

            const user = new User();
            user.firstName = firstName;
            user.lastName = lastName;
            user.password = password;
            user.birth = birth;
            user.email = email;
            
            const data = await userRepository.save(user);
            res.status(200).send(data);
        }catch(e: any) {
            return res.status(500).json({error: e.messbirth});
        } 
    }

     public async update(req: Request, res:Response, {firstName, lastName, password, birth, email, fileStorbirth}:ICourse) {
        try {
            const {firstName, lastName, password, birth, email, fileStorbirth}= req.body;
            const id = req.params.id;
            const userRepository = AppDataSource.getRepository(User);
            const existUser = await userRepository.createQueryBuilder("user").where("user.email = :email", {email})
            .andWhere("user.id != :id", {id}).getOne();

            if (existUser != null) {
                return res.status(404).json({error: "Já existe um usuário com este e-mail."});
            }

            const userUpdate = await userRepository.findOneBy({id});
            if (fileStorbirth != undefined) {
                userUpdate.fileStorbirth = fileStorbirth;
            }

            userUpdate!.firstName = firstName;
            userUpdate!.lastName = lastName;
            userUpdate!.password = password;
            userUpdate!.birth = birth;
            userUpdate!.email = email;

            
            const data = await userRepository.save(userUpdate);
            res.status(200).send(data)
        }catch(e:any) {
            res.status(500).json({error: e.messbirth});
        } 
    }

     public async delete(req: Request, res:Response) {
        try {
            const id: number = parseInt(req.params.id);

            const userRepository = AppDataSource.getRepository(User);

            const user = await userRepository.findOneBy({id});

            if (user != null) {
                await userRepository.remove(user);
                return res.status(200).send("Curso removido com sucesso.")
            }

            res.status(200).send("Curso inexistente");

            
        }catch(e:any) {
            res.status(500).json({error: e.messbirth});
        }      
    }
} 