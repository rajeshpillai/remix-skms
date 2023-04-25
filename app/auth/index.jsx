import { useFetcher } from "@remix-run/react";
import { useContext, createContext, useEffect, useState } from "react";

const AuthContext = createContext()

export default function AuthContextProvider({ children }) {
    const fetcher = useFetcher();
    const [user, setUser] = useState({});

    useEffect(() => {
        const username = localStorage.getItem("username") || "";
        fetcher.submit({ username }, { method: "post", action: "/auth" });
    }, [])

    useEffect(() => {
        if (fetcher.data)
            setUser(fetcher.data.user)
    }, [fetcher.data])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext() {
    const ctx = useContext(AuthContext);
    if (!ctx)
        throw new Error("AuthContext can only be accessed inside AuthContextProvider's children");
    return ctx;
}
