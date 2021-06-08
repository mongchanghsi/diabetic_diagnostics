import React, { useState, useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import store from '../../store';
import './UserDetails.css';
import { useHistory, useLocation } from 'react-router-dom';
import { ApiService } from '../../utils/api/apiService';

const UserDetails: React.FC = () => {
  const history = useHistory();
  const location: any = useLocation();
  const [data, setData] = useState<any>({
    nric: '',
    birthdate: location.state.data.dateOfBirth.slice(0, 10),
    lastCheckUp: location.state.data.lastCheckUp.slice(0, 10),
    status: !location.state.data.status ? 'Healthy' : 'At Risk',
    height: location.state.data.height || 0,
    weight: location.state.data.weight || 0,
  });
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const result = await ApiService.update(data.nric, data.height, data.weight);
    if (result.status === 200) {
      setError('');
      history.push('/an');
    } else {
      setError('Something went wrong. Please try again later.');
    }
  };

  useEffect(() => {
    console.log(store.getState());
    setData({ ...data, nric: store.getState().user.nric });
    // Use Redux extract the NRIC in store do a search on database for their details
    // Thereafter populate the fills
  }, []);

  return (
    <Card className='detail-card'>
      <Card.Body>
        <Card.Title>User Details Page</Card.Title>
        <Card.Text>
          Please check and update your details in this page.
        </Card.Text>
        <Card.Text>
          <strong>NRIC:</strong> {data.nric}
        </Card.Text>
        <Card.Text>
          <strong>Birth-date:</strong> {data.birthdate}
        </Card.Text>
        <Card.Text>
          <strong>Last Annual Check Up:</strong> {data.lastCheckUp}
        </Card.Text>
        <Card.Text>
          <strong>Diabetic Status:</strong> {data.status}
        </Card.Text>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='formHeight'>
            <Form.Label>Height (cm)</Form.Label>
            <Form.Control
              type='string'
              placeholder='Enter your height'
              value={data.height}
              onChange={(e) => setData({ ...data, height: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId='formWeight'>
            <Form.Label>Weight (kg)</Form.Label>
            <Form.Control
              type='string'
              placeholder='Enter your weight'
              value={data.weight}
              onChange={(e) => setData({ ...data, weight: e.target.value })}
            />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Continue
          </Button>
          {error && <p>{error}</p>}
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UserDetails;
