import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Image from "react-bootstrap/Image";
import ReactHtmlParser from "react-html-parser";
import Button from "react-bootstrap/Button";
import moment from "moment";
import { BiCommentDetail, BiTrim } from "react-icons/bi";
import useModal from "../../../hooks/useModal";
import "bootstrap/dist/css/bootstrap.min.css";
import getAllReviews from "../../../services/getAllReviews";
import useUser from "../../../hooks/useUser";
import Loading from "../../Loading/Loading";
import ReviewUser from "../../ReviewUser/ReviewUser";
import getDiary from "../../../services/getDiary";
import '../../Movies/ViewMovie/ViewMovie.css'

export default function ViewMovie() {
  const { ViewModalReview, ViewModalState } = useModal();
  const { id } = useParams();
  const { jwt } = useUser();
  const [diary, setDiary] = useState({});
  const [response, setResponse] = useState({});
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(
          "https://www.googleapis.com/books/v1/volumes/" + id
        );
        const data = await response.json();
        setResponse(data);
        console.log(data);

        const allReviews = await getAllReviews({ jwt });
        const ReviewsForElement = allReviews.filter(
          (review) =>
            review.idElement.idApi === id && review.idElement.type === "book"
        );

        const resDiary = await getDiary({ jwt });
        setDiary(resDiary);

        setReviews(ReviewsForElement);
        setLoading(true);
      } catch (e) {
        console.log(e);
        // window.location.href = "/NotFound";
      }
    }
    getData();
  }, [id, jwt]);

  const handlerReviewClick = () => {
    let idApi = id;
    let type = "book";
    ViewModalReview({ idApi, type });
  };

  const handlerAddClick = () => {
    let idApi = id;
    let type = "book";
    ViewModalState({ idApi, type });
  };

  function SeparateGenres(categories) {
    const genres = categories[0].split('/')
    console.log(genres)
    return(
        <>
            {genres.map((genre, index) => {
                return ( 
                <span key={index} className="badge bg-secondary mx-1">{genre.trim()}</span> 
                )
            })}
        </>
    )
  }
  if (!loading) {
    return <Loading />;
  }

  return (
    <section className="py-5 marginNav">
      <div className="container">
        <article>
          <div className="row mt-4">
            <div className="col-12 col-md-4 col-lg-3">
              <Image
                src={response.volumeInfo.imageLinks?.large !== undefined
                    ? response.volumeInfo.imageLinks.large
                    : response.volumeInfo.imageLinks?.thumbnail !== undefined
                    ? response.volumeInfo.imageLinks.thumbnail
                    : "Thumbnail"}
                className="book-image"
                fluid
                rounded
              />
            </div>
            <div className="col-12 col-md-8 col-lg-9">
              <h3 className="text-left mb-5">{response.volumeInfo.title}</h3>
              <div className="row">
                <div className="col-12 d-flex justify-content-center">
                  <div>
                    <p>
                      <strong>Fecha de publicación: </strong>
                      {moment(response.volumeInfo.publishedDate).format(
                        "DD/MM/YYYY"
                      )}
                    </p>
                    <p>
                      <strong>Páginas: </strong>
                      {response.volumeInfo.pageCount}
                    </p>
                    <p>
                      <strong>Género: </strong>
                      {SeparateGenres(response.volumeInfo.categories)}
                    </p>
                    <div className="d-flex">
                      {diary.watching.some(
                        (res) =>
                          res.idApi === id && res.type === response.typeElobby
                      ) ? (
                        <Button
                          variant="outline-success"
                          className="w-50 me-2"
                          onClick={handlerAddClick}
                        >
                          Viendo
                        </Button>
                      ) : null}{" "}
                      {diary.completed.some(
                        (res) =>
                          res.idApi === id && res.type === response.typeElobby
                      ) ? (
                        <Button
                          variant="outline-primary"
                          className="w-50 me-2"
                          onClick={handlerAddClick}
                        >
                          Terminado
                        </Button>
                      ) : null}{" "}
                      {diary.pending.some(
                        (res) =>
                          res.idApi === id && res.type === response.typeElobby
                      ) ? (
                        <Button
                          variant="outline-info"
                          className="w-50 me-2"
                          onClick={handlerAddClick}
                        >
                          Pendiente
                        </Button>
                      ) : null}{" "}
                      {diary.dropped.some(
                        (res) =>
                          res.idApi === id && res.type === response.typeElobby
                      ) ? (
                        <Button
                          variant="outline-danger"
                          className="w-50 me-2"
                          onClick={handlerAddClick}
                        >
                          Descartado
                        </Button>
                      ) : null}{" "}
                      {diary.dropped.some(
                        (res) =>
                          res.idApi === id && res.type === response.typeElobby
                      ) ||
                      diary.watching.some(
                        (res) =>
                          res.idApi === id && res.type === response.typeElobby
                      ) ||
                      diary.completed.some(
                        (res) =>
                          res.idApi === id && res.type === response.typeElobby
                      ) ||
                      diary.pending.some(
                        (res) =>
                          res.idApi === id && res.type === response.typeElobby
                      ) ? null : (
                        <Button
                          variant="secondary"
                          className="w-50 me-2"
                          onClick={handlerAddClick}
                        >
                          Añadir
                        </Button>
                      )}{" "}
                      <Button
                        variant="outline-dark"
                        className="w-50 "
                        onClick={handlerReviewClick}
                      >
                        <BiCommentDetail /> Review
                      </Button>
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
        <h4 className="my-4">Descripción</h4>
        <div>{ReactHtmlParser(response.volumeInfo.description)}</div>
      </article>
      <hr className="my-5" />
      <article className="container pb-5">
        {reviews.length === 0 ? (
          <h3>No tine ninguna reseña</h3>
        ) : (
          reviews.map((res) => {
            return (
              <ReviewUser
                key={res._id}
                note={res.note}
                username={res.idUser.username}
                date={moment(res.created).format("DD/MM/YYYY")}
                text={res.text}
              />
            );
          })
        )}
      </article>
    </section>
  );
}
