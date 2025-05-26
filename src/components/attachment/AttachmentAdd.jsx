import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Button, { BUTTON_TYPES, BUTTON_SIZES } from '../ui/Button/Button';
import Checkbox from '../ui/Checkbox/Checkbox';

/**
 * 첨부 파일 추가 컴포넌트
 * 파일 업로드, 선택 및 삭제 기능을 제공합니다.
 */
const AttachmentAdd = ({ onFilesChange }) => {
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  // 파일 추가 핸들러
  const handleFileAdd = (e) => {
    const newFiles = Array.from(e.target.files).map(file => ({
      id: Date.now() + Math.random().toString(36).substring(2, 9),
      name: file.name,
      type: file.type,
      size: file.size,
      file: file,
      date: new Date().toISOString().split('T')[0],
      uploader: '사용자', // 실제 구현에서는 로그인된 사용자 정보를 사용
    }));

    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    
    if (onFilesChange) {
      onFilesChange(updatedFiles);
    }
  };

  // 파일 삭제 핸들러
  const handleFileDelete = () => {
    if (selectedFiles.length === 0) return;
    
    const updatedFiles = files.filter(file => !selectedFiles.includes(file.id));
    setFiles(updatedFiles);
    setSelectedFiles([]);
    
    if (onFilesChange) {
      onFilesChange(updatedFiles);
    }
  };

  // 파일 체크박스 핸들러
  const handleFileSelect = (fileId) => {
    setSelectedFiles(prev => {
      if (prev.includes(fileId)) {
        return prev.filter(id => id !== fileId);
      } else {
        return [...prev, fileId];
      }
    });
  };

  // 전체 선택 핸들러
  const handleSelectAll = (e) => {
    const isChecked = e.target ? e.target.checked : e;
    if (isChecked) {
      setSelectedFiles(files.map(file => file.id));
    } else {
      setSelectedFiles([]);
    }
  };

  // 파일 크기 포맷팅
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // 파일 종류 추출
  const getFileType = (fileName) => {
    const extension = fileName.split('.').pop().toUpperCase();
    return extension;
  };

  return (
    <div className="w-full">
      {/* 버튼 영역 */}
      <div className="flex justify-end space-x-2 mb-2">
        <Button
          buttonType={BUTTON_TYPES.ADD}
          size={BUTTON_SIZES.MEDIUM}
          icon={<PlusIcon />}
          onClick={() => fileInputRef.current.click()}
        >
          파일 추가
        </Button>
        <Button
          buttonType={BUTTON_TYPES.DELETE}
          size={BUTTON_SIZES.MEDIUM}
          icon={<TrashIcon />}
          disabled={selectedFiles.length === 0}
          onClick={handleFileDelete}
        >
          삭제
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileAdd}
          multiple
          className="hidden"
        />
      </div>

      {/* 테이블 영역 */}
      <div className="w-full border border-gray-300 max-h-[200px] overflow-y-auto">
        <table className="w-full text-sm text-gray-600">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-300 sticky top-0 z-10">
              <th className="w-12 py-2 px-3 text-center h-10">
                <div className="flex items-center justify-center h-full">
                  <Checkbox 
                    checked={selectedFiles.length > 0 && selectedFiles.length === files.length}
                    onChange={handleSelectAll}
                  />
                </div>
              </th>
              <th className="w-16 py-2 px-3 text-center">No.</th>
              <th className="py-2 px-3 text-left">문서명</th>
              <th className="w-24 py-2 px-3 text-center">문서종류</th>
              <th className="w-24 py-2 px-3 text-center">문서크기</th>
              <th className="w-32 py-2 px-3 text-center">첨부일자</th>
              <th className="w-24 py-2 px-3 text-center">첨부자</th>
            </tr>
          </thead>
          <tbody>
            {files.length > 0 ? (
              files.map((file, index) => (
                <tr 
                  key={file.id}
                  className={`border-b border-gray-200 hover:bg-gray-50 ${selectedFiles.includes(file.id) ? 'bg-blue-50' : ''}`}
                >
                  <td className="py-2 px-3 text-center h-10">
                    <div className="flex items-center justify-center h-full">
                      <Checkbox 
                        checked={selectedFiles.includes(file.id)}
                        onChange={() => handleFileSelect(file.id)}
                      />
                    </div>
                  </td>
                  <td className="py-2 px-3 text-center">{index + 1}</td>
                  <td className="py-2 px-3 text-left">{file.name}</td>
                  <td className="py-2 px-3 text-center">{getFileType(file.name)}</td>
                  <td className="py-2 px-3 text-center">{formatFileSize(file.size)}</td>
                  <td className="py-2 px-3 text-center">{file.date}</td>
                  <td className="py-2 px-3 text-center">{file.uploader}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-4 text-center text-gray-500 ">
                  첨부된 파일이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

AttachmentAdd.propTypes = {
  /** 파일 변경 시 호출될 콜백 함수 */
  onFilesChange: PropTypes.func
};

export default AttachmentAdd; 