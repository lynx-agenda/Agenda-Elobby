import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Image from "react-bootstrap/Image";
import ReactHtmlParser from "react-html-parser";

import "bootstrap/dist/css/bootstrap.min.css";

import { getFromTheMovieDB } from "../../../services/getFromThirdApis";

import Loading from "../../Loading/Loading";

export default function ViewMovie() {
  const { id } = useParams();
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    async function getData() {
      try {

				let response = await getFromTheMovieDB({ idResource: `${id}`, resourceType: "movie" });

        setResponse(response);
        setLoading(true);
      } catch (e) {
        window.location.href = "/NotFound";
      }
    }
    getData();
  }, [id]);

  if (!loading) {
    return <Loading />;
  }

  function ImageByMovieId(posterPath) {
    return `https://image.tmdb.org/t/p/original/${posterPath}`;
  }

  return (
    <section className="py-5 marginNav">
      <div className="container">
        <article>
          <h3 className="my-4">{response.title}</h3>
          <Image src={ImageByMovieId(response?.poster_path)} fluid rounded />
          <h4 className="my-4">Descripcion</h4>
          <p>{ReactHtmlParser(response.overview)}</p>
          <div className="row">
            <div className="col-6">
              <p>
                <strong>Nota: </strong>
                {response.vote_average}
              </p>
            </div>
            <div className="col-6">
              <p>
                <strong>Fecha: </strong>
                {response.release_date}
              </p>
            </div>
            {/* <div className="col-12">
              <p>
                <strong>Url: </strong>
                {response.website}***
              </p>
            </div> */}
          </div>
        </article>
      </div>
    </section>
  );
}
