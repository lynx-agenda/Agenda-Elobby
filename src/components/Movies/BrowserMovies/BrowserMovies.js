import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import { getFromTheMovieDB } from "../../../services/getFromThirdApis";

import Movie from "../Movie/Movie";
import Search from "../../Search/Search";
import Loading from "../../Loading/Loading";
import queryApi from "../../../lib/queryApi";
import type from "../../../lib/types.enum";

export default function BrowserMovies() {
  const { text } = useParams();
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const response = await queryApi({ text, type: type.movies });
        setResponse(response);
        setLoading(true);
      } catch (e) {
        window.location.href = "/NotFound";
      }
    }
    getData();
  }, [text]);

	if (!loading) {
		return <Loading />;
	}

  if (response?.results === 0) {
    return (
      <section className="section py-5 marginNav">
        <div className="container">
          <h3>Ninguna película encontrado</h3>
        </div>
      </section>
    );
  } else {
    return (
      <section className="py-5 marginNav">
        <div className="container">
          <Search url="/Movies/Browser/" />
          <div className="row">
            {response.results.map((movie) => {
              return (
                <div key={movie.id} className="col-12 col-md-3">
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
        </div>
      </section>
    );
  }
}
