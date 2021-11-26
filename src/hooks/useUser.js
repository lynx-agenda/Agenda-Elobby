import { useCallback, useContext, useState } from "react";
import  Context  from "../context/UserContext";
import loginService from "../services/login";
// import getUser from "../services/getUser";

//Hook creando para control de usuario en toda la web, este hook hace de intermediario entre el contexto y los componentes

export default function useUser() {
    const {jwt, setJwt, user} = useContext(Context);
    const [error, setError] = useState(false);

    const login =  useCallback(({email, password, ckeckRemenber}) => {
        loginService({email, password})
            .then(jwt => {
                if(jwt!==null){
                    window.sessionStorage.setItem('jwt',jwt);
                    if(ckeckRemenber) window.localStorage.setItem('jwt',jwt);
                    console.log("token almacenado")
                    // getUser({email, jwt})
                    //     .then(res => {
                    //         window.sessionStorage.setItem('user',JSON.stringify(res));
                    //         if(ckeckRemenber) window.localStorage.setItem('user',JSON.stringify(res));
                    //         setUser(res);
                    //         console.log("Usuario almacenado")
                    //     })
                    //     .catch(error => console.log(error))
                    setJwt(jwt)
                }else {
                    setError(true)
                }
            })
            .catch(error => {
                console.log(error)
                window.sessionStorage.removeItem('jwt');
                window.localStorage.removeItem('jwt');
                setError(true)
            })
    }, [setJwt])

    const logout = useCallback(() => {
        window.sessionStorage.removeItem('jwt');
        window.localStorage.removeItem('jwt');
        // window.sessionStorage.removeItem('user');
        // window.localStorage.removeItem('user');
        setJwt(null)
    }, [setJwt])



    return {
        isLogged: Boolean(jwt),
        isLoggedAUser: Boolean(user),
        user,
        error,
        setError,
        login,
        logout
    }
}