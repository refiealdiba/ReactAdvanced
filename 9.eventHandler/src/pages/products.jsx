import { Fragment } from "react";
import CardProduct from "../components/Fragments/CardProduct";

const products = [
    {
        id: 1,
        image: "images/men-shoes.jpg",
        name: "Men Shoes",
        price: "Rp 1.000.000",
        description: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores aut quisquam
        asperiores molestiae aliquam, quibusdam pariatur rerum animi voluptatibus
        mollitia modi corporis ratione quaerat iusto ullam obcaecati explicabo iste
        porro.`,
    },
    {
        id: 2,
        image: "images/men-shoes.jpg",
        name: "Ex-Men Shoes",
        price: "Rp 500.000",
        description: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores aut quisquam
        asperiores molestiae aliquam`,
    },
    {
        id: 3,
        image: "images/men-shoes.jpg",
        name: "Ex-Men Shoes",
        price: "Rp 600.000",
        description: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores aut quisquam
        asperiores molestiae aliquam, quibusdam pariatur rerum`,
    },
];

// memanggil email yang tersimpan pada local storage
const email = localStorage.getItem("email");

const ProductsPage = () => {
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
                        <CardProduct.Footer price={product.price} />
                    </CardProduct>
                ))}
                ;
            </div>
        </Fragment>
    );
};

export default ProductsPage;
