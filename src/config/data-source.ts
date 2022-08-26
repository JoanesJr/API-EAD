import "reflect-metadata"
import { DataSource } from "typeorm"
import { Course } from "../entities/Course"
import { User } from "../entities/User"
import { ClassRoom } from "../entities/ClassRoom"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Course, User, ClassRoom],
    migrations: [],
    subscribers: [],
})