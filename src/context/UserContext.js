import React, {useState} from "react";

const Context = React.createContext({});

export function UserContextProvider({children}) {
    const [jwt, setJwt] = useState(() => {
        if(window.localStorage.getItem('jwt')!==null){
            return window.localStorage.getItem('jwt');
        } else{
            return window.sessionStorage.getItem('jwt')
        }
    })

    return <Context.Provider value={{jwt, setJwt}}>
        {children}
        </Context.Provider>
    
}

export default Context;