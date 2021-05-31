import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './temp.css';

const ResultPage = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push('/');
  };

  return (
    <Card className='detail-card'>
      <Card.Body>
        <Card.Title>Result</Card.Title>
        <Card.Text>You are great! No signs of you having diabetes!</Card.Text>
        <Button onClick={handleClick}>Back to Home</Button>
      </Card.Body>
    </Card>
  );
};

export default ResultPage;
