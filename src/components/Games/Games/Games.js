import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";

import { getGamesFromThird } from "../../../services/getFromThirdApis";

import Game from "../Game/Game";
import Search from "../../Search/Search";
import Loading from "../../Loading/Loading";

function Games() {
  const { page } = useParams();
  let navigate = useNavigate();
  const [fetchend, setFetchend] = useState(false);
  const [games, setGames] = useState({});
  const [reloadPage, setReloadPage] = useState(page);

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await getGamesFromThird({ page: `${reloadPage}` });

        setGames(response);
        setFetchend(true);
      } catch (e) {
        window.location.href = "/NotFound";
      }
    }
    fetchData();
  }, [reloadPage]);

  const nextPage = () => {
    navigate(`/Games/Page/${+page + 1}`);
    setReloadPage(+page + 1);
    setFetchend(false);
  };

  const previousPage = () => {
    if (games.previous !== null) {
      navigate(`/Games/Page/${+page - 1}`);
      setReloadPage(+page - 1);
      setFetchend(false);
    }
  };

  const PaginationBasic = () => {
    return (
      <div className="d-flex justify-content-center mt-3">
        {games.previous == null ? (
          <Button variant="primary" onClick={previousPage} disabled>
            Anterior
          </Button>
        ) : (
          <Button variant="primary" onClick={previousPage}>
            Anterior
          </Button>
        )}{" "}
        <FormControl className="mx-2" type="number" value={page} disabled />
        {games.next == null ? (
          <Button variant="primary" onClick={nextPage} disabled>
            Siguiente
          </Button>
        ) : (
          <Button variant="primary" onClick={nextPage}>
            Siguiente
          </Button>
        )}{" "}
      </div>
    );
  };

  if (!fetchend) {
    return <Loading />;
  }

  return (
    <section className="py-5 marginNav">
      <div className="container">
        <Search url="/Games/Browser/" />
        <div className="row">
          {games.results.map((element) => {
            return (
              <div key={element.id} className="col-12 col-md-6 col-lg-4 mt-4 d-flex justify-content-between">
                <Game
                  name={element.name}
                  img={element.background_image}
                  id={element.id}
                />
              </div>
            );
          })}
        </div>
        <PaginationBasic />
      </div>
    </section>
  );
}

export default Games;
