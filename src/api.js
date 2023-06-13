import axios from 'axios';

// axios instance 생성
const instance = axios.create({
  baseURL: 
  // process.env.NODE_ENV === 'development' ? '/' : 
  'http://localhost:3001'
});

// report에서 신고할 때(formdata)
const postFormData = async (endpoint, data) => {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  const token = localStorage.getItem('token');
  try {
    const response = await instance.post(endpoint, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      },
    });
    return response
  } catch (error) {
    console.error(error);
  }
}

// 사진 받아올 때(formdata, blob) , err) endpoint 다음 자리는 config 자리다!!
const getFormData = async (endpoint) => {
  const token = localStorage.getItem('token');
  try {
    const response = await instance.get(endpoint,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob", // blob 데이터로 받기 위해 responseType 설정
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// 일반적으로 정보를 받아올 때(json)
const get = async (endpoint, params) => {
  const token = localStorage.getItem('token');
  try {
    const response = await instance.get(endpoint,{
      params,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }});
    return response.data; //response가 아니라 response.data를 반환해줘야 한다고 함
  } catch (error) {
    console.error(error);
  }
}

// 어떤 정보의 일부를 수정할 때(json) : status, category_name 등
const patch = async (endpoint, data) => {
  const token = localStorage.getItem('token');
  try {
    const response = await instance.patch(endpoint, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }});
    return response;
  } catch (error) {
    console.error(error);
  }
}

export {postFormData, getFormData, get, patch};