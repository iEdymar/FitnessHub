import { Router } from "express";
import { AppDataSource } from "../DataSource";
import { Order } from "../entity/Order";
import { OrderItem } from "../entity/OrderItem";
import { file } from "../entity/file";

const router = Router();

// Create
router.post('/', async (req, res) => {
    const { userId, items } = req.body; 
    
    if (!userId || !items || !items.length) {
        return res.status(400).json({ message: 'incomplete' });
    }

    const orderRepository = AppDataSource.getRepository(Order);
    const fileRepository = AppDataSource.getRepository(file);
    const orderItemRepository = AppDataSource.getRepository(OrderItem);

    let totalAmount = 0;
    const orderItems: OrderItem[] = [];

    for (const item of items) {
        const cd = await fileRepository.findOneBy({ id: item.fileId });

        if (!file) {
            return res.status(400).json({ message: `training with ID ${item.cdId} not found.` });
        }

        if (file.stock < item.quantity) {
            return res.status(400).json({ 
                message: `O CD "${file.title}" tem estoque insuficiente. Quantidade disponível: ${file.stock}, quantidade solicitada: ${item.quantity}.`
            });
        }

        const orderItem = new OrderItem();
        orderItem.file = file;
        orderItem.quantity = item.quantity;
        orderItem.price = file.price * item.quantity;
        totalAmount += orderItem.price;

        file.stock -= item.quantity; 
        await fileRepository.save(file); 

        const savedOrderItem = await orderItemRepository.save(orderItem); 

        orderItems.push(savedOrderItem);
    }

    const newOrder = orderRepository.create({ user: { id: userId }, totalAmount, items: orderItems });
    await orderRepository.save(newOrder);

    res.status(201).json({ data: newOrder });
});


// Get
router.get('/', async (req, res) => {
    const orderRepository = AppDataSource.getRepository(Order);
    const orders = await orderRepository.find({ relations: ['items', 'items.file', 'user'] });
    res.json({ data: orders });
});

export default router;