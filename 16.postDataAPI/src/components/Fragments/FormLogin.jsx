import { useRef, useState } from "react";
import Button from "../Elements/Button";
import InputForm from "../Elements/Input";
import { useEffect } from "react";
import { login } from "../../services/auth.service";

const FormLogin = () => {
    const [loginFailed, setLoginFailed] = useState("");
    const handleLogin = (e) => {
        e.preventDefault();

        // menangkap data login
        const data = {
            username: e.target.username.value,
            password: e.target.password.value,
        };
        login(data, (status, res) => {
            if (status) {
                // menyimpan token pada local storage
                localStorage.setItem("token", res.token);
                // mengarahkan ke halaman products
                window.location.href = "/products";
            } else {
                setLoginFailed(res.response.data);
            }
        });
    };

    // useRef DOM Manipulation
    const usernameRef = useRef(null);
    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    return (
        <form onSubmit={handleLogin}>
            <InputForm
                label="Username"
                type="text"
                placeholder="john_doe"
                name="username"
                ref={usernameRef}
            />
            <InputForm label="Password" type="password" placeholder="*****" name="password" />
            <Button classname="bg-blue-600 w-full" type="submit">
                Login
            </Button>
            {loginFailed && <p className="text-red-600 text-center mt-5">{loginFailed}</p>}
        </form>
    );
};

export default FormLogin;
