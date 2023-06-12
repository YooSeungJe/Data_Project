import {useState, useEffect, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Dropdown } from 'react-bootstrap';
import './css/Admin.css';
import * as Api from '../api.js';

export default function Admin () {
    const [asserts, setAsserts] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});
    const [reportId, setReportId] = useState('');
    const [reportList, setReportList] = useState([]);
    const [blob, SetBlob] = useState(null);

    const categoryList = ['clean', '기타 혐오', '남성', '성소수자', '악플/욕설', '여성/가족', '연령', '인종/국적', '종교', '지역'];
    const navigate = useNavigate();

    const fetchData = useCallback(async () => {
      const result = await Api.get('/admin/report');
      setAsserts(result);
    },[]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const getReportList = useCallback(async () => {
      if(reportId !== ''){
        const result = await Api.get(`/admin/report/${reportId}`);
        setReportList(result);
        const result_img = await Api.getFormData(`/admin/reportphoto/${reportId}`)
        SetBlob(result_img);
      }
    }, [reportId]);

    const handleItemClick = (assert) => {
      setReportId(assert.id);
      getReportList();
      const addedAssert = {...assert, 'reportLists': reportList};
      setSelectedItem(addedAssert);
    };

    const handleCategorySelect = async (selectedCategory, content) => {
      const result = await Api.patch('/admin/report/detail', {
          reportId: reportId,
          categoryName: selectedCategory,
          content: content,
      })
      console.log(result);
      getReportList();
    };

    // reportList 의 report에 접근하기 위해서 dropdown 을 그냥 하나의 component로 빼와서 만들어버림
    const ReportDropdown = ({report, handleCategorySelect}) => {
      const handleSelect = (selectedCategory) => {
        handleCategorySelect(selectedCategory, report.content);
      }
      return (
        <Dropdown onSelect={handleSelect}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {report.category_name}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {categoryList.map((category, index) => (
              <Dropdown.Item eventKey={category} key={index}>{category}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
       </Dropdown>
      );
    }
    
    const ImageFromBlob = ({blob}) => {
      const [imageUrl, setImageUrl] = useState(null);
      useEffect(()=>{
        if(blob){
          const url = URL.createObjectURL(blob);
          setImageUrl(url);
        }
      },[blob]);
      if (!imageUrl) {
        return null;
    }
    return <img src={imageUrl} alt="From Blob"/>;
    }

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
                  상세 보기
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
              {selectedItem.reportLists && (selectedItem.reportLists.map((report, index)=>{
                return (
                  <div key={index}>
                    {report.content}
                    <ReportDropdown report={report} handleCategorySelect={handleCategorySelect}/>
                  </div>
                )
              }))}
              <ImageFromBlob blob={blob}/>
              <Button variant="danger">확인</Button>
              <Button variant="warning" onClick={()=>{setSelectedItem({})}}>취소</Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};