import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Role } from "./entity/Role"
import { File } from "./entity/File"
import { Order } from "./entity/Order"
import { OrderItem } from "./entity/OrderItem"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "mydatabase.sqlite",
    synchronize: true,
    entities: [User, Role, File, Order, OrderItem]
})