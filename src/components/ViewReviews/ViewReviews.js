import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Image from 'react-bootstrap/Image'
import { BiCameraMovie, BiTv } from "react-icons/bi";
import { FaGamepad, FaBook } from "react-icons/fa";
import useUser from "../../hooks/useUser";
import Loading from "../Loading/Loading";
import { getGamesFromThird, getFromTheMovieDB } from "../../services/getFromThirdApis";
import getReviewsForUser from "../../services/getReviewsForUser";
import moment from "moment";

import "./ViewReviews.css"

export default function ViewReviews(){

    const {jwt} = useUser()
    const [fetchend, setFetchend] = useState(false);
    const [elements, setElements] = useState([]);
    const [allReviews, setAllReviews] = useState([]);

    useEffect(() => {
    async function fetchData() {
        try {
            const reviews = await getReviewsForUser({jwt}) //Todas las reviews
            setAllReviews(reviews);
            console.log(reviews)
            const allElements = reviews.map((review) => {
                let res = null
                if(review.idElement.type==="game") res = getGamesFromThird({ idResource: `${review.idElement.idApi}` });
                if(review.idElement.type==="movie") res = getFromTheMovieDB({ idResource: `${review.idElement.idApi}`, resourceType: "movie" });
                if(review.idElement.type==="tv") res = getFromTheMovieDB({ idResource: `${review.idElement.idApi}`, resourceType: "tv"});

                return res;
            })
            console.log(allElements)
            Promise.all(allElements).then(res => {
                setElements(res);
                console.log(res);
                setFetchend(true);
            })
            .catch(error => console.error(error));
        } catch (e) {
            window.location.href = "/NotFound";
        }
    }
    fetchData();
    }, [jwt]);

    function ImageByMovieDB(posterPath) {
        return `https://image.tmdb.org/t/p/original/${posterPath}`;
    }

    if (!fetchend) {
        return <Loading />;
    }

    return (
        <section className="py-5 marginNav">
        <div className="container">

            {allReviews.map((review,index) => {
                return (
                    <div className="review shadow-sm mt-2" key={index}>
                <div className="row">
                    <div className="col-12 col-sm-3 ">
                        <div className="px-3 py-2 text-center text-sm-start">
                            {review.idElement.type==="movie" ? <BiCameraMovie /> : null}
                            {review.idElement.type==="game" ? <FaGamepad /> : null}
                            {review.idElement.type==="tv" ? <BiTv /> : null}
                            {review.idElement.type==="book" ? <FaBook /> : null}
                        </div>
                    </div>
                    <div className="col-12 col-sm-6">
                        <div className="px-3 py-2 text-center">
                            {elements[index].name===undefined ? elements[index].original_title : elements[index].name}
                        </div>
                    </div>
                    <div className="col-12 col-sm-3">
                        <div className="px-3 py-2 text-center text-sm-end">
                            {moment(review.created).format('DD/MM/YYYY')}
                        </div>
                    </div>
                </div>
                <div className="review-info my-4">
                    <div className="row">
                        <div className="col-12 col-md-3 d-flex align-items-center">
                            <div className="px-3">
                                {review.idElement.type==="game" ? <Image src={elements[index].background_image} fluid /> : null}
                                {review.idElement.type==="tv" || review.idElement.type==="movie" ? <Image src={ImageByMovieDB(elements[index].poster_path)} fluid /> : null}
                            </div>
                        </div>
                        <div className="col-12 col-md-9">
                            <h3 className="text-center mb-3">Review</h3>
                            <p>{review.text}</p>
                        </div>
                    </div>
                </div>
            </div>)
            })}

        </div>
        </section>
    )
}
