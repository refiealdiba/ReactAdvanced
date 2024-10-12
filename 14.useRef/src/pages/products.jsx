import { Fragment, useState, useEffect, useRef } from "react";
import CardProduct from "../components/Fragments/CardProduct";

const products = [
    {
        id: 1,
        image: "images/men-shoes.jpg",
        name: "Men Shoes",
        price: 1000000,
        description: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores aut quisquam
        asperiores molestiae aliquam, quibusdam pariatur rerum animi voluptatibus
        mollitia modi corporis ratione quaerat iusto ullam obcaecati explicabo iste
        porro.`,
    },
    {
        id: 2,
        image: "images/men-shoes.jpg",
        name: "Ex-Men Shoes",
        price: 500000,
        description: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores aut quisquam
        asperiores molestiae aliquam`,
    },
    {
        id: 3,
        image: "images/men-shoes.jpg",
        name: "Ex-Men Shoes",
        price: 600000,
        description: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores aut quisquam
        asperiores molestiae aliquam, quibusdam pariatur rerum`,
    },
];

// memanggil email yang tersimpan pada local storage
const email = localStorage.getItem("email");

const ProductsPage = () => {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("cart")) || []);
    }, []);

    useEffect(() => {
        if (cart.length > 0) {
            const sum = cart.reduce((acc, item) => {
                const product = products.find((product) => product.id === item.id);
                return acc + product.price * item.qty;
            }, 0);
            setTotalPrice(sum);
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart]);

    const handleAddToCart = (id) => {
        if (cart.find((item) => item.id === id)) {
            setCart(cart.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item)));
        } else {
            setCart([...cart, { id, qty: 1 }]);
        }
    };

    // useRef
    const cartRef = useRef(JSON.parse(localStorage.getItem("cart")) || []);

    const handleAddToCartRef = (id) => {
        cartRef.current = [...cartRef.current, { id, qty: 1 }];
        localStorage.setItem("cart", JSON.stringify(cartRef.current));
    };

    // useRef DOM Manipulation
    const totalPriceRef = useRef(null);
    useEffect(() => {
        if (cart.length > 0) {
            totalPriceRef.current.style.display = "table-row";
        } else {
            totalPriceRef.current.style.display = "none";
        }
    }, [cart]);

    return (
        <Fragment>
            <div className="flex justify-end  h-10 bg-blue-600 text-white items-center px-10">
                {email}
            </div>
            <div className="flex justify-center py-5">
                {products.map((product) => (
                    <CardProduct key={product.id}>
                        <CardProduct.Header image={product.image} />
                        <CardProduct.Body name={product.name}>
                            {product.description}
                        </CardProduct.Body>
                        <CardProduct.Footer
                            id={product.id}
                            price={product.price}
                            handleAddToCart={handleAddToCart}
                        />
                    </CardProduct>
                ))}
                ;
                <div className="w-1/4">
                    <h1 className="text-3xl font-bold text-blue-600">Cart</h1>
                    <table className="text-left table-auto border-separate border-spacing-x-5">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item) => {
                                const product = products.find((product) => product.id === item.id);
                                return (
                                    <tr key={item.id}>
                                        <td>{product.name}</td>
                                        <td>
                                            {product.price.toLocaleString("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                            })}
                                        </td>
                                        <td>{item.qty}</td>
                                        <td>
                                            {(product.price * item.qty).toLocaleString("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                            })}
                                        </td>
                                    </tr>
                                );
                            })}
                            {/* ref => it's like id in document.getElementById("#id") */}
                            <tr ref={totalPriceRef}>
                                <td colSpan={3}>
                                    <b>Total</b>
                                </td>
                                <td>
                                    <b>
                                        {totalPrice.toLocaleString("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                        })}
                                    </b>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    );
};

export default ProductsPage;
