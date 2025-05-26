import React from 'react';
import PropTypes from 'prop-types';
import { PaperClipIcon } from '@heroicons/react/24/outline';

/**
 * 첨부 파일 리스트 컴포넌트
 * 첨부된 파일 목록을 표시하고 파일 다운로드 기능을 제공합니다.
 */
const AttachmentList = ({ files = [], title = "첨부파일" }) => {
  // 파일 다운로드 처리 함수
  const handleDownload = (file) => {
    // 실제 구현에서는 서버에서 파일을 가져오는 로직이 필요합니다.
    // 여기서는 데모를 위한 임시 코드입니다.
    console.log(`Downloading file: ${file.name}`);
    
    // 실제 다운로드 로직 예시 (서버에서 파일 URL이 있을 경우)
    if (file.url) {
      const link = document.createElement('a');
      link.href = file.url;
      link.setAttribute('download', file.name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert(`${file.name} 파일 다운로드를 시작합니다.`);
    }
  };

  return (
    <div className="w-full inline-flex justify-start items-center">
      <div data-type="Table" className="self-stretch min-w-28 px-3 py-2 bg-gray-50 border border-gray-300 flex justify-center items-center gap-9">
        <div className="flex-1 text-center justify-start text-slate-800 text-sm font-normal font-['Pretendard'] leading-tight">{title}</div>
      </div>
      <div className="flex-1 p-3 border-r  border-b border-t max-h-[100px] overflow-y-auto border-gray-300 inline-flex flex-col justify-start items-start gap-2.5">
        {files.length > 0 ? (
          files.map((file, index) => (
            <div 
              key={index} 
              className="inline-flex justify-start items-center gap-2 cursor-pointer px-2 py-1 rounded-md w-full hover:bg-gray-50 transition-colors duration-150 ease-in-out group"
              onClick={() => handleDownload(file)}
            >
              <PaperClipIcon className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
              <div className="justify-end text-gray-600 text-sm font-normal font-['Pretendard'] underline leading-tight group-hover:text-blue-600">
                {file.name}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-sm text-gray-500 w-full">
            첨부된 파일이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

AttachmentList.propTypes = {
  /** 첨부 파일 목록 배열 */
  files: PropTypes.arrayOf(
    PropTypes.shape({
      /** 파일 이름 */
      name: PropTypes.string.isRequired,
      /** 파일 크기 (바이트) */
      size: PropTypes.number,
      /** 파일 다운로드 URL */
      url: PropTypes.string,
    })
  ),
  /** 컴포넌트 타이틀 */
  title: PropTypes.string,
};

export default AttachmentList; 