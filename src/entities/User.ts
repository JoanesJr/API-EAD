import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()

export class User {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    firstName: string
    @Column()
    lastName: string
    @Column()
    password: string
    @Column({
        nullable: true
    })
    fileStorage?: string
   @Column({ type: 'date' })
    birth: number

    @Column()
    email: string

    @CreateDateColumn({ 
        type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" 
    })
    public created_at: Date;

    @UpdateDateColumn({ 
        type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" 
    })
    public updated_at: Date;
}