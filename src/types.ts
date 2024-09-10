export interface Product {
    _id: string;
    title: string;
    description: string;
    price: number;
    image: string;
}

export interface CartItem {
    productId: string;
    quantity: number;
    product: Product;
}