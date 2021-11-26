import "bootstrap/dist/css/bootstrap.min.css";
import './Posts.css'
import Movie from "../Movies/Movie/Movie";
export default function Posts (){
    const movie = {
        id: 550,
        original_title: 'Fight Club',
        overview: 'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground \"fight clubs\" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.',
        poster_path: 'https://image.tmdb.org/t/p/original/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg'
    }
    return(
        <div className='review-list'>
            <div className='review row'>
                <div className='col-4 review-card'>
                    {/* <Movie id={movie.id}
                    original_title={movie.original_title}
                    overview={movie.overview}
                    poster_path={movie.poster_path}/> */}
                    <img src={movie.poster_path} alt=''/>
                </div>
                <div className='col-8'>
                    <h4>Review 1</h4>
                    <p>
                        Lorem ipsum
                    </p>
                </div>
            </div>
        </div>
    )
}