import { Router } from "express";
import { AppDataSource } from "../DataSource";
import { Order } from "../entity/Order";
import { OrderItem } from "../entity/OrderItem";
import { File } from "../entity/File";

const router = Router();

// Criar
router.post('/', async (req, res) => {
    const { userId, items } = req.body; 
    
    if (!userId || !items || !items.length) {
        return res.status(400).json({ message: 'incomplete' });
    }

    const orderRepository = AppDataSource.getRepository(Order);
    const fileRepository = AppDataSource.getRepository(File);
    const orderItemRepository = AppDataSource.getRepository(OrderItem);

    let totalAmount = 0;
    const orderItems: OrderItem[] = [];

    for (const item of items) {
        const cd = await fileRepository.findOneBy({ id: item.fileId });

        if (!item) {
            return res.status(400).json({ message: `training with ID ${item.cdId} not found.` });
        }

        const orderItem = new OrderItem();
        orderItem.file = item;
        orderItem.price = item.price;
        totalAmount += orderItem.price;

        await fileRepository.save(item); 

        const savedOrderItem = await orderItemRepository.save(orderItem); 

        orderItems.push(savedOrderItem);
    }

    const newOrder = orderRepository.create({ user: { id: userId }, totalAmount, items: orderItems });
    await orderRepository.save(newOrder);

    res.status(201).json({ data: newOrder });
});


router.get('/', async (req, res) => {
    const orderRepository = AppDataSource.getRepository(Order);
    const orders = await orderRepository.find({ relations: ['items', 'items.file', 'user'] });
    res.json({ data: orders });
});

export default router;