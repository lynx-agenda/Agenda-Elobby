import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import TVShow from "../TVShow/TVShow";
import Search from "../../Search/Search";
import Loading from "../../Loading/Loading";

export default function BrowserTV() {
  const { text } = useParams();
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const url = `https://api.themoviedb.org/3/search/tv?api_key=d6c7a342258732312d949314913635e7&query=${text}`;

  useEffect(() => {
    async function getData() {
      try {
        let response = await fetch(url);
        response = await response.json();
        setResponse(response);
        setLoading(true);
      } catch (e) {
        window.location.href = "/NotFound";
      }
    }
    getData();
  }, [url]);

  if (!loading) {
    return <Loading />;
  }

  if (response.results === 0) {
    return (
      <section className="section py-5 marginNav">
        <div className="container">
          <h3>Ninguna serie encontrada</h3>
        </div>
      </section>
    );
  } else {
    return (
      <section className="py-5 marginNav">
        <div className="container">
          <Search url="/TV/Browser/" />
          <div className="row">
            {response.results.map((show) => {
              return (
                <div key={show.id} className="col-12 col-md-3">
                  <TVShow
                    id={show.id}
                    original_name={show.original_name}
                    overview={show.overview}
                    poster_path={show.poster_path}
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
