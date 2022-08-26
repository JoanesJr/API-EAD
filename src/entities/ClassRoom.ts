import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany,
    JoinTable, } from "typeorm";
import { Course } from "./Course";

@Entity()
export class ClassRoom {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 254,
    })
    title: string

    @Column()
    description: string

    @Column({
        nullable: true,
    })
    fileStorage: string

    @CreateDateColumn({ 
        type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" 
    })
    public created_at: Date;

    @UpdateDateColumn({ 
        type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" 
    })
    public updated_at: Date;

    @ManyToMany(() => Course)
    @JoinTable()
    course: Course[]
}