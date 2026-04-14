import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'tags'})

export class TagsEntity{
    @PrimaryGeneratedColumn('increment')
    id!: number

    @Column()
    name!: string
}