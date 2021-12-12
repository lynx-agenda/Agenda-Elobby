import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

export default function Movie(props) {
  let navigate = useNavigate();

  function ImageByMovieId(posterPath) {
    return `https://image.tmdb.org/t/p/original/${posterPath}`;
  }

  const [srcImage, setSrcImage] = useState(ImageByMovieId(props?.poster_path));

  const handlerClickMovie = () => {
    navigate(`/Movies/View/${props.id}`);
  };

  const cardStyle = { cursor: "pointer" };
  const imageStyle = { display: !srcImage ? "none" : "inherit" };

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
        onError={(_e) => {
          setSrcImage(undefined);
        }}
        alt={props?.original_title}
        src={srcImage}
        style={
          props.isHorizontal ? { width: "inherit", ...imageStyle } : imageStyle
        }
      />
      <Card.Body>
        <Card.Title>{props?.original_title}</Card.Title>

        {!props.isHorizontal && (
          <Card.Text>
            {props?.overview?.length < 60
              ? props?.overview
              : props?.overview.slice(0, 60) + "..."}
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  );
}
