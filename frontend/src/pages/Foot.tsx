import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './temp.css';

const Foot = () => {
  const history = useHistory();
  const [stage1, setStage1] = useState<boolean>(true);
  const firstPhoto = () => {
    console.log('firstPhoto');
    setStage1(false);
  };

  const secondPhoto = () => {
    console.log('secondPhoto');
    history.push('/result');
  };

  return (
    <Card className='detail-card'>
      <Card.Body>
        <Card.Title>Phase 2: Checking for Diabetic Foot Disease</Card.Title>
        <Card.Text>
          Please place your {stage1 ? <>left</> : <>right</>} foot into the box
          below
        </Card.Text>
        <Card.Text>
          Once your foot is in, please press the button to continue
        </Card.Text>
        <Button onClick={stage1 ? firstPhoto : secondPhoto}>Continue</Button>
      </Card.Body>
    </Card>
  );
};

export default Foot;
