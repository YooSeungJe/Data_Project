import {useState, useEffect} from 'react';
import './css/Admin.css';
import * as Api from '../api.js';

export default function Admin () {
    const [asserts, setAsserts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const result = await Api.get('/report/reportlist');
          setAsserts(result.data);
        };
        fetchData();
      }, []);
    
      return (
        <div>
          {asserts.map((assert, index) => {
            return(
              <div key={index}>
                <h1>{assert.nickname}</h1>
                <p>{assert.content}</p>
                <p>{assert.assertDate}</p>
              </div>
            );
          })}
        </div>
    );
}
