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
import { useState } from "react";
import Sidebar from "../NavbarMain/Sidebar";
import Profile from '../Profile/Profile'
import './Home.css'
import Landing from "../Landing/Landing";
import UserInfo from "../Profile/UserInfo";
import { Card } from "react-bootstrap";

//Este es el componente que contiene las Routin, ahora hay 2 BrowserRouter, uno cuando este logeado y otro cuuando no

export default function Home() {
  //isLogged es una variable de nuestro Hook perzonalisado
  const { isLogged } = useUser();

  const [sidebar, setSidebar] = useState(false)

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
            <Route
            path="/Profile"
            element={<Profile />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

function Main() {
  // let {user} = useUser()
  // user = JSON.parse(user);

  return (
    <section className=" py-5 marginNav">
      {/* <UserInfo /> */}
      <div className="container">
        <div className='state-section'>
          <h2>Siguiendo</h2>
          <div className='elements-list'>
            <Card className='list-item'>
              <Card.Img variant='top' src='https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg'/>
              <Card.Body>
                <Card.Text className='text-center'>Titulo</Card.Text>
              </Card.Body>
            </Card>
            <Card className='list-item'>
              <Card.Img variant='top' src='https://image.tmdb.org/t/p/original//mpgDeLhl8HbhI03XLB7iKO6M6JE.jpg'/>
              <Card.Body>
                <Card.Text className='text-center'>Titulo</Card.Text>
              </Card.Body>
            </Card>
            <Card className='list-item'>
              <Card.Img variant='top' src='https://media.rawg.io/media/games/7cf/7cfc9220b401b7a300e409e539c9afd5.jpg'/>
              <Card.Body>
                <Card.Text className='text-center'>Titulo</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div> 
        <div className='state-section'>
          <h2>Pendiente</h2>
          <div className='elements-list'>
            <Card className='list-item'>
              <Card.Img variant='top' src='http://books.google.com/books/content?id=nzmEDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'/>
              <Card.Body>
                <Card.Text className='text-center'>Titulo</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div> 
        <div className='state-section'>
          <h2>Terminado</h2>
        </div>  
        <div className='state-section'>
          <h2>Abandonado</h2>
        </div> 
      </div>
    </section>
  );
}
