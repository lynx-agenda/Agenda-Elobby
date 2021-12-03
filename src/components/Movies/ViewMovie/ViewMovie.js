import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Image from "react-bootstrap/Image";
import ReactHtmlParser from "react-html-parser";
import Button from 'react-bootstrap/Button'
import Toast from 'react-bootstrap/Toast'
import moment from 'moment';
import { BiCommentDetail } from "react-icons/bi";
import useModal from "../../../hooks/useModal";

import "bootstrap/dist/css/bootstrap.min.css";
import "./ViewMovie.css"

import { getFromTheMovieDB } from "../../../services/getFromThirdApis";

import { getFromTheMovieDB } from "../../../services/getFromThirdApis";

import Loading from "../../Loading/Loading";

export default function ViewMovie() {
  const {ViewModalReview, ViewModalState} = useModal();
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

  const handlerReviewClick = () => {
		let type = "Pelicula"
		ViewModalReview({type})
	}

	const handlerAddClick = () => {
		ViewModalState()
	}


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
          <div className="row mt-4">
            <div className="col-12 col-md-4 col-lg-3">
              <Image src={ImageByMovieId(response?.poster_path)} fluid rounded />
            </div>
            <div className="col-12 col-md-8 col-lg-9">
              <h3 className="text-center mb-5">{response.title}</h3>
              <div className="row">
                <div className="col-12 col-md-4 d-flex justify-content-center align-items-center mb-md-0 mb-4">
                  {response.vote_average < 5 ? <div className="note bad"> {response.vote_average.toFixed(1)} </div>: null}
                  {response.vote_average >= 5 && response.vote_average < 7 ? <div className="note nice"> {response.vote_average.toFixed(1)} </div>: null}
                  {response.vote_average >= 7 && response.vote_average < 9 ? <div className="note great"> {response.vote_average.toFixed(1)} </div>: null}
                  {response.vote_average >= 9 ? <div className="note spectacular"> {response.vote_average.toFixed(1)} </div>: null}
                </div>
                <div className="col-12 col-md-8 d-flex justify-content-center">
                  <div>
                    <p>
                      <strong>Estreno: </strong>
                      {moment(response.release_date).format('DD/MM/YYYY')}
                    </p>
                    <p>
                      <strong>Duración: </strong>
                      {moment().startOf('day').add(response.runtime, 'minutes').format('hh:mm')}
                    </p>
                    <p>
                      <strong>Genero: </strong>
                      {response.genres.map((genre, index) => {return ( <span key={index} className="badge bg-secondary mx-1">{genre.name}</span> ) })}
                    </p>
                    <div className="d-flex">
                      <Button variant="secondary" className="w-50 me-2" onClick={handlerAddClick}>Añadir</Button>{' '}
                      <Button variant="outline-dark" className="w-50 " onClick={handlerReviewClick}><BiCommentDetail /> Review</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
      <hr className="my-5" />
      <article className="container">
        <Image src={ImageByMovieId(response?.backdrop_path)} fluid rounded />
        <h4 className="my-4">Descripcion</h4>
        <p>{ReactHtmlParser(response.overview)}</p>
      </article>
      <hr className="my-5" />
      <article className="container">
      <Toast>
        <Toast.Header closeButton={false}>
          <img src="https://fakeimg.pl/20x20" className="rounded me-2" alt="" />
          <strong className="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
      </Toast>
      </article>
    </section>
  );
}
