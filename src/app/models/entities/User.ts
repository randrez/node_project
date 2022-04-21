import { Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    Unique, 
    OneToOne, 
    JoinColumn, 
    UpdateDateColumn,
    Index} from "typeorm";
import { Auth } from './Auth';

@Entity({name:'USER_APP'})
export class User {

    @PrimaryGeneratedColumn({name:'ID'})
    public id!: number;

    @Column({name:'FIRSTNAME'})
    public firstName!: string;

    @Column({name:'LASTNAME'})
    public lastName!: string;
    
    @Index({ unique: true })
    @Column({name:'EMAIL'})
    public email!: string;

    @CreateDateColumn({name:'CREATEDAT'})
    public createdAt!: Date;

    @UpdateDateColumn({name:'UPDATEDAT'})
    public updatedAt!: Date;

    @OneToOne(() => Auth, (auth) => auth.user)
    @JoinColumn({name:'AUTH_ID'})
    public auth!: Auth
}