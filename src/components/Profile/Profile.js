import "bootstrap/dist/css/bootstrap.min.css";
import "./Profile.css";
import ViewReviews from '../ViewReviews/ViewReviews'

export default function Profile() {
  return (
    <div className="marginNav profile">
        {/* <TierList />
        <div className='info-user-wrapper'>
            <UserInfo />
        </div> */}
      <ViewReviews />
    </div>
  );
}
