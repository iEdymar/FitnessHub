import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Order } from "./Order";
import { File } from "./File";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(() => Order, order => order.items)
    order!: Order

    @ManyToOne(() => File)
    file!: File

    @Column('decimal')
    price!: number
}