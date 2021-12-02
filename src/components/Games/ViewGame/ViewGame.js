import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Image from "react-bootstrap/Image";
import ReactHtmlParser from "react-html-parser";
import { FaPlaystation, FaSteam, FaXbox } from "react-icons/fa";
import Button from 'react-bootstrap/Button'
import Toast from 'react-bootstrap/Toast'
import moment from 'moment';
import { BiCommentDetail } from "react-icons/bi";

import "bootstrap/dist/css/bootstrap.min.css";
import "./ViewGame.css"

import Loading from "../../Loading/Loading";

import { getGamesFromThird } from "../../../services/getFromThirdApis";

export default function ViewGame() {
	const { id } = useParams();
	const [game, setGame] = useState({});
	const [fetchend, setFetchend] = useState(false);

	useEffect(() => {
		async function fetchData() {
			try {
				
				let response = await getGamesFromThird({ idResource: `${id}` });
        
				setGame(response);
				setFetchend(true);
			} catch (e) {
				window.location.href = "/NotFound";
			}
		}
		fetchData();
	}, [id]);

	if (!fetchend) {
		return <Loading />;
	}

	if (game.detail === "Not found.") window.location.href = "/NotFound";

	const mystyle = {
		backgroundImage: `url(${game.background_image})`,
	};

	return (
		<section className="marginNav">
			<div className="background-game" style={mystyle}>
				<div className="content-game-info d-flex justify-content-center align-items-center">
					<div>
						<div className="d-flex justify-content-center">
							<FaPlaystation className="mx-2"/>
							<FaXbox className="mx-2"/>
							<FaSteam className="mx-2"/>
						</div>
						<h1 className="text-center">{game.name}</h1>
						<div className="d-grid gap-2">
							<Button variant="outline-light mx-5" size="lg" onClick={() => window.location.href = game.website}>Ver mas</Button>
						</div>
					</div>
				</div>
			</div>
			<div className="container py-5">
				<article>
					<div className="row">
						<div className="col-12 col-md-4 d-flex justify-content-center align-items-center">
							{game.metacritic < 50 ? <div className="note bad mb-sm-5"> {game.metacritic} </div>: null}
							{game.metacritic >= 50 && game.metacritic < 70 ? <div className="note nice mb-sm-5"> {game.metacritic} </div>: null}
							{game.metacritic >= 70 && game.metacritic < 90 ? <div className="note great mb-sm-5"> {game.metacritic} </div>: null}
							{game.metacritic >= 90 ? <div className="note spectacular mb-sm-5"> {game.metacritic} </div>: null}
        				</div>
						<div className="col-12 col-md-4">
							<p>
								<strong>Fecha salida: </strong>
								{moment(game.released).format('DD/MM/YYYY')}
							</p>
							<p>
								<strong>Ultima actualización: </strong>
								{moment(game.updated).format('DD/MM/YYYY')}
							</p>
							<p>
                    			<strong>Genero: </strong>
                				{game.genres.map((genre, index) => {return ( <span key={index} className="badge bg-secondary mx-1">{genre.name}</span> ) })}
            				</p>
							<div className="d-flex">
                				<Button variant="secondary" className="w-50 me-2">Añadir</Button>{' '}
                				<Button variant="outline-dark" className="w-50 "><BiCommentDetail /> Review</Button>
                    		</div>
						</div>
					</div>
				</article>
			</div>
			<hr className="my-5" />
			<article className="container">
				<h3 className="my-4">{game.name}</h3>
					<Image src={game.background_image_additional} fluid rounded />
					<h4 className="my-4">Descripcion</h4>
					<div>{ReactHtmlParser(game.description)}</div>
			</article>
			<hr className="my-5" />
			<article className="container pb-5">
			<Toast>
				<Toast.Header closeButton={false}>
					<img src="https://fakeimg.pl/20x20" className="rounded me-2" alt="" />
					<strong className="me-auto">Bootstrap</strong>
					<small>11 mins ago</small>
					</Toast.Header>
					<Toast.Body>Hello, world! This is a toast message.</Toast.Body>
			</Toast>
			</article>
		</section>
	);
}
