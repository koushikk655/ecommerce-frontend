import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import AddProduct from './AddProduct';
import { Product, CartItem } from '../types';
import { useNavigate } from 'react-router-dom';

interface ProductListProps {
    cart: CartItem[];
    setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}
const ProductList: React.FC<ProductListProps> = ({cart, setCart}) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const checkAdmin = () => {
            const role = localStorage.getItem('role');
            setIsAdmin(role === 'superadmin');
        };

        fetchProducts();
        checkAdmin();
    }, []);

    const handleAddToCart = async (product: Product) => {
        try {
            await axios.post('/cart', { productId: product._id, quantity: 1 });
            alert('Product added to cart');
            navigate('/cart'); // Redirect to cart page
        } catch (error) {
            console.error('Failed to add to cart:', error);
            alert('Failed to add product to cart');
        }
    };

    if (isLoading) return <div className="text-center text-lg">Loading...</div>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {isAdmin && <AddProduct onProductAdded={fetchProducts} />}
            <h2 className="text-3xl font-bold mb-8 text-center mt-8 text-gray-800">Product List</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                    <div key={product._id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transform transition duration-300 ease-in-out p-6">
                        <h3 className="text-2xl font-bold mb-2 text-gray-900">{product.title}</h3>
                        <p className="text-gray-700 mb-4">{product.description}</p>
                        <p className="text-blue-600 text-xl font-bold">${product.price}</p>
                        <button
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                            onClick={() => handleAddToCart(product)}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
