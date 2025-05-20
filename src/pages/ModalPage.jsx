import React, { useState } from 'react';
import Button from '../components/ui/Button';
import DeveloperSearchModal from '../components/modal/DeveloperSearchModal';
import Tab, { TAB_POSITIONS, ICON_POSITIONS } from '../components/ui/Tab/Tab';

/**
 * 모달 페이지
 * 다양한 모달 컴포넌트의 사용 예제를 보여주는 페이지입니다.
 */
const ModalPage = () => {
  // 개발자 조회 모달 상태
  const [isDeveloperModalOpen, setIsDeveloperModalOpen] = useState(false);
  
  // 선택된 개발자 상태
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);
  
  // 탭 설정
  const tabs = [
    {
      label: '개발자 조회 모달',
      content: (
        <div className="p-6 space-y-6">
          <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">개발자 조회 모달</h2>
            <p className="text-gray-600 mb-4">
              개발자 정보를 검색하고 선택할 수 있는 모달 팝업 컴포넌트입니다.
              조회 버튼을 클릭하여 모달을 열고, 개발자를 선택하면 해당 정보가 표시됩니다.
            </p>
            
            <div className="flex flex-col space-y-4">
              <Button 
                className="w-48 bg-blue-700 text-white"
                onClick={() => setIsDeveloperModalOpen(true)}
              >
                개발자 조회 모달 열기
              </Button>
              
              {selectedDeveloper && (
                <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-md">
                  <h3 className="font-medium mb-2">선택된 개발자 정보:</h3>
                  <p>이름: {selectedDeveloper.name}</p>
                  <p>거래처: {selectedDeveloper.company || '정보 없음'}</p>
                  <p>이메일: {selectedDeveloper.email || '정보 없음'}</p>
                  <p>연락처: {selectedDeveloper.handphone || '정보 없음'}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">모달 사용법</h2>
            <div className="bg-gray-50 p-4 rounded-md font-mono text-sm overflow-auto">
              {`
// 모달 상태 관리
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedDeveloper, setSelectedDeveloper] = useState(null);

// 모달 컴포넌트 사용
<DeveloperSearchModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onSelect={(developer) => setSelectedDeveloper(developer)}
/>

// 모달 열기 버튼
<Button onClick={() => setIsModalOpen(true)}>
  모달 열기
</Button>
              `}
            </div>
          </div>
        </div>
      )
    },
    {
      label: '기타 모달 예제',
      content: (
        <div className="p-6">
          <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">준비 중</h2>
            <p className="text-gray-600">
              추가 모달 예제가 준비 중입니다. 곧 업데이트될 예정입니다.
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6 px-4">모달 컴포넌트</h1>
        
        <div className="bg-white rounded-md shadow-sm overflow-hidden">
          <Tab 
            tabs={tabs}
            defaultActiveTab={0}
            iconPosition={ICON_POSITIONS.RIGHT}
          />
        </div>
        
        {/* 개발자 조회 모달 */}
        <DeveloperSearchModal
          isOpen={isDeveloperModalOpen}
          onClose={() => setIsDeveloperModalOpen(false)}
          onSelect={(developer) => setSelectedDeveloper(developer)}
        />
      </div>
    </div>
  );
};

export default ModalPage; 