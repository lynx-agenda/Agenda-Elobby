import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import FormControl from "react-bootstrap/FormControl";

import { getFromTheMovieDB } from "../../../services/getFromThirdApis";

import Movie from "../Movie/Movie";
import Search from "../../Search/Search";
import Loading from "../../Loading/Loading";

export default function Movies() {
  const { page } = useParams();
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState({});
  const [reloadPage, setReloadPage] = useState(page);

  useEffect(() => {
    async function getData() {
      try {
        let res = await getFromTheMovieDB({
          page: `${reloadPage}`,
          action: "discover",
          resourceType: "movie",
        });

        setResponse(res);
        setIsLoading(true);
      } catch (e) {
        window.location.href = "/NotFound";
      }
    }
    getData();
  }, [reloadPage]);

  const nextPage = () => {
    navigate(`/Movies/Page/${+page + 1}`);
    setReloadPage(+page + 1);
    setIsLoading(false);
  };

  const previousPage = () => {
    if (response.page > 1) {
      navigate(`/Movies/Page/${+page - 1}`);
      setReloadPage(+page - 1);
      setIsLoading(false);
    }
  };

  const PaginationBasic = () => {
    return (
      <div className="d-flex justify-content-center mt-3">
        {response.page === 1 ? (
          <Button variant="primary" onClick={previousPage} disabled>
            Anterior
          </Button>
        ) : (
          <Button variant="primary" onClick={previousPage}>
            Anterior
          </Button>
        )}{" "}
        <FormControl className="mx-2" type="number" value={page} disabled />
        {response.page < response.total_pages ? (
          <Button variant="primary" onClick={nextPage}>
            Siguiente
          </Button>
        ) : (
          <Button variant="primary" onClick={nextPage} disabled>
            Siguiente
          </Button>
        )}{" "}
      </div>
    );
  };

  if (!isLoading) {
    return <Loading />;
  }

  return (
    <section className="py-5 marginNav">
      <div className="container">
        <div className="row">
          <Search url="/Movies/Browser/" />
          {response.results.map((movie) => {
            return (
              <div key={movie.id} className="col-12 col-md-6 col-lg-3 mt-4 d-flex justify-content-between">
                <Movie
                  id={movie.id}
                  original_title={movie.original_title}
                  overview={movie.overview}
                  poster_path={movie.poster_path}
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

// //   function PaginationBar({ page, setPage }) {
// //     const handleClickPlus = () => {
// //       console.log(page);
// //       setPage(page + 1);
// //     };

// //     const handleClickMinus = () => {
// //       if (page > 1) {
// //         setPage(page - 1);
// //       }
// //     };

// //     return (
// //       <div>
// //         <button onClick={handleClickMinus}>Previous page</button>
// //         <button onClick={handleClickPlus}>Next page</button>
// //       </div>
// //     );
// //   }
