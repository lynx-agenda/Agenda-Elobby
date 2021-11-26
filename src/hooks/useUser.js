import { useCallback, useContext, useState } from "react";
import  Context  from "../context/UserContext";
import loginService from "../services/login";

export default function useUser() {
    const {jwt, setJwt} = useContext(Context);
    const [error, setError] = useState(false);
    console.log(jwt)

    const login = useCallback(({email, password, ckeckRemenber}) => {
        // loginService({email, password})
        //     .then(jwt => {
        //         window.sessionStorage.setItem('jwt',jwt)
        //         setJwt(jwt)
        //     })
        //     .catch(err => {
        //         window.sessionStorage.removeItem('jwt')
        //     })
        // setJwt(email)
        // window.sessionStorage.setItem('jwt',email)
        // if(ckeckRemenber) window.localStorage.setItem('jwt',email);
        setError(true)
    }, [setJwt])

    const logout = useCallback(() => {
        window.sessionStorage.removeItem('jwt')
        setJwt(null)
    }, [setJwt])


    return {
        isLogged: Boolean(jwt),
        error,
        setError,
        login,
        logout
    }
}