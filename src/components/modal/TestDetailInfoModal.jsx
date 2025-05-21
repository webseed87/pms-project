import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from '../ui/Modal/Modal';
import Button, { BUTTON_TYPES, BUTTON_SIZES } from '../ui/Button/Button';
import FormField, { FIELD_TYPES } from '../form/FormField';
import AttachmentAdd from '../attachment/AttachmentAdd';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

/**
 * 테스트 상세 정보 모달 컴포넌트
 * 테스트 정보를 조회하고 편집할 수 있는 모달입니다.
 * 
 * @component
 * @example
 * <TestDetailInfoModal
 *   isOpen={isModalOpen}
 *   onClose={() => setIsModalOpen(false)}
 *   onSave={(data) => console.log(data)}
 * />
 */
const TestDetailInfoModal = ({ isOpen, onClose, onSave }) => {
  // 날짜 형식 변환 함수: yyyyMMdd -> yyyy-MM-dd
  const formatDateForInput = (dateString) => {
    if (!dateString || dateString.length !== 8) return '';
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    return `${year}-${month}-${day}`;
  };

  // 날짜 형식 변환 함수: yyyy-MM-dd -> yyyyMMdd
  const formatDateForData = (dateString) => {
    if (!dateString) return '';
    return dateString.replace(/-/g, '');
  };

  // 테스트 정보 상태
  const [testInfo, setTestInfo] = useState({
    projectName: '청구검색 금액 확인',
    testType: '기능개선',
    department: 'AOS2017보험사',
    startDate: formatDateForInput('20240501'),
    endDate: formatDateForInput('20250410'),
    developer: '',
    testStatus: '',
    testServer: '',
    testEndDate: '',
    testResult: '',
    description: '',
    testDate: '',
    tester: '',
    subDepartment: ''
  });

  // 첨부 파일 상태
  const [attachedFiles, setAttachedFiles] = useState([]);

  // 입력 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTestInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 날짜 변경 핸들러
  const handleDateChange = (date, name) => {
    setTestInfo(prev => ({
      ...prev,
      [name]: date ? date.toISOString().split('T')[0] : ''
    }));
  };

  // 저장 핸들러
  const handleSave = () => {
    if (onSave) {
      // 날짜 형식을 yyyyMMdd로 변환하여 저장
      const formattedData = {
        ...testInfo,
        startDate: formatDateForData(testInfo.startDate),
        endDate: formatDateForData(testInfo.endDate),
        testDate: formatDateForData(testInfo.testDate),
        testEndDate: formatDateForData(testInfo.testEndDate),
        attachments: attachedFiles
      };
      
      onSave(formattedData);
    }
    onClose();
  };

  // 첨부파일 변경 핸들러
  const handleFilesChange = (files) => {
    setAttachedFiles(files);
  };

  // 헤더 액션 버튼
  const headerButtons = (
    <div className="flex space-x-2">
      <Button
        buttonType={BUTTON_TYPES.PRIMARY}
        size={BUTTON_SIZES.MEDIUM}
        onClick={handleSave}
      >
        저장
      </Button>
      <Button
        buttonType={BUTTON_TYPES.LINE}
        size={BUTTON_SIZES.MEDIUM}
        onClick={onClose}
      >
        수정
      </Button>
    </div>
  );

  // 상태 옵션
  const statusOptions = [
    { value: "", label: "값을 선택해주세요." },
    { value: "진행중", label: "진행중" },
    { value: "완료", label: "완료" },
    { value: "대기", label: "대기" }
  ];

  // 개발자 옵션
  const developerOptions = [
    { value: "", label: "값을 선택해주세요." },
    { value: "개발자1", label: "개발자1" },
    { value: "개발자2", label: "개발자2" }
  ];

  // 테스트 유형 옵션
  const testTypeOptions = [
    { value: "", label: "값을 선택해주세요." },
    { value: "기능 테스트", label: "기능 테스트" },
    { value: "통합 테스트", label: "통합 테스트" },
    { value: "성능 테스트", label: "성능 테스트" }
  ];

  // 서버 옵션
  const serverOptions = [
    { value: "", label: "값을 선택해주세요." },
    { value: "서버1", label: "서버1" },
    { value: "서버2", label: "서버2" }
  ];

  // 테스트 결과 옵션
  const resultOptions = [
    { value: "", label: "값을 선택해주세요." },
    { value: "성공", label: "성공" },
    { value: "실패", label: "실패" },
    { value: "보류", label: "보류" }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="테스트 상세 정보"
      width="max-w-6xl"
      headerActions={headerButtons}
    >
      <div className="space-y-4">
        {/* 주요 정보 영역 */}
        <div className="flex flex-wrap border-t border-l border-r border-gray-300">
       
            {/* 과제명 */}
            <FormField
              type={FIELD_TYPES.INPUT}
              label="과제명"
              name="projectName"
              value={testInfo.projectName}
              onChange={handleInputChange}
              disabled
              fullWidth
            />

  
            {/* 개발구분 */}
            <FormField
              type={FIELD_TYPES.INPUT}
              label="개발구분"
              name="testType"
              value={testInfo.testType}
              disabled
              onChange={handleInputChange}
            />
            
            {/* 업무명 */}
            <FormField
              type={FIELD_TYPES.INPUT}
              label="업무명"
              name="department"
              disabled
              value={testInfo.department}
              onChange={handleInputChange}
            />
            
            {/* 세부 업무명 */}
            <FormField
              type={FIELD_TYPES.INPUT}
              label="세부 업무명"
              name="subDepartment"
              value={testInfo.subDepartment}
              onChange={handleInputChange}
            />
            
            {/* 시작일자 */}
            <FormField
              type={FIELD_TYPES.DATE}
              label="시작일자"
              name="startDate"
              selected={testInfo.startDate ? new Date(testInfo.startDate) : null}
              onChange={(date) => handleDateChange(date, 'startDate')}
              dateFormat="yyyy-MM-dd"
            />
            
            {/* 종료일자 */}
            <FormField
              type={FIELD_TYPES.DATE}
              label="종료일자"
              name="endDate"
              selected={testInfo.endDate ? new Date(testInfo.endDate) : null}
              onChange={(date) => handleDateChange(date, 'endDate')}
              dateFormat="yyyy-MM-dd"
            />
            
            {/* 과제상태 */}
            <FormField
              type={FIELD_TYPES.SELECT}
              label="과제상태"
              name="testStatus"
              value={testInfo.testStatus}
              onChange={handleInputChange}
              options={statusOptions}
            />
            
            {/* 테스트담당자 */}
            <FormField
              type={FIELD_TYPES.INPUT}
              label="테스트담당자"
              name="tester"
              value={testInfo.tester}
              onChange={handleInputChange}
              placeholder="오늘날짜 자동세팅"
            />
            
            {/* 테스트 종료일자 */}
            <FormField
              type={FIELD_TYPES.DATE}
              label="테스트 종료일자"
              name="testEndDate"
              selected={testInfo.testEndDate ? new Date(testInfo.testEndDate) : null}
              onChange={(date) => handleDateChange(date, 'testEndDate')}
              dateFormat="yyyy-MM-dd"
            />
            
            {/* 개발자 */}
            <FormField
              type={FIELD_TYPES.SELECT}
              label="개발자"
              name="developer"
              value={testInfo.developer}
              onChange={handleInputChange}
              options={developerOptions}
            />
            
            {/* 테스트유형 */}
            <FormField
              type={FIELD_TYPES.SELECT}
              label="테스트유형"
              name="testTypeOption"
              value={testInfo.testTypeOption}
              onChange={handleInputChange}
              options={testTypeOptions}
            />
            
            {/* 테스트서버 */}
            <FormField
              type={FIELD_TYPES.SELECT}
              label="테스트서버"
              name="testServer"
              value={testInfo.testServer}
              onChange={handleInputChange}
              options={serverOptions}
            />
            
            {/* 테스트 요일일 */}
            <FormField
              type={FIELD_TYPES.DATE}
              label="테스트 요일일"
              name="testDate"
              selected={testInfo.testDate ? new Date(testInfo.testDate) : null}
              onChange={(date) => handleDateChange(date, 'testDate')}
              dateFormat="yyyy-MM-dd"
            />
        

        
            {/* 테스트 결과 */}
            <FormField
              type={FIELD_TYPES.SELECT}
              label="테스트 결과"
              name="testResult"
              value={testInfo.testResult}
              onChange={handleInputChange}
              options={resultOptions}
              fullWidth
            />
            
            {/* 내용 */}
            <FormField
              type={FIELD_TYPES.TEXTAREA}
              label="내용"
              name="description"
              value={testInfo.description}
              onChange={handleInputChange}
              placeholder="테스트 타스 입니다..."
              rows={4}
              fullWidth
            />
  
        </div>
        
        {/* 첨부 파일 영역 */}
        <div >
          <AttachmentAdd onFilesChange={handleFilesChange} />
        </div>
      </div>
    </Modal>
  );
};

TestDetailInfoModal.propTypes = {
  /** 모달 열림 여부 */
  isOpen: PropTypes.bool.isRequired,
  
  /** 모달 닫기 핸들러 */
  onClose: PropTypes.func.isRequired,
  
  /** 저장 핸들러 */
  onSave: PropTypes.func
};

export default TestDetailInfoModal; 