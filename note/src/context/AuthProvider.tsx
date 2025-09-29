import { useCallback, useEffect, useRef, useState, type JSX } from "react";
import api from "../ts/api";
import { AuthContext } from "./AuthContext";

interface Props {
    children: JSX.Element;
}

export const AuthProvider = ({ children }: Props) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);
    const effectRan = useRef(false);

    const verifyAuth = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get("/api/Auth/verify");
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
    }, []);

    useEffect(() => {
        if (effectRan.current === false) {
            verifyAuth();

            return () => {
                effectRan.current = true;
            };
        }
    }, [verifyAuth]);

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
