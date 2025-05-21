import React, { useState } from 'react';
import Button, { BUTTON_TYPES, BUTTON_SIZES } from '../components/ui/Button/Button';
import TestDetailInfoModal from '../components/modal/TestDetailInfoModal';

/**
 * 테스트 상세 정보 모달 예제 페이지
 */
const TestDetailInfoExample = () => {
  // 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 저장된 데이터 상태
  const [savedData, setSavedData] = useState(null);

  // 모달 열기 핸들러
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 저장 핸들러
  const handleSave = (data) => {
    console.log('저장된 테스트 정보:', data);
    setSavedData(data);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">테스트 상세 정보 모달 예제</h1>
      
      <div className="mb-8">
        <Button
          buttonType={BUTTON_TYPES.PRIMARY}
          size={BUTTON_SIZES.MEDIUM}
          onClick={handleOpenModal}
        >
          테스트 상세 정보 모달 열기
        </Button>
      </div>
      
      {/* 모달 컴포넌트 */}
      <TestDetailInfoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
      
      {/* 저장된 데이터 표시 */}
      {savedData && (
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-4">저장된 테스트 정보</h2>
          <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
            {JSON.stringify(savedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default TestDetailInfoExample; 