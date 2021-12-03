import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Profile.css";
import UserInfo from "./UserInfo";
import TierList from "./TierList";

export default function Profile() {
  return (
    <div className="marginNav profile">
        <TierList />
        <div className='info-user-wrapper'>
            <UserInfo />
        </div>
      {/* <Container>
        <Row>
          <Col md={4} className="user-info-wrapper">
            <UserInfo />
          </Col>
          <Col md={8} className="user-content">
            <TierList />
          </Col>
        </Row>
      </Container> */}
    </div>
  );
}
