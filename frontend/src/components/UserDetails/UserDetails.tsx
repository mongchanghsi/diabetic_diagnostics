import React, { useState, useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import store from '../../store';
import './UserDetails.css';
import { useHistory } from 'react-router-dom';

const UserDetails: React.FC = () => {
  const history = useHistory();
  const [data, setData] = useState<any>({
    nric: '',
    birthdate: '',
    lastCheckUp: '',
    status: '',
    height: '',
    weight: '',
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(data);
    history.push('/an');
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
            <Form.Label>Height</Form.Label>
            <Form.Control
              type='string'
              placeholder='Enter your height'
              value={data.height}
              onChange={(e) => setData({ ...data, height: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId='formWeight'>
            <Form.Label>Weight</Form.Label>
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
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UserDetails;
