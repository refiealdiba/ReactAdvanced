import { useEffect, useState } from "react";
import { getUsername } from "../services/auth.service";

export const useLogin = () => {
    const [username, setUsername] = useState("");

    useEffect(() => {
        // memanggil email yang tersimpan pada local storage
        const token = localStorage.getItem("token");
        if (token) {
            setUsername(getUsername(token));
        } else {
            window.location.href = "/login";
        }
    }, []);

    return username;
};
