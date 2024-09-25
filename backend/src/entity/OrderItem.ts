import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Order } from "./Order";
import { file } from "./file";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(() => Order, order => order.items)
    order!: Order

    @ManyToOne(() => file)
    file!: file

    @Column('int')
    quantity!: number

    @Column('decimal')
    price!: number
}