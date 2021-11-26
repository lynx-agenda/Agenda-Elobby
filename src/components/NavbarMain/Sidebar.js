import SidebarAgenda from "./SidebarAgenda"
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom"
import * as BiIcons from 'react-icons/bi'
import * as GoIcons from 'react-icons/go'
import './Sidebar.css'

export default function Sidebar (){
    return (
        <div className='nav-menu marginNav md-12'>
            <div className='nav-menu-items'>
                <img src='https://fakeimg.pl/300/' className='avatar' alt='avatar'/>
                <SidebarAgenda />
                <ul className='sidebar-list'>
                    <li className='sidebar-item'>
                        <Link to='/Profile'><BiIcons.BiUser /><span> Profile</span></Link>
                    </li>
                    <li className='sidebar-item'>
                        <Link to='/Settings'><GoIcons.GoSettings /><span> Settings</span></Link>
                    </li>
                    <li className='sidebar-item'>
                        <Link to='#'><BiIcons.BiLogOut /><span> Log Out</span></Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}