import "bootstrap/dist/css/bootstrap.min.css";
import Image from 'react-bootstrap/Image'
import { BiCameraMovie } from "react-icons/bi";
import { FaGamepad, FaBook } from "react-icons/fa";

import "./ViewReviews.css"

export default function ViewReviews(){
    return (
        <section className="py-5 marginNav">
        <div className="container">
            <div className="review shadow-sm mt-2">
                <div className="row">
                    <div className="col-12 col-sm-3 ">
                        <div className="px-3 py-2 text-center text-sm-start">
                            <BiCameraMovie />
                        </div>
                    </div>
                    <div className="col-12 col-sm-6">
                        <div className="px-3 py-2 text-center">
                            Venom: Let There Be Carnage
                        </div>
                    </div>
                    <div className="col-12 col-sm-3">
                        <div className="px-3 py-2 text-center text-sm-end">
                            30/09/2021
                        </div>
                    </div>
                </div>
                <div className="review-info my-4">
                    <div className="row">
                        <div className="col-12 col-md-3 d-flex align-items-center">
                            <div className="px-3">
                                <Image src="https://image.tmdb.org/t/p/original//rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg" fluid />
                            </div>
                        </div>
                        <div className="col-12 col-md-9">
                            <h3 className="text-center mb-3">Review</h3>
                            <p>After finding a host body in investigative reporter Eddie Brock, the alien symbiote must face a new enemy, Carnage, the alter ego of serial killer Cletus Kasady.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="review shadow-sm mt-2">
                <div className="row">
                    <div className="col-12 col-sm-3 ">
                        <div className="px-3 py-2 text-center text-sm-start">
                            <FaGamepad />
                        </div>
                    </div>
                    <div className="col-12 col-sm-6">
                        <div className="px-3 py-2 text-center">
                            The Witcher 3: Wild Hunt
                        </div>
                    </div>
                    <div className="col-12 col-sm-3">
                        <div className="px-3 py-2 text-center text-sm-end">
                            18/05/2015
                        </div>
                    </div>
                </div>
                <div className="review-info my-4">
                    <div className="row">
                        <div className="col-12 col-md-3 d-flex align-items-center">
                            <div className="px-3">
                                <Image src="https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg" fluid />
                            </div>
                        </div>
                        <div className="col-12 col-md-9">
                            <h3 className="text-center mb-3">Review</h3>
                            <p>The third game in a series, it holds nothing back from the player. Open world adventures of the renowned monster slayer Geralt of Rivia are now even on a larger scale. Following the source material more accurately, this time Geralt is trying to find the child of the prophecy, Ciri while making a quick coin from various contracts on the side. Great attention to the world building above all creates an immersive story, where your decisions will shape the world around you.
                                CD Project Red are infamous for the amount of work they put into their games, and it shows, because aside from classic third-person action RPG base game they provided 2 massive DLCs with unique questlines and 16 smaller DLCs, containing extra quests and items.
                                Players praise the game for its atmosphere and a wide open world that finds the balance between fantasy elements and realistic and believable mechanics, and the game deserved numerous awards for every aspect of the game, from music to direction.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="review shadow-sm mt-2">
                <div className="row">
                    <div className="col-12 col-sm-3 ">
                        <div className="px-3 py-2 text-center text-sm-start">
                            <FaBook />
                        </div>
                    </div>
                    <div className="col-12 col-sm-6">
                        <div className="px-3 py-2 text-center">
                            Harry Potter Y El Cáliz de Fuego
                        </div>
                    </div>
                    <div className="col-12 col-sm-3">
                        <div className="px-3 py-2 text-center text-sm-end">
                            08/07/2000
                        </div>
                    </div>
                </div>
                <div className="review-info my-4">
                    <div className="row">
                        <div className="col-12 col-md-3 d-flex align-items-center">
                            <div className="px-3">
                                <Image src="http://books.google.com/books/content?id=Dt2PzgEACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE71-9PqNm5nQEquT67qLJApLACXU_o5OZq3OPMr16RZfo9QQsX7CNh3mAFsFs1nANvdyzo8x4YL6DZWiQg1ZQf7DrETj9S78nOkEIhRQrWhcxy0PSmZ79RQgIWmDa_3DzoW846wn&source=gbs_api" fluid />
                            </div>
                        </div>
                        <div className="col-12 col-md-9">
                            <h3 className="text-center mb-3">Review</h3>
                            <p>Celebra el 20o aniversario de Harry Potter con esta edición especial de Harry Potter y el cáliz de fuego.
                                «Habrá tres pruebas, espaciadas en el curso escolar, que medirán a los campeones en muchos aspectos diferentes: sus habilidades mágicas, su osadía, sus dotes de deducción y, por supuesto, su capacidad para sortear el peligro.»
                                Se va a celebrar en Hogwarts el Torneo de los Tres Magos. Sólo los alumnos mayores de diecisiete años pueden participar en esta competición, pero, aun así, Harry sueña con ganarla. En Halloween, cuando el cáliz de fuego elige a los campeones, Harry se lleva una sorpresa al ver que su nombre es uno de los escogidos por el cáliz mágico. Durante el torneo deberá enfrentarse a desafíos mortales, dragones y magos tenebrosos, pero con la ayuda de Ron y Hermione, sus mejores amigos, ¡quizá logre salir con vida!</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        </section>
    )
}
