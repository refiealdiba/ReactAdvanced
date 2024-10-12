import { useRef } from "react";
import Button from "../Elements/Button";
import InputForm from "../Elements/Input";

const FormLogin = () => {
    const handleLogin = (e) => {
        e.preventDefault();
        // menangkap data login
        // console.log(e.target.email.value);
        // console.log(e.target.password.value);

        // menyimpan inputan pada local storage
        localStorage.setItem("email", e.target.email.value);
        localStorage.setItem("password", e.target.password.value);

        // mengarahkan ke halaman products
        window.location.href = "/products";
    };

    const emailRef = useRef(null);
    return (
        <form onSubmit={handleLogin}>
            <InputForm label="Email" type="email" placeholder="example@mail.com" name="email" />
            <InputForm label="Password" type="password" placeholder="*****" name="password" />
            <Button classname="bg-blue-600 w-full" type="submit">
                Login
            </Button>
        </form>
    );
};

export default FormLogin;
