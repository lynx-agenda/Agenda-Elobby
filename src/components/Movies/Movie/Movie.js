import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

export default function Movie(props) {
  let navigate = useNavigate();

  const handlerClickMovie = () => {
    navigate(`/Movies/View/${props.id}`);
  };

  function ImageByMovieId(posterPath) {
    return `https://image.tmdb.org/t/p/original/${posterPath}`;
  }

  const cardStyle = { cursor: "pointer" };

  return (
      <Card
        onClick={handlerClickMovie}
        style={
          props.isHorizontal
            ? {
                display: "flex",
                flexDirection: "row",
                height: "50px",
                maxHeight: "50px",
                ...cardStyle,
              }
            : cardStyle
        }
      >
        <Card.Img
          variant="bottom"
          alt={props?.original_title}
          src={ImageByMovieId(props?.poster_path)}
          style={props.isHorizontal ? { width: "inherit" } : {}}
        />
        <Card.Body>
          <Card.Title>{props?.original_title}</Card.Title>
          {!props.isHorizontal && (
            <Card.Text>{props?.overview}</Card.Text>
          )}
        </Card.Body>
      </Card>
  );
}
