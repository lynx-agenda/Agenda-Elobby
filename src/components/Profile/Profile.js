import { Container, Row, Col } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css";
import './Profile.css'
import UserInfo from "./UserInfo";
import TierList from "./TierList";
import Posts from "./Posts";

export default function Profile (){

    return(
        <Container className='marginNav profile'>
            <Row>
                <Col md={4} className='user-info-wrapper'>
                    <UserInfo />
                </Col>
                <Col md={8} className='user-content'>
                    {/* <TierList />
                    <Posts /> */}
                </Col>
            </Row>
        </Container>
    )
}