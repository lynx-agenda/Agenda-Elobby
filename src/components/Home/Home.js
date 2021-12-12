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
import { useState, useEffect } from "react";
import Sidebar from "../NavbarMain/Sidebar";
import Profile from "../Profile/Profile";
import "./Home.css";
import "../Agenda/Agenda.css";
import Landing from "../Landing/Landing";
import MyMovies from "../Agenda/MyMovies";
import MyTV from "../Agenda/MyTV";
import MyGames from "../Agenda/MyGames";
import MyBooks from "../Agenda/MyBooks";
import Loading from "../Loading/Loading";
import Tierlist from "../Tierlist/Tierlist";
import DiaryCard from "../Agenda/DiaryCard";
import getDiary from "../../services/getDiary";
import {
  getGamesFromThird,
  getFromTheMovieDB,
} from "../../services/getFromThirdApis";

//Este es el componente que contiene las Routin, ahora hay 2 BrowserRouter, uno cuando este logeado y otro cuuando no

export default function Home() {
  //isLogged es una variable de nuestro Hook perzonalisado
  const { isLogged } = useUser();

  const [sidebar, setSidebar] = useState(false);

  if (!isLogged) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Singup" element={<Singup />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <NavbarMain show={sidebar} onShow={(show) => setSidebar(show)} />
      <div className="content">
        <div className={sidebar ? "content-sidebar" : "invisible"}>
          <Sidebar />
        </div>
        <div className={sidebar ? "content-web" : "content-web-full"}>
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
            <Route
              path="/Books"
              element={<Navigate replace to="/Books/Page/1" />}
            />

            <Route path="/Books">
              <Route path="Page/:page" element={<Books />} />
              <Route
                path="View"
                element={<Navigate replace to="/Books/Page/1" />}
              />
              <Route path="View">
                <Route path=":id" element={<ViewBook />} />
              </Route>
              <Route path="Browser/:text" element={<BrowserBooks />} />
            </Route>
            {/* Fin Routin de Libros */}
            {/* Inicio Rutin de perfil y agenda*/}
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Tierlist" element={<Tierlist />} />
            <Route path="/Agenda" element={<Navigate replace to="/" />} />
            <Route path="/Agenda">
              <Route path="Movies" element={<MyMovies />} />
              <Route path="Games" element={<MyGames />} />
              <Route path="TV" element={<MyTV />} />
              <Route path="Books" element={<MyBooks />} />
            </Route>
            {/* Fin Rutin de perfil y agenda*/}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

function Main() {
  const { jwt } = useUser();
  const [watching, setWatching] = useState([]);
  const [pending, setPending] = useState([]);
  const [dropped, setDropped] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const diary = await getDiary({ jwt });

        const allPromiseCompleted = diary.completed.map((element) => {
          if (element.type === "game")
            return getGamesFromThird({
              idResource: `${element.idApi}`,
              typeElobby: "game",
            });
          if (element.type === "movie")
            return getFromTheMovieDB({
              idResource: `${element.idApi}`,
              resourceType: "movie",
              typeElobby: "movie",
            });
          if (element.type === "tv")
            return getFromTheMovieDB({
              idResource: `${element.idApi}`,
              resourceType: "tv",
              typeElobby: "tv",
            });
          return null;
        });

        const allPromiseWatching = diary.watching.map((element) => {
          if (element.type === "game")
            return getGamesFromThird({
              idResource: `${element.idApi}`,
              typeElobby: "game",
            });
          if (element.type === "movie")
            return getFromTheMovieDB({
              idResource: `${element.idApi}`,
              resourceType: "movie",
              typeElobby: "movie",
            });
          if (element.type === "tv")
            return getFromTheMovieDB({
              idResource: `${element.idApi}`,
              resourceType: "tv",
              typeElobby: "tv",
            });
          return null;
        });

        const allPromiseDropped = diary.dropped.map((element) => {
          if (element.type === "game")
            return getGamesFromThird({
              idResource: `${element.idApi}`,
              typeElobby: "game",
            });
          if (element.type === "movie")
            return getFromTheMovieDB({
              idResource: `${element.idApi}`,
              resourceType: "movie",
              typeElobby: "movie",
            });
          if (element.type === "tv")
            return getFromTheMovieDB({
              idResource: `${element.idApi}`,
              resourceType: "tv",
              typeElobby: "tv",
            });
          return null;
        });

        const allPromisePending = diary.pending.map((element) => {
          if (element.type === "game")
            return getGamesFromThird({
              idResource: `${element.idApi}`,
              typeElobby: "game",
            });
          if (element.type === "movie")
            return getFromTheMovieDB({
              idResource: `${element.idApi}`,
              resourceType: "movie",
              typeElobby: "movie",
            });
          if (element.type === "tv")
            return getFromTheMovieDB({
              idResource: `${element.idApi}`,
              resourceType: "tv",
              typeElobby: "tv",
            });
          return null;
        });

        Promise.all(allPromiseCompleted)
          .then((res) => {
            setCompleted(res);
            Promise.all(allPromiseWatching).then((res) => {
              setWatching(res);
              Promise.all(allPromiseDropped).then((res) => {
                setDropped(res);
                Promise.all(allPromisePending)
                  .then((res) => {
                    setPending(res);
                    setLoading(false);
                  })
                  .catch((error) => console.error(error));
              });
            });
          })
          .catch((error) => console.error(error));
      } catch (e) {
        window.location.href = "/NotFound";
      }
    }
    fetchData();
  }, [jwt]);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className=" py-5 marginNav">
      <div className="container">
        <div className={watching.length !== 0 ? "state-section" : "invisible"}>
          <h2>Siguiendo</h2>
          <div className="elements-list">
            {watching.map((item) => (
              <DiaryCard key={item.id} elemento={item} />
            ))}
          </div>
        </div>
        <div className={pending.length !== 0 ? "state-section" : "invisible"}>
          <h2>Pendiente</h2>
          <div className="elements-list">
            {pending.map((item) => (
              <DiaryCard key={item.id} elemento={item} />
            ))}
          </div>
        </div>
        <div className={completed.length !== 0 ? "state-section" : "invisible"}>
          <h2>Terminado</h2>
          <div className="elements-list">
            {completed.map((item) => (
              <DiaryCard key={item.id} elemento={item} />
            ))}
          </div>
        </div>
        <div className={dropped.length !== 0 ? "state-section" : "invisible"}>
          <h2>Abandonado</h2>
          <div className="elements-list">
            {dropped.map((item) => (
              <DiaryCard key={item.id} elemento={item} />
            ))}
          </div>
        </div>
        <p
          className={
            watching.length === 0 &&
            pending.length === 0 &&
            completed.length === 0 &&
            dropped.length === 0
              ? "empty-diary"
              : "invisible"
          }
        >
          ¡Oops...! Parece que tu agenda está vacía. Navega para añadir un
          elemento a la lista.
        </p>
      </div>
    </section>
  );
}
