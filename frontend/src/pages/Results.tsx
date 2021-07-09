import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './temp.css';
import store from '../store';
import { ApiService } from '../utils/api/apiService';

const ResultPage = () => {
  const history = useHistory();
  const [anStatus, setANStatus] = useState<boolean | null>(null);
  const [lfStatus, setLFStatus] = useState<boolean | null>(null);
  const [rfStatus, setRFStatus] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [followUp, setFollowUp] = useState<boolean>(false);

  const handleClick = () => {
    history.push('/');
  };
  // console.log(store.getState());

  const predicting_an = async () => {
    const result = await ApiService.predict_an(
      store.getState().image.an_base64
    );
    console.log('The AN result is', result.data);
    setANStatus(result.data === 'positive' ? true : false);
  };

  const predicting_left_foot = async () => {
    const result = await ApiService.predict_foot(
      store.getState().image.left_foot_base64
    );
    console.log('The LF result is', result.data);
    setLFStatus(result.data === 'positive' ? true : false);
  };

  const predicting_right_foot = async () => {
    const result = await ApiService.predict_foot(
      store.getState().image.right_foot_base64
    );
    console.log('The RF result is', result.data);
    setRFStatus(result.data === 'positive' ? true : false);
  };

  useEffect(() => {
    predicting_an();
    predicting_left_foot();
    predicting_right_foot();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      typeof anStatus === 'boolean' &&
      typeof lfStatus === 'boolean' &&
      typeof rfStatus === 'boolean'
    ) {
      console.log(anStatus, lfStatus, rfStatus);
      if (anStatus || lfStatus || rfStatus) {
        setFollowUp(true);
      }

      setLoading(true);
    }
  }, [anStatus, lfStatus, rfStatus]);

  return (
    <Card className='detail-card'>
      {loading ? (
        <Card.Body>
          <Card.Title>Result</Card.Title>
          {followUp ? (
            <>
              <Card.Text>
                You are at risk of getting pre-diabetes! Please book your
                in-depth diagnostic appointment through the HealthHub app!
              </Card.Text>
            </>
          ) : (
            <>
              <Card.Text>
                You are great! No signs of you having diabetes!
              </Card.Text>
            </>
          )}
          <Button onClick={handleClick}>Back to Home</Button>
        </Card.Body>
      ) : (
        <p> loading </p>
      )}
    </Card>
  );
};

export default ResultPage;
