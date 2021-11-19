import Spinner from 'react-bootstrap/Spinner';
import './Loading.css';

export default function Loading() {
    return (
        <div className="loading">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
        );
}