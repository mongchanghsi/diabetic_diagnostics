import React from 'react';
import { Row, Col } from 'react-bootstrap';
import NRICLogin from '../components/Login/NRICLogin';
import SingPass from '../components/Login/SingPass';

const Home: React.FC = () => {
  return (
    <Row>
      <Col>
        <NRICLogin />
      </Col>
      <Col>
        <SingPass />
      </Col>
    </Row>
  );
};

export default Home;
