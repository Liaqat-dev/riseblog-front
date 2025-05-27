import React, {createContext, useContext} from "react";


interface UserContextType{
    user:{
        id: string;
        name: string,
        email: string,
        avatar: string,
    }|null,
    setUser: React.Dispatch<React.SetStateAction<{    id: string,   name: string ,    email: string ,     avatar: string }|null>>,
    loadingUser: boolean,

}

export const UserContext = createContext<UserContextType>({
    user:{
        id:'',
        name:'',
        email:'',
        avatar:'',
    },
    setUser: () => {},
    loadingUser: true,
})

export const useUser = () => useContext(UserContext);