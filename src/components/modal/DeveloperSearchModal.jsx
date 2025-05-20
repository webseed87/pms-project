import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../ui/Modal/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Label from '../ui/Label';

/**
 * 개발자 조회 모달 컴포넌트
 * 개발자와 거래처 정보를 검색하고 조회할 수 있는 모달입니다.
 * 
 * @component
 * @example
 * <DeveloperSearchModal
 *   isOpen={isModalOpen}
 *   onClose={() => setIsModalOpen(false)}
 *   onSelect={(developer) => console.log(developer)}
 * />
 */
const DeveloperSearchModal = ({ isOpen, onClose, onSelect }) => {
  // 검색어 상태
  const [developerName, setDeveloperName] = useState('');
  const [companyName, setCompanyName] = useState('');
  
  // 개발자 목록 (실제로는 API 호출 등으로 데이터를 가져와야 함)
  const [developers] = useState([
    { id: 1, name: '홍길동', company: '', email: '', handphone: '' },
    { id: 2, name: '홍길동', company: '', email: '', handphone: '' },
    { id: 3, name: '홍길동', company: '', email: '', handphone: '' },
  ]);

  // 검색 핸들러
  const handleSearch = () => {
    // 실제로는 여기서 API 호출 등을 통해 검색 수행
    console.log('검색:', developerName, companyName);
  };

  // 개발자 선택 핸들러
  const handleSelectDeveloper = (developer) => {
    if (onSelect) {
      onSelect(developer);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="개발자 조회"
      width="max-w-4xl"
    >
      <div className="space-y-6">
        {/* 검색 영역 */}
        <div className="flex ">
          <div className="flex w-full items-center">
            <Label labelType="box" className="w-24 h-12 flex items-center justify-center">
              개발자 명
            </Label>
            <div className="self-stretch h-14 p-2.5 outline outline-1 outline-offset-[-1px] outline-gray-300 inline-flex justify-start items-center gap-2.5">
            <Input
              className="w-48 h-12 border-l-0"
              value={developerName}
              onChange={(e) => setDeveloperName(e.target.value)}
            />
            </div>
          </div>
          
          <div className="flex items-center w-full">
            <Label labelType="box" className="w-24 h-12 flex items-center justify-center">
              거래처 명
            </Label>
            <div className="self-stretch h-14 p-2.5 outline outline-1 outline-offset-[-1px] outline-gray-300 inline-flex justify-start items-center gap-2.5">

            <Input
              className="w-48 h-12 border-l-0"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            </div>
          </div>
          
          <Button 
            type="primary"
            size="medium"
            onClick={handleSearch}
            className="w-40"
          >
            조회
          </Button>
        </div>
        
        {/* 테이블 영역 */}
        <div className="border border-gray-300">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 text-center text-sm font-medium text-gray-700 border-r border-gray-300 w-16">No.</th>
                <th className="py-3 px-4 text-center text-sm font-medium text-gray-700 border-r border-gray-300">개발자</th>
                <th className="py-3 px-4 text-center text-sm font-medium text-gray-700 border-r border-gray-300">거래처 명</th>
                <th className="py-3 px-4 text-center text-sm font-medium text-gray-700 border-r border-gray-300">이메일</th>
                <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">핸드폰</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              {developers.map((developer, index) => (
                <tr 
                  key={developer.id}
                  className="hover:bg-blue-50 cursor-pointer"
                  onClick={() => handleSelectDeveloper(developer)}
                >
                  <td className="py-3 px-4 text-center text-sm text-gray-700 border-r border-gray-300">{index + 1}</td>
                  <td className="py-3 px-4 text-center text-sm text-gray-700 border-r border-gray-300">{developer.name}</td>
                  <td className="py-3 px-4 text-center text-sm text-gray-700 border-r border-gray-300">{developer.company}</td>
                  <td className="py-3 px-4 text-center text-sm text-gray-700 border-r border-gray-300">{developer.email}</td>
                  <td className="py-3 px-4 text-center text-sm text-gray-700">{developer.handphone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
};

DeveloperSearchModal.propTypes = {
  /** 모달 열림 여부 */
  isOpen: PropTypes.bool.isRequired,
  
  /** 모달 닫기 핸들러 */
  onClose: PropTypes.func.isRequired,
  
  /** 개발자 선택 핸들러 */
  onSelect: PropTypes.func
};

export default DeveloperSearchModal; 