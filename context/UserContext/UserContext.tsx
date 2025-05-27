import {ReactNode, useEffect, useState} from "react";
import {UserContext} from "./useUser";
import {fetchCurrentUser} from "@api/api_routes.ts";

interface Props {
    children: ReactNode;
}

export function UserProvider({children}: Props) {
    const [user, setUser] = useState<null | {
        id: string;
        name: string;
        email: string;
        avatar: string;
    }>(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const getUser = async () => {
        try {
            setLoadingUser(true);
            const response = await fetchCurrentUser();
            return response;

        } catch (err) {
            console.error('Failed to fetch user:', err);
        }
    };

    useEffect(() => {
        let isMounted = true;

        getUser()
            .then((res) => {
                if (isMounted) {
                    setUser({
                        id: res.id || '',
                        name: res.displayName || '',
                        avatar: res.avatar || '',
                        email: res.email || ''
                    });
                    setLoadingUser(false);
                }
            })
            .catch((err:any) => {
                console.error("Failed to fetch user:", err);
                if (isMounted) {
                    setUser(null)
                    setLoadingUser(false);
                }
            });
        return () => {
            isMounted = false;
        };
    }, []);

    return <UserContext.Provider value={{user, loadingUser,setUser}}>
        {children}
    </UserContext.Provider>
}