import {useState, useEffect} from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import './css/Admin.css';
import * as Api from '../api.js';

export default function Admin () {
    const [asserts, setAsserts] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});

    useEffect(() => {
        const fetchData = async () => {
          const result = await Api.get('/admin/report');
          console.log(result);
          setAsserts(result);
        };  
        fetchData();
      }, []);

      const handleItemClick = (assert) => {
        setSelectedItem(assert);
      };
    
      return (
        <Container fluid>
      <Row>
        <Col sm={4}>
          {asserts.map((assert) => (
            <Card key={assert.userId} style={{ marginBottom: '10px' }}>
              <Card.Body>
                <Card.Title>{assert.attackerId}</Card.Title>
                <Button variant="primary" onClick={() => handleItemClick(assert)}>
                  Select
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Col>
        <Col sm={8}>
          {selectedItem && (
            <div>
              <h2>{selectedItem.attackerId}</h2>
              <p>{selectedItem.content}</p>
              <p>{selectedItem.violenceAt}</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};