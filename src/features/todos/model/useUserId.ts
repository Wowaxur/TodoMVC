import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export const useUserId = () => {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        let uid = Cookies.get("userId");
        if (!uid) {
            uid = "user_" + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
            Cookies.set("userId", uid, { expires: 365 });
        }
        setUserId(uid);
    }, []);

    return userId;
};