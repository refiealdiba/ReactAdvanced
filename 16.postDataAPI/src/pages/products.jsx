import { Fragment, useState, useEffect, useRef } from "react";
import CardProduct from "../components/Fragments/CardProduct";
import { getProducts } from "../services/product.service";
import Button from "../components/Elements/Button";
import { getUsername } from "../services/auth.service";

const ProductsPage = () => {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [products, setProducts] = useState([]);
    const [username, setUsername] = useState("");

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("cart")) || []);
    }, []);

    // API
    useEffect(() => {
        getProducts((data) => {
            setProducts(data);
        });
    }, []);
    // API
    useEffect(() => {
        if (products.length > 0 && cart.length > 0) {
            const sum = cart.reduce((acc, item) => {
                const product = products.find((product) => product.id === item.id);
                return acc + product.price * item.qty;
            }, 0);
            setTotalPrice(sum);
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart, products]);

    useEffect(() => {
        // memanggil email yang tersimpan pada local storage
        const token = localStorage.getItem("token");
        if (token) {
            setUsername(getUsername(token));
        } else {
            window.location.href = "/login";
        }
    }, []);

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

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <Fragment>
            <div className="flex justify-end  h-10 bg-blue-600 text-white items-center p-10">
                {username}
                <Button classname="ml-5 bg-black" onClick={handleLogout}>
                    Logout
                </Button>
            </div>
            <div className="flex justify-center py-5">
                <div className="flex flex-wrap gap-3">
                    {products.length > 0 &&
                        products.map((product) => (
                            <CardProduct key={product.id}>
                                <CardProduct.Header image={product.image} />
                                <CardProduct.Body name={product.title}>
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
                </div>
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
                            {products.length > 0 &&
                                cart.map((item) => {
                                    const product = products.find(
                                        (product) => product.id === item.id
                                    );
                                    return (
                                        <tr key={item.id}>
                                            <td>{product.title.substring(0, 10)}...</td>
                                            <td>
                                                {product.price.toLocaleString("us-US", {
                                                    style: "currency",
                                                    currency: "USD",
                                                })}
                                            </td>
                                            <td>{item.qty}</td>
                                            <td>
                                                {(product.price * item.qty).toLocaleString(
                                                    "us-US",
                                                    {
                                                        style: "currency",
                                                        currency: "USD",
                                                    }
                                                )}
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
                                        {totalPrice.toLocaleString("us-US", {
                                            style: "currency",
                                            currency: "USD",
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
