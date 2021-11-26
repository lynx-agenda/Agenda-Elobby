import 'bootstrap/dist/css/bootstrap.min.css';
import './NavbarMain.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom';
import * as BiIcons from 'react-icons/bi'
import * as MdIcons from 'react-icons/md'
import { useState } from 'react';


export default function NavbarMain(props){
    const [sidebar, setSidebar] = useState(!props.show)

    const showSidebar = (event) => {
        event.preventDefault()
        setSidebar(!sidebar)
        props.onShow(sidebar)
    }

    return(
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Container>
                <Link to='#' className='menu-user'>
                    {sidebar ? <BiIcons.BiUserCircle onClick={showSidebar}/> : <MdIcons.MdClose onClick={showSidebar}/>} 
                </Link>
                <Navbar.Brand href="/">Elobby</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/Movies">Peliculas</Nav.Link>
                        <Nav.Link href="/TV">Series</Nav.Link>
                        <Nav.Link href="/Games">Videojuegos</Nav.Link>
                        <Nav.Link href="/Books">Libros</Nav.Link>   
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}