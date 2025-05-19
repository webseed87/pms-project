import React, { useState } from 'react';
import Select, { SELECT_SIZES } from './Select';

const SelectExample = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  // 기본 옵션 예시
  const options = [
    { value: 'option1', label: '옵션 1' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' }
  ];

  // 회사 옵션 예시
  const companyOptions = [
    { value: 'haneul', label: '한얼아이티' },
    { value: 'dbinc', label: 'DBInc.' },
    { value: 'etevers', label: '에티버스' }
  ];

  return (
    <div className="p-6 space-y-10">
      <section>
        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b">기본 드롭다운</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">기본 드롭다운</h3>
            <Select 
              options={options}
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
              placeholder="값을 선택해주세요."
            />
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">회사 선택 드롭다운</h3>
            <Select 
              options={companyOptions}
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              placeholder="회사를 선택해주세요."
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b">크기 변형</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">SMALL</h3>
            <Select 
              options={options}
              size={SELECT_SIZES.SMALL}
              placeholder="값을 선택해주세요."
            />
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">MEDIUM (기본)</h3>
            <Select 
              options={options}
              size={SELECT_SIZES.MEDIUM}
              placeholder="값을 선택해주세요."
            />
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">LARGE</h3>
            <Select 
              options={options}
              size={SELECT_SIZES.LARGE}
              placeholder="값을 선택해주세요."
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b">상태 변형</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">에러 상태</h3>
            <Select 
              options={options}
              placeholder="값을 선택해주세요."
              error={true}
            />
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">비활성화 상태</h3>
            <Select 
              options={options}
              placeholder="값을 선택해주세요."
              disabled={true}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default SelectExample; 