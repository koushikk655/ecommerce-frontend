import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { Product, CartItem } from '../types'; // Import CartItem type

interface CartProps {
    cart: CartItem[];
    setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const Cart: React.FC<CartProps> = ({ cart, setCart }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [address, setAddress] = useState<string>('');
    const [checkoutStatus, setCheckoutStatus] = useState<string | null>(null);

    

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('/cart');
                if (response.data) {
                    console.log("response dta", response.data)
                    setCartItems(response.data);
                    console.log("cart items", cartItems)
                } else {
                    console.error('Unexpected response data:', response.data);
                }
            } catch (error) {
                console.error('Failed to fetch cart items:', error);
            }
        };
        fetchCartItems();
    }, []);

    const handleCheckout = async () => {
        try {
            await axios.post('/cart/checkout', { address });
            setCheckoutStatus('Checkout successful!');
        } catch (error) {
            console.error('Failed to checkout:', error);
            setCheckoutStatus('Checkout failed.');
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold mb-8 text-center mt-8 text-gray-800">Cart</h2>
            <div className="space-y-4">
                {cartItems.length > 0 ? (
                    cartItems.map(item => (
                        <div key={item.product._id} className="bg-white rounded-lg overflow-hidden shadow-md p-6">
                            <h3 className="text-xl font-bold mb-2 text-gray-900">{item.product.title}</h3>
                            <p className="text-gray-700 mb-2">{item.product.description}</p>
                            <p className="text-blue-600 text-xl font-bold">${item.product.price}</p>
                            <p className="text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-lg">Your cart is empty</p>
                )}
            </div>
            <div className="mt-8">
                <label className="block text-sm font-medium mb-1">Address:</label>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                />
                <button
                    onClick={handleCheckout}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                    Checkout
                </button>
                {checkoutStatus && <p className="mt-4 text-center">{checkoutStatus}</p>}
            </div>
        </div>
    );
};

export default Cart;
