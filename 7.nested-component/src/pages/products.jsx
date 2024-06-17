import CardProduct from "../components/Fragments/CardProduct";

const ProductsPage = () => {
    return (
        <div className="flex justify-center py-5">
            <CardProduct>
                <CardProduct.Header image="images/men-shoes.jpg" />
                <CardProduct.Body title="Men Shoes">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores aut quisquam
                    asperiores molestiae aliquam, quibusdam pariatur rerum animi voluptatibus
                    mollitia modi corporis ratione quaerat iusto ullam obcaecati explicabo iste
                    porro.
                </CardProduct.Body>
                <CardProduct.Footer price="Rp 1.000.000" />
            </CardProduct>
            <CardProduct>
                <CardProduct.Header image="images/men-shoes.jpg" />
                <CardProduct.Body title="Men Shoes">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores aut quisquam
                    asperiores molestiae aliquam, quibusdam pariatur rerum animi voluptatibus
                    mollitia modi corporis ratione quaerat iusto ullam obcaecati explicabo iste
                    porro.
                </CardProduct.Body>
                <CardProduct.Footer price="Rp 1.000.000" />
            </CardProduct>
        </div>
    );
};

export default ProductsPage;
