import './Agenda.css'
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function DiaryCard(props) {
    let elemento = props.elemento;
  return (
    <Link to='#' className="list-item">
      <Image
        src="https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg"
        fluid
      />
      <div className="overlay">
        <h1>Titulo</h1>
      </div>
    </Link>
  );
}
