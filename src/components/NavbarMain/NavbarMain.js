import 'bootstrap/dist/css/bootstrap.min.css';
import './NavbarMain.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

export default function NavbarMain(){
    return(
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
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