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
  let imgSRC = '';
  let title = ''
  if (elemento.typeElobby === "game") {
    viewURL = `/Games/View/${elemento.id}`;
    imgSRC = elemento.background_image
    title = elemento.name
  }
  if (elemento.typeElobby === "tv") {
    viewURL = `/TV/View/${elemento.id}`;
    imgSRC = ImageByMovieDB(elemento.poster_path)
    title = elemento.original_title
  }
  if (elemento.typeElobby === "movie") {
    viewURL = `/Movies/View/${elemento.id}`;
    imgSRC = ImageByMovieDB(elemento.poster_path)
    title = elemento.original_title
  }
  if(elemento.typeElobby === "book") {
    viewURL = `/Books/View/${elemento.id}`;
    imgSRC = elemento.volumeInfo.imageLinks?.thumbnail
    title = elemento.volumeInfo.title
  }

  const handleClick = () => {
    navigate(viewURL);
  };

  return (
    <div onClick={handleClick} className="list-item">
      {
        <Image src={imgSRC} fluid />
      }
      <div className="overlay">
        {<h1>{title}</h1>}
      </div>
    </div>
  );
}
