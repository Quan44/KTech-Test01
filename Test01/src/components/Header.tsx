import { Link } from 'react-router-dom';
import { useCart } from './CartProvider';
import { FaShoppingCart } from "react-icons/fa";

export default function Header() {
    const { getTotalItems } = useCart();

    return (
        <nav className="flex items-center justify-between p-4 bg-blue-600 text-white shadow-md">
            <div className="flex items-center gap-x-6">
                <Link to="/">
                    <h1 className="text-xl font-bold hover:text-blue-200 transition-all duration-300">
                        Cart Management
                    </h1>
                </Link>
                <Link to="/products" className="text-sm font-medium hover:text-blue-200 transition-all duration-300">
                    Home
                </Link>
            </div>

            <div className="flex items-center gap-x-4">
                <Link to="/cart" className="relative">
                    <div className="flex items-center gap-x-2 text-sm font-medium hover:text-blue-200 transition-all duration-300">
                        <FaShoppingCart />
                        Cart
                        {getTotalItems() > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {getTotalItems()}
                            </span>
                        )}
                    </div>
                </Link>
            </div>
        </nav>
    )
}
