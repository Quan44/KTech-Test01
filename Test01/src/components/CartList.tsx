import React from 'react';
import { useCart } from './CartProvider';
import BuyerFormPage from '@/pages/BuyerForm/Page';

const CartList: React.FC = () => {
    const { cart } = useCart();

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white rounded-lg shadow-md p-8">
                            <BuyerFormPage />
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                                Shopping Cart
                            </h1>
                            <div className="text-center py-12">
                                <div className="text-gray-400 text-6xl mb-4">🛒</div>
                                <h2 className="text-xl font-semibold text-gray-600 mb-2">
                                    Your cart is empty
                                </h2>
                                <p className="text-gray-500">
                                    Add some products to get started!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Buyer Form Section */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <BuyerFormPage />
                    </div>

                    {/* Cart List Section */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h1 className="text-2xl font-bold text-gray-900">
                                Shopping Cart
                            </h1>
                        </div>

                        <div className="divide-y divide-gray-200">
                            {cart.map((item) => (
                                <div key={item.id} className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {item.name}
                                            </h3>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-lg font-semibold text-gray-900">
                                                ${item.price}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartList; 