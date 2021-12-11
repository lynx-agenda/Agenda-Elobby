import "bootstrap/dist/css/bootstrap.min.css";
import "./UserInfo.css";
import getUser from "../../services/getUser";
import useUser from "../../hooks/useUser";
import { useEffect, useState } from "react";

export default function UserInfo() {
  const { jwt } = useUser();

  return (
    <div className="user-info ">
      {/* <img src='https://fakeimg.pl/250x250/005077/' alt='avatar' className='profile-avatar'/> */}
      <h2 id="username">Username</h2>
      {/* <Button variant='outline-light'><AiIcons.AiOutlineUserAdd /> </Button> */}
    </div>
  );
}
