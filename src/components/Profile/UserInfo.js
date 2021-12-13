import "bootstrap/dist/css/bootstrap.min.css";
import "./UserInfo.css";

export default function UserInfo() {

  return (
    <div className="user-info ">
      {/* <img src='https://fakeimg.pl/250x250/005077/' alt='avatar' className='profile-avatar'/> */}
      <h2 id="username">Username</h2>
      {/* <Button variant='outline-light'><AiIcons.AiOutlineUserAdd /> </Button> */}
    </div>
  );
}
