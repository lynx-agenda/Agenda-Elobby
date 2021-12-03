import './Agenda.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";

export default function MyMovies (){
    return(
        <section className=" py-5 marginNav">
      {/* <UserInfo /> */}
      <div className="container">
        <div className='state-section'>
          <h2>Siguiendo</h2>
          <div className='elements-list'>
            <Card className='list-item'>
              <Card.Img variant='top' src='https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg'/>
              <Card.Body>
                <Card.Text className='text-center'>Titulo</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div> 
        <div className='state-section'>
          <h2>Pendiente</h2>
          <div className='elements-list'>
            
          </div>
        </div> 
        <div className='state-section'>
          <h2>Terminado</h2>
          <div className='elements-list'>
            
          </div>
        </div>  
        <div className='state-section'>
          <h2>Abandonado</h2>
          <div className='elements-list'>
            
          </div>
        </div> 
      </div>
    </section>
    )
}