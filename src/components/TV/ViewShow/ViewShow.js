import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Image } from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";
import Button from 'react-bootstrap/Button'
import Toast from 'react-bootstrap/Toast'
import moment from 'moment';
import { BiCommentDetail } from "react-icons/bi";
import useModal from "../../../hooks/useModal";

import "bootstrap/dist/css/bootstrap.min.css";

import { getFromTheMovieDB } from "../../../services/getFromThirdApis";

import Loading from "../../Loading/Loading";
import Seasons from "./Seasons";

import getAllReviews from "../../../services/getAllReviews";
import useUser from "../../../hooks/useUser";


export default function ViewShow() {
  const { id } = useParams();
  const {jwt} = useUser()
  const {ViewModalReview, ViewModalState} = useModal();
  const [response, setResponse] = useState({});
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      try {

        let response = await getFromTheMovieDB({ idResource: `${id}`, resourceType: "tv" });
        setResponse(response);

        const allReviews = await getAllReviews({jwt})
				const ReviewsForElement = allReviews.filter(review => (review.idElement.idApi===id && review.idElement.type==="tv"));

				setReviews(ReviewsForElement);
        setLoading(true);
      } catch (e) {
        window.location.href = "/NotFound";
      }
    }
    getData();
  }, [id, jwt]);

  const handlerReviewClick = () => {
		let idApi = id;
		let type = "tv"
		ViewModalReview({idApi, type})
    
	}

	const handlerAddClick = () => {
		let idApi = id;
		let type = "tv"
		ViewModalState({idApi, type});
	}


  if (!loading) {
    return <Loading />;
  }

  function ImageByShowId(posterPath) {
    return `https://image.tmdb.org/t/p/original/${posterPath}`;
  }

  function NetworkImage(logoPath) {
    return `https://image.tmdb.org/t/p/original/${logoPath}`
  }

  return (
    <section className="py-5 marginNav">
      <div className="container">
        <article>
          <div className="row mt-4">
            <div className="col-12 col-md-4 col-lg-3">
              <Image src={ImageByShowId(response?.poster_path)} fluid rounded />
            </div>
            <div className="col-12 col-md-8 col-lg-9">
              <h3 className="text-center mb-5">{response.name}</h3>
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
                      <strong>Primera emisión: </strong>
                      {moment(response.first_air_date).format('DD/MM/YYYY')}
                    </p>
                    <p>
                      <strong>Episodios: </strong>
                      {response.episode_run_time}
                    </p>
                    <p>
                      <strong>Genero: </strong>
                      {response.genres.map((genre, index) => {return ( <span key={index} className="badge bg-secondary mx-1">{genre.name}</span> ) })}
                    </p>
                    <div className="platafo d-flex flex-wrap">
                      <strong>Plataformas: </strong>
                      <ul className="d-flex flex-wrap">
                        {response.networks.map(nw => (
                            <li as="li" key={nw.id}>
                              <div><Image className="platafo-img" src={NetworkImage(nw.logo_path)} fluid thumbnail/></div>
                            </li>
                          ))}
                      </ul>
                    </div>
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

      <hr className="my-5"/>

      <article className="container">
      <Seasons 
            id={response.id}
            numberOfSeasons={response.number_of_seasons}
            />
      </article>

      <hr className="my-5"/>

      <article className="container">
        <Image src={ImageByShowId(response?.backdrop_path)} fluid rounded />
        <h4 className="my-4">Descripcion</h4>
        <p>{ReactHtmlParser(response.overview)}</p>
      </article>

      <hr className="my-5" />

      <article className="container pb-5">
			{reviews.length===0 ? <h3>No tine ninguna reseña</h3> : 
			reviews.map(res => {
				return (<Toast key={res._id} className="mt-2">
					<Toast.Header closeButton={false}>
						<img src="https://fakeimg.pl/20x20" className="rounded me-2" alt="" />
						<strong className="me-auto">{res.idUser.username} - {res.note}</strong>
						<small>{moment(res.created).format('DD/MM/YYYY')}</small>
						</Toast.Header>
						<Toast.Body>{res.text}</Toast.Body>
				</Toast>)
			})
			}
			</article>
    </section>
  );
}