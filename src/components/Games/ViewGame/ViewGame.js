import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Image from "react-bootstrap/Image";
import ReactHtmlParser from "react-html-parser";

import "bootstrap/dist/css/bootstrap.min.css";

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

	return (
		<section className="py-5 marginNav">
			<div className="container">
				<article>
					<h3 className="my-4">{game.name}</h3>
					<Image src={game.background_image} fluid rounded />
					<h4 className="my-4">Descripcion</h4>
					<p>{ReactHtmlParser(game.description)}</p>
					<div className="row">
						<div className="col-6">
							<p>
								<strong>Nota: </strong>
								{game.metacritic}
							</p>
						</div>
						<div className="col-6">
							<p>
								<strong>Fecha: </strong>
								{game.released}
							</p>
						</div>
						<div className="col-12">
							<p>
								<strong>Url: </strong>
								{game.website}
							</p>
						</div>
					</div>
				</article>
			</div>
		</section>
	);
}
