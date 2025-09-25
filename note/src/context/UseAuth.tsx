import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const useAuth = () => {
    const ctx = useContext(AuthContext);

    if (!ctx) {
        return new Error("Something went wrong with AuthContext");
    }

    return ctx;
};
