import { Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    OneToOne,
    UpdateDateColumn,
    Index} from "typeorm";
import {User} from "./User"

@Entity({name:"AUTH"})
export class Auth {

    @PrimaryGeneratedColumn({name:"ID"})
    public id!: number;
    
    @Index({ unique: true })
    @Column({name:"USERNAME"})
    public username!: string;

    @Column({name:"PASSWORD"})
    public password!: string;

    @CreateDateColumn({name:"CREATEDAT", nullable:true})
    public createdAt!: Date;

    @UpdateDateColumn({name:"DATEUPDATE", nullable:true})
    public dateupdate!: Date;

    @OneToOne(() => User, (user:User) => user.auth)
    public user!:User
}