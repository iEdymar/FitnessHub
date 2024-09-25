import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class file {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    title!: string

    @Column('decimal')
    price!: number

    @Column('int')
    stock! = number
}