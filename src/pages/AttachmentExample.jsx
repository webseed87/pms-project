import React, { useState } from 'react';
import AttachmentList from '../components/attachment/AttachmentList';
import AttachmentAdd from '../components/attachment/AttachmentAdd';

/**
 * 첨부 파일 컴포넌트 사용 예제 페이지
 */
const AttachmentExample = () => {
  // 샘플 첨부 파일 데이터
  const sampleFiles = [
    {
      name: '제안요청서 - ○ ○ ○ 유지보수 프로젝트 운영.DOC',
      size: 2048000,
      url: '#' // 실제 구현에서는 실제 URL로 대체
    },
    {
      name: '제안요청서 - ○ ○ ○ 유지보수 프로젝트 운영.DOC',
      size: 1536000,
      url: '#'
    }
  ];

  const additionalFiles = [
    {
      name: '계약서 - 2024년도 서비스 계약.PDF',
      size: 3145728,
      url: '#'
    },
    {
      name: '명세서 - 프로젝트 요구사항 정의서.XLSX',
      size: 1048576,
      url: '#'
    }
  ];

  // 파일 업로드 관련 상태
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFilesChange = (files) => {
    setUploadedFiles(files);
    console.log('파일 목록 업데이트:', files);
  };

  return (
    <div className="p-6 bg-white">
      <h1 className="text-xl font-bold mb-6">첨부 파일 컴포넌트 예제</h1>
      
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-lg font-semibold mb-4">기본 첨부 파일 목록</h2>
          <AttachmentList files={sampleFiles} />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-4">사용자 정의 타이틀</h2>
          <AttachmentList 
            files={additionalFiles} 
            title="참고 자료" 
          />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-4">빈 첨부 파일 목록</h2>
          <AttachmentList files={[]} />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">첨부 파일 추가 컴포넌트</h2>
          <p className="text-gray-600 mb-4">
            파일을 추가하고 삭제할 수 있는 컴포넌트입니다. 파일을 선택하여 업로드하고, 체크박스로 선택한 파일을 삭제할 수 있습니다.
          </p>
          
          <AttachmentAdd onFilesChange={handleFilesChange} />
        </div>
        
        <div className="mt-4">
          <h3 className="text-md font-semibold mb-2">업로드된 파일 정보</h3>
          <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">
            {uploadedFiles.length > 0 
              ? JSON.stringify(uploadedFiles.map(f => ({
                  name: f.name,
                  size: f.size,
                  type: f.type,
                  date: f.date
                })), null, 2)
              : '아직 업로드된 파일이 없습니다.'}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default AttachmentExample; 