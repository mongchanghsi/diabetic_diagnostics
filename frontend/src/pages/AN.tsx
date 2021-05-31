import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './temp.css';

const AN = () => {
  const history = useHistory();
  const handleClick = () => {
    console.log('clicking');
    history.push('/foot');
  };

  return (
    <Card className='detail-card'>
      <Card.Body>
        <Card.Title>Phase 1: Checking for Acanthosis Nigricans</Card.Title>
        <Card.Text>
          Please align your head to the marking in blue infront of you.
        </Card.Text>
        <Card.Text>
          Once aligned, please press the button to continue.
        </Card.Text>
        <Button onClick={handleClick}>Continue</Button>
      </Card.Body>
    </Card>
  );
};

export default AN;
