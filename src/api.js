import axios from 'axios';

// axios instance 생성
const instance = axios.create({
  baseURL: 
  process.env.NODE_ENV === 'development' ? '/' : 'http://localhost:3001'
});

async function post(endpoint, data) {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }

  try {
    const response = await instance.post(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
    });
    return response
  } catch (error) {
    console.error(error);
  }
 
}

const get = async (url, params) => {
  const token = localStorage.getItem('token');
  try {
    const response = await instance.get(url,{
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

export {post, get};