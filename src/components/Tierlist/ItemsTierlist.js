import "./Tierlist.css";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ImageByMovieDB(posterPath) {
  return `https://image.tmdb.org/t/p/original/${posterPath}`;
}

export default function ItemTierlist(props) {
  let elemento = props.elemento;
  let navigate = useNavigate();
  let viewURL = "";
  if (elemento.typeElobby === "game") {
    viewURL = `/Games/View/${elemento.id}`;
  }
  if (elemento.typeElobby === "tv") {
    viewURL = `/TV/View/${elemento.id}`;
  }
  if (elemento.typeElobby === "movie") {
    viewURL = `/Movies/View/${elemento.id}`;
  }

  const handleClick = () => {
    navigate(viewURL);
  };

  return (
    <>
      {elemento.poster_path !== undefined ? (
        <Image
          className="list-item-tierlist"
          onClick={handleClick}
          src={ImageByMovieDB(elemento.poster_path)}
          fluid
        />
      ) : (
        <Image
          className="list-item-tierlist"
          onClick={handleClick}
          src={elemento.background_image}
          fluid
        />
      )}
    </>
  );
}
