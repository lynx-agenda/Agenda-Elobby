import SidebarAgenda from "./SidebarAgenda";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import * as BiIcons from "react-icons/bi";

import "./Sidebar.css";
import useUser from "../../hooks/useUser";
import logo from "../../img/lince.png";

export default function Sidebar() {
  const { logout } = useUser();
  return (
    <div className="nav-menu marginNav md-12">
      <div className="nav-menu-items">
        <img src={logo} className="avatar" alt="avatar" />
        <SidebarAgenda />
        <ul className="sidebar-list">
          <li className="sidebar-item">
            <Link to="/Profile">
              <BiIcons.BiUser />
              <span> Profile</span>
            </Link>
          </li>
          {/* <li className='sidebar-item'>
                        <Link to='/Settings'><GoIcons.GoSettings /><span> Settings</span></Link>
                    </li> */}
          <li className="sidebar-item">
            <Link to="/TierList">
              <BiIcons.BiUser />
              <span> My Tierlist</span>
            </Link>
          </li>
          <li className="sidebar-item" onClick={logout}>
            <Link to="/">
              <BiIcons.BiLogOut />
              <span> Log Out</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
