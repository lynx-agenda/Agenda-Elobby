import { useCallback, useContext, useState } from "react";
import Context from "../context/UserContext";
import loginService from "../services/login";
// import getUser from "../services/getUser";

//Hook creando para control de usuario en toda la web, este hook hace de intermediario entre el contexto y los componentes

export default function useUser() {
  const { jwt, setJwt } = useContext(Context);
  const [error, setError] = useState(false);

  const login = useCallback(
    ({ email, password, checkRemember }) => {
      loginService({ email, password })
        .then((jwt) => {
          if (jwt !== null) {
            window.sessionStorage.setItem("jwt", jwt);
            if (checkRemember) window.localStorage.setItem("jwt", jwt);
            setJwt(jwt);
          } else {
            setError(true);
          }
        })
        .catch((error) => {
          window.sessionStorage.removeItem("jwt");
          window.localStorage.removeItem("jwt");
          setError(true);
        });
    },
    [setJwt]
  );

  const logout = useCallback(() => {
    window.sessionStorage.removeItem("jwt");
    window.localStorage.removeItem("jwt");
    setJwt(null);
  }, [setJwt]);

  return {
    isLogged: Boolean(jwt),
    jwt,
    error,
    setError,
    login,
    logout,
  };
}
