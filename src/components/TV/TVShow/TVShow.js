import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

export default function TVShow(props) {
  let navigate = useNavigate();

  const handlerClickShow = () => {
    navigate(`/TV/View/${props.id}`);
  };

  function ImageByShowId(posterPath) {
    return `https://image.tmdb.org/t/p/original/${posterPath}`;
  }

  const cardStyle = { cursor: "pointer" };

  return (
    <section className="mt-4">
      <Card
        onClick={handlerClickShow}
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
          alt={props?.original_name}
          src={ImageByShowId(props?.poster_path)}
          style={props.isHorizontal ? { width: "inherit" } : {}}
        />
        <Card.Body>
          <Card.Title>Título: {props?.original_name}</Card.Title>
          {!props.isHorizontal && (
            <Card.Text>Descripción: {props?.overview}</Card.Text>
          )}
        </Card.Body>
      </Card>
    </section>
  );
}
