import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Image } from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";

import "bootstrap/dist/css/bootstrap.min.css";

import Loading from "../../Loading/Loading";
import Seasons from "./Seasons";

export default function ViewShow() {
  const { id } = useParams();
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const url = `https://api.themoviedb.org/3/tv/${id}?api_key=d6c7a342258732312d949314913635e7`;

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

  function ImageByShowId(posterPath) {
    return `https://image.tmdb.org/t/p/original/${posterPath}`;
  }

  function NetworkImage(logoPath) {
    return `https://image.tmdb.org/t/p/original/${logoPath}`
  }

  function ListGenres(genres) {
    let string = ``
    for(let k = 0; k<genres.length; k++){
      string += genres[k].name + ', '
    }
    string = string.slice(0, string.length-2)
    return string
  }

  return (
    <section className="py-5 marginNav">
      <div className="container">
        <article>
          <h3 className="my-4">{response.name}</h3>
          <Image src={ImageByShowId(response?.poster_path)} fluid rounded />
          <h4 className="my-4">Descripcion</h4>
          <p>{ReactHtmlParser(response.overview)}</p>
          <div className="row">
            <div className="col-4">
              <p>
                <strong>Nota: </strong>
                {response.vote_average}
              </p>
            </div>
            <div className="col-4">
              <p>
                <strong>Primera emisión: </strong>
                {response.first_air_date}
              </p>
            </div>
            <div className="col-4">
              <p>
                <strong>Episodios: </strong>
                {response.episode_run_time}
              </p>
            </div>
          </div>
          <div className='row'>
            <div className='col-4'>
              <h4>Plataformas</h4>
              <ul>
                {
                  response.networks.map(nw => (
                    <li as="li" key={nw.id} className='row'>
                      <div className='col-6'><Image src={NetworkImage(nw.logo_path)} fluid thumbnail/></div>
                      <p className='col-6'>{nw.name}</p>
                    </li>
                  ))
                }
              </ul>
            </div>
            <div className='col-4'>
              <p>
                <strong>Episodios: </strong>
                {response.episode_run_time}
              </p>
            </div>
            <div className='col-4'>
              <p>
                <strong>Géneros: </strong>
                {ListGenres(response.genres)}
              </p>
            </div>
          </div>
            <Seasons 
            id={response.id}
            numberOfSeasons={response.number_of_seasons}
            />
        </article>
      </div>
    </section>
  );
}