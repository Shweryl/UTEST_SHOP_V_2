import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import * as orderApi from "../api/order";

export default function CartPage() {
    const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
    const { user } = useAuth();

    const [billingAddress, setBillingAddress] = useState("");
    const [billingPhone, setBillingPhone] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleCheckout = async () => {
        if (!user) {
            alert("You need to login to proceed order.");
            return;
        }

        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        if (!billingAddress || !billingPhone) {
            alert("Please provide billing address and phone number.");
            return;
        }

        setIsLoading(true);

        const payload = {
            userId: user.id,
            billingAddress,
            billingPhoneNumber: billingPhone,
            items: cart.map(item => ({
                productId: item.id,
                quantity: item.quantity,
                unitPrice: item.price,
            })),
        };

        const response = await orderApi.orderSubmit(payload);

        if (response && response.id) {
            clearCart();
            console.log(response);
            navigate("/my-orders");
        }else{
            setIsLoading(false)
        }

    };

    return (
        <div className=" my-10">
            <div className="h-38 bg-primary flex items-center justify-center">
                <div className="">
                    <h1 className="text-3xl font-bold text-center text-white">Shopping Cart</h1>
                </div>
            </div>
            <div className="grid grid-cols-2 px-25 mt-10">
                <div className="w-3/5">
                    <h1 className="text-md mb-4 font-bold text-primary">Cart Items</h1>
                    {
                        cart.length === 0 ? (
                            <p>Your cart is empty.</p>
                        ) : (
                            cart.map((item) => (

                                <div className="card bg-base-100 shadow-md p-4 mb-3 border border-gray-200" key={item.id}>
                                    <div className="flex items-center">
                                        <Link to={`/products/${item.id}`}>
                                            <img src={item.imageUrl} width={80} className="mr-4" alt="" />
                                        </Link>
                                        <div className="">
                                            <h2 className="font-bold text-md mb-2">{item.name}</h2>
                                            <div className="badge badge-neutral mb-4">{item.category}</div>
                                            <div className="flex items-center gap-1">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="btn btn-xs">-</button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="btn btn-xs">+</button>
                                                <button onClick={() => removeFromCart(item.id)} className="btn btn-xs btn-primary">x</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            ))
                        )
                    }
                </div>
                <div className="">
                    <h2 className="text-md font-bold mb-4 text-primary">Order Information</h2>
                    <div className="card w-3/4 border border-gray-200 p-6 shadow-md">
                        <div className="flex justify-between border-b border-gray-300 p-4">
                            <span className="font-bold">Subtotal</span>
                            <span className="font-bold">
                                $ {cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
                            </span>
                        </div>
                        <div className="flex justify-between border-b border-gray-300 p-4">
                            <span className="font-bold">Quantity</span>
                            <span className="font-bold">
                                {cart.reduce((acc, item) => acc + item.quantity, 0)}
                            </span>
                        </div>
                        <div className="p-4">
                            <p className="mb-4">Billing information</p>
                            <label className="input mb-4 w-full">
                                <span className="label">Billing Address</span>
                                <input
                                    type="text"
                                    placeholder="Barklay Street"
                                    value={billingAddress}
                                    onChange={(e) => setBillingAddress(e.target.value)}
                                    className="rounded-sm"

                                />
                            </label>

                            <label className="input mb-4 w-full">
                                <span className="label">+95</span>
                                <input
                                    type="text"
                                    placeholder="Phone number"
                                    value={billingPhone}
                                    onChange={(e) => setBillingPhone(e.target.value)}
                                    className="rounded-sm w-full"
                                />
                            </label>

                            <button
                                onClick={handleCheckout}
                                disabled={isLoading}
                                className="btn btn-primary w-full"
                            >
                                {isLoading ? "Processing..." : "Proceed to checkout"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}