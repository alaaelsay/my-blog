import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity({name: 'users'})
export class UserEntity{
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({default: ''})
    username!: string

    @Column({default: ''})
    email!: string

    @Column({default: ''})
    bio!: string

    @Column({default: ''})
    image!: string

    @Column({default: ''})
    password?: string

    @BeforeInsert()
    @BeforeUpdate()
    async hashedPassword(){
        if(this.password){
            const salt = await bcrypt.genSalt(10)
            this.password= await bcrypt.hash(this.password, salt)
        }
    }

}