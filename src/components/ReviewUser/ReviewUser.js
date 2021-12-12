import "bootstrap/dist/css/bootstrap.min.css";
import "./ReviewUser.css"

export default function ReviewUser(promps) {

    return(
        <div className="w-100 container user-review shadow mt-4">
            <div className="d-flex mt-1">
                <div className="d-flex justify-content-center align-items-center">
                    {promps.note<5 ? <span className="user-review-note bad">{promps.note}</span> : null}
                    {promps.note>=5 && promps.note<7 ? <span className="user-review-note nice">{promps.note}</span> : null}
                    {promps.note>=7 && promps.note<9 ? <span className="user-review-note great">{promps.note}</span> : null}
                    {promps.note>=9 ? <span className="user-review-note spectacular">{promps.note}</span> : null}
                </div>
                <div className="user-review-info">
                    <p>{promps.username}</p>
                    <p>{promps.date}</p>
                </div>
            </div>
            <p className="mt-2">{promps.text}</p>
        </div>
    );
}