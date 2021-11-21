import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Games from "./components/Games/Games/Games";
import Movies from "./components/Movies/Movies/Movies";
import BrowserMovies from "./components/Movies/BrowserMovies/BrowserMovies";
import ViewMovie from "./components/Movies/ViewMovie/ViewMovie";
import ViewGame from "./components/Games/ViewGame/ViewGame";
import BrowserGames from "./components/Games/BrowserGames/BrowserGames";
import NotFound from "./components/NotFound/NotFound";
import ViewShow from "./components/TV/ViewShow/ViewShow";
import BrowserTV from "./components/TV/BrowserTV/BrowserTV";
import TVShows from "./components/TV/TVShows/TVShows";
import NavbarMain from "./components/NavbarMain/NavbarMain";

function Main() {
  return (
    <section className="py-5 marginNav">
      <div className="container">
        <h1>Bienvenido</h1>
        <h3>
          Actualmente la agenda esta en desarrollo pero puede navegar por
          nuestros elementos de ocio
        </h3>
      </div>
    </section>
  );
}

function App() {
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
        <Route
          path="/TV"
          element={<Navigate replace to="/TV/Page/1" />}
        />
        <Route path="/TV">
          <Route path="Page/:page" element={<TVShows />} />
          <Route
            path="View"
            element={<Navigate replace to="/TV/Page/1" />}
          />
          <Route path="View">
            <Route path=":id" element={<ViewShow />} />
          </Route>
          <Route path="Browser/:text" element={<BrowserTV />} />
        </Route>
        {/* Fin Routin de Serie */}
        {/* Inicio Routin de Libros */}
        {/* Fin Routin de Libros */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
