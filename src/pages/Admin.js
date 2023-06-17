import { useState, useEffect, useCallback } from 'react';
import './css/Admin.css';
import buttonStyles from './css/Button.module.css';
import dropdownStyles from './css/DropDown.module.css';
import { useNavigate } from 'react-router-dom';
import * as Api from '../api.js';
import Header from './Header.js';

export default function Admin() {
  const navigate = useNavigate();
  const [asserts, setAsserts] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [reportId, setReportId] = useState('');
  const [blob, SetBlob] = useState(null);

  // assert-card 테두리 유무
  const [isCardClicked, setIsCardClicked] = useState('');

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [sort, SetSort] = useState('old');
  const [statusPage, SetStatusPage] = useState('pending');

  const fetchData = useCallback(async () => {
    try {
      const result = await Api.get(
        `/admin/report?sort=${sort}&status=${statusPage}&currentPage=${currentPage}`
      );
      setAsserts(result.data);
      setTotalPage(result.totalPages);
    } catch (error) {
      console.error(error);
      navigate('/');
      alert('접근권한이 없습니다. 넘보지마십쇼!');
    }
  }, [sort, statusPage, currentPage]);

  useEffect(() => {
    fetchData();
  }, []);

  // report case list를 반환하는데, 반환값을 state에 저장하지 않는 방식 선택 & reportlist 관련 사진 불러오기
  const getReportList = useCallback(async () => {
    if (reportId !== '') {
      const result = await Api.get(`/admin/report/${reportId}`);
      const result_img = await Api.getFormData(
        `/admin/reportphoto/${reportId}`
      );
      SetBlob(result_img);
      return result;
    }
  }, [reportId]);

  // 상세 보기
  const handleItemClick = async assert => {
    setReportId(assert.id);
    const reportList = await getReportList();
    const addedAssert = { ...assert, reportLists: reportList };
    setSelectedItem(addedAssert);
    setIsCardClicked(assert.id); // assert-card 테두리 변수
  };

  // category name 변경 함수
  const handleCategorySelect = async (selectedCategory, content) => {
    const result = await Api.patch('/admin/report/detail', {
      reportId: reportId,
      categoryName: selectedCategory,
      content: content,
    });
    const updateReportList = await getReportList();
    const addedAssert = { ...selectedItem, reportLists: updateReportList };
    setSelectedItem(addedAssert);
  };

  // reportList 의 report에 접근하기 위해서 dropdown 을 그냥 하나의 component로 빼와서 만들어버림
  const ReportDropdown = ({ report, handleCategorySelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const categoryList = [
      'clean',
      '기타 혐오',
      '남성',
      '성소수자',
      '악플/욕설',
      '여성/가족',
      '연령',
      '인종/국적',
      '종교',
      '지역',
    ];

    const handleSelect = selectedCategory => {
      handleCategorySelect(selectedCategory, report.content);
      setIsOpen(false);
    };

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
      <div className={dropdownStyles.dropdown}>
        <button className={dropdownStyles.dropdown} onClick={toggleOpen}>
          {report.category_name} &#x25BC;
        </button>
        {isOpen && (
          <div className={dropdownStyles.dropdownMenu}>
            {categoryList.map((category, index) => (
              <button
                className={dropdownStyles.dropdownItem}
                onClick={() => handleSelect(category)}
                key={index}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  // 신고 사진
  const ImageFromBlob = ({ blob }) => {
    const [imageUrl, setImageUrl] = useState(null);
    useEffect(() => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      }
    }, [blob]);
    if (!imageUrl) {
      return null;
    }
    return (
      <img
        src={imageUrl}
        alt='From Blob'
        style={{ display: 'block', width: ' 100%', borderRadius: '0.75rem' }}
      />
    );
  };

  // 확인 버튼 누르면 신고의 status 변경
  const handleStatus = async (report, statusString) => {
    const result = await Api.patch('/admin/status', {
      reportId: reportId,
      status: statusString,
    });
    console.log(result);
    alert(
      `해당 신고는 ${statusString == 'completed' ? '승인' : '거절'}되었습니다`
    );
    setSelectedItem({});
    SetBlob(null);
  };

  // 페이지 번호
  const pageNumbers = [];
  for (let i = 0; i < totalPage; i++) {
    pageNumbers.push(i);
  }

  // 체크 박스
  const statusList = ['pending', 'completed', 'rejected', 'all'];
  const sortList = ['old', 'new'];

  return (
    <>
      <Header />
      <div className='admin-container'>
        <div className='assert-container list'>
          <div className='radio-container'>
            <div className='status-container'>
              {statusList.map((stat, index) => (
                <div key={index}>
                  <input
                    type='radio'
                    id={`radio${index}`}
                    name='radioGroup1'
                    value={stat}
                    onClick={() => {
                      SetStatusPage(stat);
                    }}
                  />
                  <label for={`radio${index}`}>{stat}</label>
                </div>
              ))}
            </div>
            <div className='sort-container'>
              {sortList.map((sort, index) => (
                <div key={index}>
                  <input
                    type='radio'
                    id={`radio${index}`}
                    name='radioGroup2'
                    value={sort}
                    onClick={() => {
                      SetSort(sort);
                    }}
                  />
                  <label for={`radio${index}`}>{sort}</label>
                </div>
              ))}
            </div>
          </div>
          {asserts.map((assert, index) => (
            <div
              key={index}
              className='assert-card'
              style={{
                border: assert.id == isCardClicked ? '2px solid black' : 'none',
              }}
            >
              <div key={index * 100} className='assert-card-content'>
                <h2>신고한 분: {assert.user_id}</h2>
                <h3>가해자 닉네임: {assert.attacker_id}</h3>
              </div>
              <button className='status-button'>
                {assert.status.charAt(0)}
              </button>
              <button
                className={buttonStyles.button}
                onClick={() => handleItemClick(assert)}
              >
                <span className={buttonStyles.button_top}>상세 보기</span>
              </button>
            </div>
          ))}
          <div className='page-number'>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 0}
            >
              이전
            </button>
            {pageNumbers.map(number => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                style={{
                  backgroundColor: number === currentPage ? 'blue' : 'white',
                }}
              >
                {number + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPage - 1}
            >
              다음
            </button>
          </div>
        </div>
        <div className='assert-container content'>
          {selectedItem && (
            <div className='assert-detail-card'>
              <ImageFromBlob blob={blob} />
              <h2>가해자 닉네임: {selectedItem.attacker_id}</h2>
              <p>피해 날짜 :{selectedItem.violence_at}</p>
              <p>신고한 날짜: {selectedItem.created_at}</p>
              <p className='situation'>상황 설명: {selectedItem.content}</p>
              {selectedItem.reportLists &&
                selectedItem.reportLists.map((report, index) => {
                  return (
                    <div key={index * 1000} className='assert-detail-content'>
                      {report.content}
                      <ReportDropdown
                        report={report}
                        handleCategorySelect={handleCategorySelect}
                      />
                    </div>
                  );
                })}
              {Object.keys(selectedItem).length !== 0 && (
                <div className='okay-container'>
                  <button
                    className='okay completed'
                    onClick={() => {
                      handleStatus(selectedItem, 'completed');
                      fetchData();
                    }}
                  >
                    승인
                  </button>
                  <button
                    className='okay completed'
                    onClick={() => {
                      handleStatus(selectedItem, 'rejected');
                      fetchData();
                    }}
                  >
                    반려
                  </button>
                  <button
                    className='okay rejected'
                    onClick={() => {
                      setSelectedItem({});
                      SetBlob(null);
                    }}
                  >
                    취소
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
