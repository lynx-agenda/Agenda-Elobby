import "bootstrap/dist/css/bootstrap.min.css";
import './Landing.css'
import Login from '../Login/Login'

export default function Landing (){
    return(
        <div className='landing-page'>
            {/* <div className='container'> */}
                <div className='row'>
                    <div className='col-6 slogan'>
                        <h1>
                            Organiza y comenta tus historias favoritas.
                        </h1>
                    </div>
                    <div className='col-6 form'>
                        <Login />
                    </div>
                </div>
            {/* </div>         */}
        </div>
    )
}