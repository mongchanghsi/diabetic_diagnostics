import React from 'react';
import { Card } from 'react-bootstrap';
import './Login.css';
import SingPassQR from '../../assets/singpass_qrcode.png';

const SingPass: React.FC = () => {
  return (
    <Card className='card-style'>
      <Card.Body>
        <Card.Title>SingPass Login</Card.Title>
        <Card.Text>
          <img src={SingPassQR} alt='qrcode' />
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SingPass;
