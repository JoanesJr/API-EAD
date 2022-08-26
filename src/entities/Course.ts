import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 254,
    })
    name: string

    @Column()
    description: string

    @Column()
    filename: string

    @CreateDateColumn({ 
        type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" 
    })
    public created_at: Date;

    @UpdateDateColumn({ 
        type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" 
    })
    public updated_at: Date;
    }