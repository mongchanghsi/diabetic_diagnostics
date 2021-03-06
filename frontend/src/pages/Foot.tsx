import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './temp.css';
import LoadingGIF from '../assets/loading-gif.gif';
import { ApiService } from '../utils/api/apiService';
import store from '../store';
import {
  storeLeftFootImage,
  storeRightFootImage,
} from '../utils/actions/actions';

const Foot = () => {
  const history = useHistory();
  const [stage1, setStage1] = useState<boolean>(true);
  const [photoStatus, setPhotoStatus] =
    useState<'waiting' | 'taking' | 'finished'>('waiting');

  const saveImageInDB = async () => {
    console.log('this is coming from saveImageInDB');
    console.log(store.getState());
  };

  const firstPhoto = async () => {
    setPhotoStatus('taking');
    const result = await ApiService.take_foot();
    if (result.status === 200) {
      console.log('stage1', result.data);
      store.dispatch(storeLeftFootImage(result.data.base64_image));
      setStage1(false);
      setPhotoStatus('waiting');
    } else {
      setPhotoStatus('finished');
    }
  };

  const secondPhoto = async () => {
    setPhotoStatus('taking');
    const result = await ApiService.take_foot();
    if (result.status === 200) {
      console.log('stage2', result.data);
      store.dispatch(storeRightFootImage(result.data.base64_image));

      saveImageInDB();

      history.push('/result');
    } else {
      setPhotoStatus('finished');
    }
  };

  return (
    <Card className='detail-card'>
      <Card.Body>
        <Card.Title>Phase 2: Checking for Diabetic Foot Disease</Card.Title>
        {photoStatus === 'waiting' && (
          <>
            <Card.Text>
              Please place your {stage1 ? <>left</> : <>right</>} foot into the
              box below
            </Card.Text>
            <Card.Text>
              Once your foot is in, please press the button to continue
            </Card.Text>
            <Button onClick={stage1 ? firstPhoto : secondPhoto}>
              Continue
            </Button>
          </>
        )}

        {photoStatus === 'taking' && <img src={LoadingGIF} alt='loading-gif' />}

        {photoStatus === 'finished' && (
          <>
            <Card.Text>
              Encounter an error, please position again and press continue.
            </Card.Text>
            <Button onClick={stage1 ? firstPhoto : secondPhoto}>
              Continue
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default Foot;
