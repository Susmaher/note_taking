import { useState, type JSX } from "react";
import api from "../ts/api";
import { AuthContext } from "./AuthContext";

interface Props {
    children: JSX.Element;
}

export const AuthProvider = ({ children }: Props) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);

    const verifyAuth = async () => {
        try {
            const response = await api.post("/api/Auth/login/");
            setIsAuthorized(response.status === 200);
        } catch {
            try {
                await api.post("/api/Auth/refresh-token/");
                setIsAuthorized(true);
            } catch {
                setIsAuthorized(false);
            }
        } finally {
            setLoading(false);
        }
    };

    const value = {
        isAuthorized,
        setIsAuthorized,
        loading,
        setLoading,
        verifyAuth,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
