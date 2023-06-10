import {useState, useEffect} from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import './css/Admin.css';
import * as Api from '../api.js';

export default function Admin () {
    const [asserts, setAsserts] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});
    const [reportId, setReportId] = useState('');
    const [reportList, setReportList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const result = await Api.get('/admin/report');
          setAsserts(result);
        };  
        fetchData();
    }, []);

    useEffect(() => {
      const getReportList = async () => {
        if(reportId !== ''){
          const result = await Api.get(`/admin/report/${reportId}`);
          setReportList(result);
        }
      };
        getReportList();
    }, [reportId]);

    useEffect(() => {
      console.log(reportList);
    }, [reportList]);

    useEffect(() => {
      console.log(asserts);
    }, [asserts]);

      const handleItemClick = (assert) => {
        setSelectedItem(assert);
        setReportId(assert.id);
      };
    
      return (
        <Container fluid>
      <Row>
        <Col sm={4}>
          {asserts.map((assert) => (
            <Card key={assert.Id} style={{ marginBottom: '10px' }}>
              <Card.Body>
                <Card.Title>{assert.user_id}</Card.Title>
                <Card.Subtitle>{assert.attacker_id}</Card.Subtitle>
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
              <h2>{selectedItem.attacker_id}</h2>
              <p>{selectedItem.content}</p>
              <p>{selectedItem.violence_at}</p>
              {reportList && (reportList.map((report)=>{
                return (
                  <p>{report.content}</p>
                )
              }))}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};