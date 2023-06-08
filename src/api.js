import axios from 'axios';

// axios instance 생성
const instance = axios.create({
  baseURL: 'http://localhost:3001' // Postman mockserver의 URL
});

async function post(endpoint, data) {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }

  return instance.post(endpoint, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    },
  });
}

const get = async (url, params) => {
  try {
    const response = await instance.get(url, { params });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export {post, get};