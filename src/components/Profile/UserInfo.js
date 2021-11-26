import "bootstrap/dist/css/bootstrap.min.css";
import './UserInfo.css'
import Button from 'react-bootstrap/Button'

export default function UserInfo() {

    return (
        <div className='user-info'>
                <img src='https://fakeimg.pl/300/' alt='avatar' className='avatar'/>
                <h2 id='username'>Username</h2>
                <Button variant='secondary'>Follow</Button>
                <ul className='user-data'>
                    <li><span>Interests:</span> Intereses</li>
                    <li><span>Origin:</span> Region</li>
                    <li><span>Joined:</span> Fecha</li>
                </ul>
                {/* <h2 id='about'><span>Interests:</span>Intereses</div>
                <div id='origin'><span>Origin:</span>Region</div>
                <div id='date'><span>Joined:</span>Fecha</div> */}
        </div>
    )
}