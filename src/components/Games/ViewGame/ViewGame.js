import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Image from "react-bootstrap/Image";
import ReactHtmlParser from "react-html-parser";
import { FaPlaystation, FaSteam, FaXbox } from "react-icons/fa";
import Button from 'react-bootstrap/Button'
import ReviewUser from "../../ReviewUser/ReviewUser";
import moment from 'moment';
import { BiCommentDetail } from "react-icons/bi";
import getDiary from "../../../services/getDiary";



import "bootstrap/dist/css/bootstrap.min.css";
import "./ViewGame.css"

import Loading from "../../Loading/Loading";

import { getGamesFromThird } from "../../../services/getFromThirdApis";
import useModal from "../../../hooks/useModal";
import getAllReviews from "../../../services/getAllReviews";
import useUser from "../../../hooks/useUser";

export default function ViewGame() {
	const {ViewModalReview, ViewModalState} = useModal();
	const {jwt} = useUser()
	const { id } = useParams();
	const [diary, setDiary] = useState({});
	const [game, setGame] = useState({});
	const [reviews, setReviews] = useState([]);
	const [fetchend, setFetchend] = useState(false);

	useEffect(() => {
		async function fetchData() {
			try {
				
				let response = await getGamesFromThird({ idResource: `${id}`, typeElobby: "game"  });
				setGame(response);

				const allReviews = await getAllReviews({jwt})
				const ReviewsForElement = allReviews.filter(review => (review.idElement.idApi===id && review.idElement.type==="game"));

				const resDiary = await getDiary({jwt});
				setDiary(resDiary);

				setReviews(ReviewsForElement);
				setFetchend(true);
			} catch (e) {
				window.location.href = "/NotFound";
			}
		}
		fetchData();
	}, [id, jwt]);

	const handlerReviewClick = () => {
		let idApi = id;
		let type = "game"
		ViewModalReview({idApi, type})
	}

	const handlerAddClick = () => {
		let idApi = id;
		let type = "game"
		ViewModalState({idApi, type});
	}


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
							{diary.watching.some(res => res.idApi===id && res.type === game.typeElobby) ? <Button variant="outline-success" className="w-50 me-2" onClick={handlerAddClick}>Jugando</Button> : null}{' '}
							{diary.completed.some(res => res.idApi===id && res.type === game.typeElobby) ? <Button variant="outline-primary" className="w-50 me-2" onClick={handlerAddClick}>Terminado</Button> : null}{' '}
							{diary.pending.some(res => res.idApi===id && res.type === game.typeElobby) ? <Button variant="outline-info" className="w-50 me-2" onClick={handlerAddClick}>Pendiente</Button> : null}{' '}
							{diary.dropped.some(res => res.idApi===id && res.type === game.typeElobby) ? <Button variant="outline-danger" className="w-50 me-2" onClick={handlerAddClick}>Descartado</Button> : null}{' '}
							{diary.dropped.some(res => res.idApi===id && res.type === game.typeElobby) || diary.watching.some(res => res.idApi===id && res.type === game.typeElobby) || diary.completed.some(res => res.idApi===id && res.type === game.typeElobby) || diary.pending.some(res => res.idApi===id && res.type === game.typeElobby) ? 
							null: <Button variant="secondary" className="w-50 me-2" onClick={handlerAddClick}>Añadir</Button>}{' '}
                			<Button variant="outline-dark" className="w-50 " onClick={handlerReviewClick}><BiCommentDetail /> Review</Button>
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
			{reviews.length===0 ? <h3>No tine ninguna reseña</h3> : 
			reviews.map(res => {
				return (<ReviewUser key={res._id} note={res.note} username={res.idUser.username} date={moment(res.created).format('DD/MM/YYYY')} text={res.text} />);
			})
			}
			</article>
		</section>
	);
}
