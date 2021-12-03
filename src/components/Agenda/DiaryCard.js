import "./Agenda.css";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ImageByMovieDB(posterPath) {
  return `https://image.tmdb.org/t/p/original/${posterPath}`;
}

export default function DiaryCard(props) {
  let elemento = props.elemento;
  let navigate = useNavigate();
  let viewURL = "";
  if (elemento.typeElobby == "game") {
    viewURL = `/Games/View/${elemento.id}`;
  }
  if (elemento.typeElobby == "tv") {
    viewURL = `/TV/View/${elemento.id}`;
  }
  if (elemento.typeElobby == "movie") {
    viewURL = `/Movies/View/${elemento.id}`;
  }

  const handleClick = () => {
    navigate(viewURL);
    console.log(viewURL);
  };

  return (
    <div onClick={handleClick} className="list-item">
      {elemento.poster_path !== undefined ? (
        <Image src={ImageByMovieDB(elemento.poster_path)} fluid />
      ) : (
        <Image src={elemento.background_image} fluid />
      )}
      <div className="overlay">
        {elemento.name !== undefined ? (
          <h1>{elemento.name}</h1>
        ) : (
          <h1>{elemento.original_title}</h1>
        )}
      </div>
    </div>
  );
}
