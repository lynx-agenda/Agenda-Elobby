import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

export default function TVShow(promps) {
  let navigate = useNavigate();

  const handlerClickShow = () => {
    navigate(`/TV/View/${promps.id}`);
  };

  function ImageByShowId(posterPath) {
    return `https://image.tmdb.org/t/p/original/${posterPath}`;
  }

  return (
    <section>
      <Card onClick={handlerClickShow}>
        <Card.Img
          variant="bottom"
          alt={promps?.original_name}
          src={ImageByShowId(promps?.poster_path)}
        />
        <Card.Body>
          <Card.Title>Título: {promps?.original_name}</Card.Title>
          <Card.Text>Descripción: {promps?.overview}</Card.Text>
        </Card.Body>
      </Card>
    </section>
  );
}