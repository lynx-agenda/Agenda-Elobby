import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

export default function Movie(promps) {
  let navigate = useNavigate();

  const handlerClickMovie = () => {
    navigate(`/Movies/View/${promps.id}`);
  };

  function ImageByMovieId(posterPath) {
    return `https://image.tmdb.org/t/p/original/${posterPath}`;
  }

  return (
    <section>
      <Card onClick={handlerClickMovie}>
        <Card.Img
          variant="bottom"
          alt={promps?.original_title}
          src={ImageByMovieId(promps?.poster_path)}
        />
        <Card.Body>
          <Card.Title>Título: {promps?.original_title}</Card.Title>
          <Card.Text>Descripción: {promps?.overview}</Card.Text>
        </Card.Body>
      </Card>
    </section>
  );
}
