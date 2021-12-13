import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Image from "react-bootstrap/Image";
import ReactHtmlParser from "react-html-parser";
import Button from 'react-bootstrap/Button'
import moment from 'moment';
import { BiCommentDetail } from "react-icons/bi";
import useModal from "../../../hooks/useModal";

import "bootstrap/dist/css/bootstrap.min.css";
import "./ViewMovie.css"

import { getFromTheMovieDB } from "../../../services/getFromThirdApis";
import getAllReviews from "../../../services/getAllReviews";
import useUser from "../../../hooks/useUser";


import Loading from "../../Loading/Loading";
import ReviewUser from "../../ReviewUser/ReviewUser";
import getDiary from "../../../services/getDiary";

export default function ViewMovie() {
  const {ViewModalReview, ViewModalState} = useModal();
  const { id } = useParams();
  const {jwt} = useUser()
  const [diary, setDiary] = useState({});
  const [response, setResponse] = useState({});
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    async function getData() {
      try {

				let response = await getFromTheMovieDB({ idResource: `${id}`, resourceType: "movie" , typeElobby: "movie" });
        setResponse(response);

        const allReviews = await getAllReviews({jwt})
				const ReviewsForElement = allReviews.filter(review => (review.idElement.idApi===id && review.idElement.type==="movie"));

        const resDiary = await getDiary({jwt});
        setDiary(resDiary);

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
		let type = "movie"
		ViewModalReview({idApi, type})

	}

	const handlerAddClick = (newElement) => {
		let idApi = id;
		let type = "movie"
		ViewModalState({idApi, type, newElement});
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
                      {diary.watching.some(res => res.idApi===id && res.type === response.typeElobby) ? <Button variant="outline-success" className="w-50 me-2" onClick={()=>handlerAddClick(false)}>Viendo</Button> : null}{' '}
                      {diary.completed.some(res => res.idApi===id && res.type === response.typeElobby) ? <Button variant="outline-primary" className="w-50 me-2" onClick={()=>handlerAddClick(false)}>Terminado</Button> : null}{' '}
                      {diary.pending.some(res => res.idApi===id && res.type === response.typeElobby) ? <Button variant="outline-info" className="w-50 me-2" onClick={()=>handlerAddClick(false)}>Pendiente</Button> : null}{' '}
                      {diary.dropped.some(res => res.idApi===id && res.type === response.typeElobby) ? <Button variant="outline-danger" className="w-50 me-2" onClick={()=>handlerAddClick(false)}>Descartado</Button> : null}{' '}
                      {diary.dropped.some(res => res.idApi===id && res.type === response.typeElobby) || diary.watching.some(res => res.idApi===id && res.type === response.typeElobby) || diary.completed.some(res => res.idApi===id && res.type === response.typeElobby) || diary.pending.some(res => res.idApi===id && res.type === response.typeElobby) ? 
                      null: <Button variant="secondary" className="w-50 me-2" onClick={()=>handlerAddClick(true)}>Añadir</Button>}{' '}
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
      <article className="container pb-5">
			{reviews.length===0 ? <h3>No tine ninguna reseña</h3> : 
			reviews.map(res => {
				return (<ReviewUser key={res._id} note={res.note} username={res.idUser.username} date={moment(res.created).format('DD/MM/YYYY')} text={res.text} />);
			})
			}
			</article>
    </section>
  );
}
