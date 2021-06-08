import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './temp.css';
import LoadingGIF from '../assets/loading-gif.gif';
import { ApiService } from '../utils/api/apiService';

const AN = () => {
  const history = useHistory();
  const [photoStatus, setPhotoStatus] =
    useState<'waiting' | 'taking' | 'finished'>('waiting');
  const handleClick = async () => {
    console.log('clicking');
    setPhotoStatus('taking');
    const result = await ApiService.take_an();
    if (result.status === 200) {
      history.push('/foot');
    }
    setPhotoStatus('finished');
  };

  return (
    <Card className='detail-card'>
      <Card.Body>
        <Card.Title>Phase 1: Checking for Acanthosis Nigricans</Card.Title>
        {photoStatus === 'waiting' && (
          <>
            <Card.Text>
              Please align your head to the marking in blue infront of you.
            </Card.Text>
            <Card.Text>
              Once aligned, please press the button to continue.
            </Card.Text>
            <Button onClick={handleClick}>Continue</Button>
          </>
        )}

        {photoStatus === 'taking' && <img src={LoadingGIF} alt='loading-gif' />}

        {photoStatus === 'finished' && (
          <>
            <Card.Text>
              Encounter an error, please position again and press continue.
            </Card.Text>
            <Button onClick={handleClick}>Continue</Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default AN;
