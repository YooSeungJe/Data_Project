import { useState } from 'react';
import './css/FileUpload.css';

export default function FileUpload({file, handleFile}) {
  const [drag, setDrag] = useState(false);

  const dragOver = e => {
    e.preventDefault();
    setDrag(true);
  };

  const dragEnter = e => {
    e.preventDefault();
    setDrag(true);
  };

  const dragLeave = e => {
    e.preventDefault();
    setDrag(false);
  };
  const fileDrop = e => {
    e.preventDefault();
    setDrag(false);
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFile(files[0]);
    }
  };

  return (
    <div className='container' style={{ padding: '0' }}>
      <div
        className={`drop-container ${drag ? 'dragged' : ''}`}
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={fileDrop}
      >
        {file ? (
          <p> 파일이 업로드 되었습니다 : {file.name}</p>
        ) : (
          <p> 증거 사진을 여기에 드래그 해주세요 </p>
        )}
      </div>
    </div>
  );
}
