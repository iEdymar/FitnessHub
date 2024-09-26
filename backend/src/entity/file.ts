import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class File {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column('decimal')
    price!: number;

    @Column('blob')
    content!: Buffer;
}
