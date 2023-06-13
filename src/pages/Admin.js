import {useState, useEffect, useCallback} from 'react';
import { Card, Button, Container, Row, Col, Dropdown, ButtonGroup, ToggleButton } from 'react-bootstrap';
import './css/Admin.css';
import * as Api from '../api.js';

export default function Admin () {
    const [asserts, setAsserts] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});
    const [reportId, setReportId] = useState('');
    const [blob, SetBlob] = useState(null);
    // 페이지네이션
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(1);
    const [sort, Setsort] = useState('old');
    const [statusPage, SetStatusPage] = useState('pending');

    const categoryList = ['clean', '기타 혐오', '남성', '성소수자', '악플/욕설', '여성/가족', '연령', '인종/국적', '종교', '지역'];

    const fetchData = useCallback(async () => {
      const result = await Api.get(`/admin/report?sort=${sort}&status=${statusPage}&currentPage=${currentPage}`);
      setAsserts(result.data);
      setTotalPage(result.totalPages);
    },[sort, statusPage, currentPage]);

    useEffect(() => {
        fetchData();
    }, [fetchData, sort, statusPage, currentPage]);

  // report case list를 반환하는데, 반환값을 state에 저장하지 않는 방식 선택 & reportlist 관련 사진 불러오기
    const getReportList = useCallback(async () => {
      if(reportId !== ''){
        const result = await Api.get(`/admin/report/${reportId}`);
        const result_img = await Api.getFormData(`/admin/reportphoto/${reportId}`)
        SetBlob(result_img);
        return result;
      }
    }, [reportId]);

    const handleItemClick = async (assert) => {
      setReportId(assert.id);
      const reportList = await getReportList();
      const addedAssert = {...assert, 'reportLists': reportList};
      setSelectedItem(addedAssert);
    };

  // category name 변경 함수
    const handleCategorySelect = async (selectedCategory, content) => {
      const result = await Api.patch('/admin/report/detail', {
          reportId: reportId,
          categoryName: selectedCategory,
          content: content,
      })
      const updateReportList = await getReportList();
      const addedAssert = {...selectedItem, 'reportLists': updateReportList};
      setSelectedItem(addedAssert);
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
    // 신고 사진
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
    return <img src={imageUrl} alt="From Blob" style={{display: 'block'}}/>;
    }
    // 확인 버튼 누르면 신고의 status 변경
    const handleStatus = async (report) => {
      const result = await Api.patch('/admin/status',{
        reportId : reportId,
        status : 'completed',
      })
      console.log(result);
      alert('해당 신고는 승인되었습니다')
      setSelectedItem({});
      SetBlob(null);
    }

    // 페이지 번호
    const pageNumbers = [];
    for(let i = -1; i < totalPage; i++) {
      pageNumbers.push(i+1);
    }

    // 체크 박스
    const radios = [
      { name: 'pending', value: 'pending' },
      { name: 'completed', value: 'completed' },
      { name: 'rejected', value: 'rejected' },
      { name: 'all', value: 'all' },
    ];

    useEffect(()=>{console.log(statusPage)},[statusPage]);

      return (
        <Container fluid>
      <Row>
        <Col sm={4}>
          <ButtonGroup>
            {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant={'outline-success'}
              name="radio"
              value={radio.value}
              checked={SetStatusPage === radio.value}
              onChange={(e) => SetStatusPage(e.currentTarget.value)}
            >
            {radio.name}
            </ToggleButton>
          ))}
      </ButtonGroup>
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
          <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 0}>이전</button>
          {pageNumbers.map(number => (<button key={number} onClick={() => setCurrentPage(number)} style={{ backgroundColor: number === currentPage ? 'blue' : 'white' }}>{number}</button>))}
          <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPage}>다음</button>
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
            {Object.keys(selectedItem).length !== 0 && (
              <>
                <Button variant="danger" onClick={()=>{handleStatus(selectedItem); fetchData();}}>확인</Button>
                <Button variant="warning" onClick={()=>{setSelectedItem({}); SetBlob(null);}}>취소</Button>
              </>
            )}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};