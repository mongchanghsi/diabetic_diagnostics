import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import './Login.css';
import { useHistory } from 'react-router-dom';
import store from '../../store';
import { updateNRIC } from '../../utils/actions/actions';
import { ApiService } from '../../utils/api/apiService';

const NRICLogin: React.FC = () => {
  const history = useHistory();
  const [nric, setNRIC] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const result = await ApiService.login(nric);
    if (result.status === 200) {
      store.dispatch(updateNRIC(nric));
      // history.push('/userdetails');
      setError('');
      history.push({
        pathname: '/userdetails',
        state: { data: result.data },
      });
    } else {
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <Card className='card-style'>
      <Card.Body>
        <Card.Title>Normal Login</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='formNRIC'>
            <Form.Label>NRIC/FIN</Form.Label>
            <Form.Control
              type='string'
              placeholder='Enter your NRIC/FIN number'
              value={nric}
              onChange={(e) => setNRIC(e.target.value)}
            />
            {error && <p>{error}</p>}
          </Form.Group>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default NRICLogin;
