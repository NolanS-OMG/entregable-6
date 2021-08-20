import { createContext, useContext, useState } from "react";

const authContext = createContext();

const useProvideAuth = () => {
    const [localUser, setLocalUser] = useState(null);

    function putLocalUser(newUser) {
        setLocalUser(newUser);
    }

    return {
        localUser, putLocalUser
    }
}

export const ProvideAuth = ({children, ...props}) => {
    const auth = useProvideAuth();

    return( <authContext.Provider value = {auth} {...props}> {children} </authContext.Provider> )
}

export const useAuth = () => useContext(authContext);