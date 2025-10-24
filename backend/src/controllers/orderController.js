import * as productModel from '../models/productModel.js';
import * as orderModel from '../models/orderModel.js';

export const submitOrder = async (req, res) => {
    try {
        const { userId, billingAddress, billingPhoneNumber, items } = req.body;

        const productIds = items.map(item => item.productId);
        const products =  await productModel.getProductsForOrder(productIds);

        for (const item of items) {
            const product = products.find(p => p.id === item.productId);
            if (!product) {
                return res.status(400).json({ error: `Product ID ${item.productId} not found.` });
            }
            if (product.stock < item.quantity) {
                return res.status(400).json({
                    error: `Not enough stock for "${product.name}". Only ${product.stock} left.`,
                });
            }
        }

        const total = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
        const newOrder = await orderModel.submitOrder(userId, billingAddress, billingPhoneNumber, total, items);

        res.status(201).json(newOrder);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create order" });
    }
}

export const fetchUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await orderModel.getOrdersByUser(userId);
    res.json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

