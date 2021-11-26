import React, {useState} from "react";

//Contexto creado para tener 2 estados en nuestra web, el JWT(Token) y el Usuario logeado -> el usuario no tiene funcionalidad de momento

const Context = React.createContext({});

export function UserContextProvider({children}) {
    const [jwt, setJwt] = useState(() => {
        if(window.localStorage.getItem('jwt')!==null){
            window.sessionStorage.setItem('jwt', window.localStorage.getItem('jwt'))
            return window.localStorage.getItem('jwt');
        } else{
            return window.sessionStorage.getItem('jwt')
        }
    })

    const [user, setUser] = useState(() => {
        if(window.localStorage.getItem('user')!==null){
            window.sessionStorage.setItem('user', window.localStorage.getItem('user'))
            return window.localStorage.getItem('user');
        } else{
            return window.sessionStorage.getItem('user')
        }
    })

    return <Context.Provider value={{jwt, setJwt, user, setUser}}>
        {children}
        </Context.Provider>
    
}

export default Context;