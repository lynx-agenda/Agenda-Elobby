import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Games from "../Games/Games/Games";
import Movies from "../Movies/Movies/Movies";
import Books from "../Books/Books/Books";
import BrowserMovies from "../Movies/BrowserMovies/BrowserMovies";
import ViewMovie from "../Movies/ViewMovie/ViewMovie";
import ViewGame from "../Games/ViewGame/ViewGame";
import ViewBook from "../Books/ViewBook/ViewBook";
import BrowserGames from "../Games/BrowserGames/BrowserGames";
import BrowserBooks from "../Books/BrowserBooks/BrowserBooks";
import NotFound from "../NotFound/NotFound";
import ViewShow from "../TV/ViewShow/ViewShow";
import BrowserTV from "../TV/BrowserTV/BrowserTV";
import TVShows from "../TV/TVShows/TVShows";
import NavbarMain from "../NavbarMain/NavbarMain";
import Singup from "../Singup/Singup";
import Login from "../Login/Login";
import useUser from "../../hooks/useUser";
import getUser from "../../services/getUser";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import ViewReviews from '../ViewReviews/ViewReviews';

//Este es el componente que contiene las Routin, ahora hay 2 BrowserRouter, uno cuando este logeado y otro cuuando no

export default function Home() {
  //isLogged es una variable de nuestro Hook perzonalisado
  const { isLogged } = useUser();

  if (!isLogged) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Singup" element={<Singup />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <NavbarMain />
      <Routes>
        <Route path="/" element={<Main />} />
        {/* Inicio Routin de Videojuego */}
        <Route
          path="/Games"
          element={<Navigate replace to="/Games/Page/1" />}
        />
        <Route path="/Games">
          <Route path="Page/:page" element={<Games />} />
          <Route
            path="View"
            element={<Navigate replace to="/Games/Page/1" />}
          />
          <Route path="View">
            <Route path=":id" element={<ViewGame />} />
          </Route>
          <Route path="Browser/:text" element={<BrowserGames />} />
        </Route>
        {/* Fin Routin de Videojuego */}
        {/* Inicio Routin de Peliculas */}
        <Route
          path="/Movies"
          element={<Navigate replace to="/Movies/Page/1" />}
        />
        <Route path="/Movies">
          <Route path="Page/:page" element={<Movies />} />
          <Route
            path="View"
            element={<Navigate replace to="/Movies/Page/1" />}
          />
          <Route path="View">
            <Route path=":id" element={<ViewMovie />} />
          </Route>
          <Route path="Browser/:text" element={<BrowserMovies />} />
        </Route>
        {/* Fin Routin de Peliculas */}
        {/* Inicio Routin de Series */}
        <Route path="/TV" element={<Navigate replace to="/TV/Page/1" />} />
        <Route path="/TV">
          <Route path="Page/:page" element={<TVShows />} />
          <Route path="View" element={<Navigate replace to="/TV/Page/1" />} />
          <Route path="View">
            <Route path=":id" element={<ViewShow />} />
          </Route>
          <Route path="Browser/:text" element={<BrowserTV />} />
        </Route>
        {/* Fin Routin de Serie */}
        {/* Inicio Routin de Libros */}
        <Route
          path="/Books"
          element={<Navigate replace to="/Books/Page/1" />}
        />


					<Route path="/Books">
						<Route path="Page/:page" element={<Books />} />
						<Route path="View" element={<Navigate replace to="/Books/Page/1" />} />
						<Route path="View">
							<Route path=":id" element={<ViewBook />} />
						</Route>
						<Route path="Browser/:text" element={<BrowserBooks />} /> 
					</Route>
					{/* Fin Routin de Libros */}
					<Route path="/test" element={<ViewReviews />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
	);
}

function Main() {
  const [user, setUser] = useState(null);
  const { jwt } = useUser();

  useEffect(() => {
    if (user === null) {
      getUser({ jwt }).then((res) => setUser(res));
    }
  }, [user, jwt]);

  if (user === null) return <Loading />;
  // console.log(user);
  return (
    <section className="py-5 marginNav">
      <div className="container">
        <h1>Bienvenido {user.name}</h1>
        <h3>
          Actualmente la agenda esta en desarrollo pero puede navegar por
          nuestros elementos de ocio
        </h3>
      </div>
    </section>
  );
}
