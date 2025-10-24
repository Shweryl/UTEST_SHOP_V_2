import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import * as orderApi from "../api/order.js"

export default function MyOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);


  useEffect(() => {
  if (!user) return;

  async function fetchUserOrders() {
    try {
      const res = await orderApi.fetchOrders();
      setOrders(res.data.orders);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setOrders([]);
    }
  }

  fetchUserOrders();
}, [user]);

  if (!user) {
    return <p>Please sign in to view your orders.</p>;
  }

  if (orders.length === 0) return <p>You have no orders yet.</p>;

  return (
  <div className="my-10 px-20">
    <h1 className="text-3xl font-bold text-primary mb-8">My Orders</h1>

    {orders.map((order) => (
      <div
        key={order.id}
        className="border border-gray-200 rounded-lg shadow-lg mb-6 overflow-hidden hover:shadow-xl transition-shadow duration-300"
      >
        <div className="bg-primary/40 px-6 py-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">
              <strong>Order ID:</strong> {order.id}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
          
        </div>

        <div className="px-6 py-4 border-b border-gray-200 grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-700"><strong>Billing Address:</strong> {order.billingAddress}</p>
            <p className="text-gray-700"><strong>Phone:</strong> {order.billingPhoneNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-700"><strong>Total Items:</strong> {order.items.reduce((acc, item) => acc + item.quantity, 0)}</p>
            <p className="text-gray-700 font-bold"><strong>Total Amount:</strong> ${order.total.toFixed(2)}</p>
          </div>
        </div>

        <div className="px-6 py-4">
          <p className="font-bold mb-3 text-gray-800">Items:</p>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-bold">${item.unitPrice.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ))}

    {orders.length === 0 && (
      <p className="text-gray-500 text-center mt-10">You have no orders yet.</p>
    )}
  </div>
);

}
