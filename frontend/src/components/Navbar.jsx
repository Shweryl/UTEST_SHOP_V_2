import { useCart } from "../contexts/CartContext.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { Link } from "react-router-dom";



export default function Navbar() {
    const { cart } = useCart();
    const { user, logout } = useAuth();
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleSignOut = async () => {
        await logout()
    }


    return (
        <div className="navbar h-18 bg-base-100 shadow-sm px-20">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl font-bold text-primary">U-TEST</Link>
            </div>
            <div className="flex items-center">
                <div className="dropdown dropdown-end mr-6">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /> </svg>
                            <span className="badge badge-sm indicator-item">{totalItems}</span>
                        </div>
                    </div>

                    <div tabIndex={0} className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-64 shadow">
                        <div className="card-body">
                            <span className="text-lg font-bold">{totalItems} Items</span>
                            <span className="text-info">Subtotal: ${subtotal.toFixed(2)}</span>
                            <div className="card-actions">
                                <Link to="/cart" className="btn btn-primary btn-block">View cart</Link>
                            </div>
                        </div>
                    </div>
                </div>
                {user ? (
                    <>
                        <p className="mr-6">
                            <Link to="/my-orders" className="font-bold hover:text-primary">Orders</Link>
                        </p>
                        <p className="font-bold hover:text-primary cursor-pointer" onClick={handleSignOut}>
                            Sign Out
                        </p>
                    </>


                ) : (
                    <>
                        <p className="mr-6">
                            <Link to="/login" className="font-bold hover:text-primary">Login</Link>
                        </p>
                        <p>
                            <Link to="/register" className="font-bold hover:text-primary">Register</Link>
                        </p>
                    </>
                )}

            </div>
        </div>
    );
}