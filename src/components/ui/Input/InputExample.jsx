import React, { useState } from 'react';
import Input, { INPUT_TYPES, INPUT_SIZES } from './Input';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const InputExample = () => {
  const [textValue, setTextValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');

  // Select 옵션 예시
  const options = [
    { value: 'option1', label: '값을 선택해주세요.' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' }
  ];

  return (
    <div className="p-6 space-y-10">
      <section>
        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b">기본 입력 필드</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 텍스트 입력 필드 */}
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">텍스트 입력</h3>
            <Input 
              type={INPUT_TYPES.TEXT}
              placeholder="텍스트를 입력해주세요"
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
            />
          </div>

          {/* 비밀번호 입력 필드 */}
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">비밀번호 입력</h3>
            <Input 
              type={INPUT_TYPES.PASSWORD}
              placeholder="비밀번호를 입력해주세요"
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
            />
          </div>
        </div>
      </section>

      

      <section>
        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b">텍스트 영역</h2>
        <div className="grid grid-cols-1 gap-6">
          {/* 텍스트 영역(Textarea) */}
          <div className="space-y-2">
            <Input 
              type={INPUT_TYPES.TEXTAREA}
              placeholder="텍스트 박스 입니다..."
              rows={5}
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b">크기 변형</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 작은 크기 */}
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">SMALL</h3>
            <Input 
              type={INPUT_TYPES.TEXT}
              placeholder="텍스트를 글씨"
              size={INPUT_SIZES.SMALL}
            />
          </div>

          {/* 중간 크기 (기본) */}
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">MEDIUM (기본)</h3>
            <Input 
              type={INPUT_TYPES.TEXT}
              placeholder="텍스트를 글씨"
              size={INPUT_SIZES.MEDIUM}
            />
          </div>

          {/* 큰 크기 */}
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">LARGE</h3>
            <Input 
              type={INPUT_TYPES.TEXT}
              placeholder="텍스트를 글씨"
              size={INPUT_SIZES.LARGE}
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b">상태 변형</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 기본 상태 */}
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">기본 상태</h3>
            <Input 
              type={INPUT_TYPES.TEXT}
              placeholder="텍스트를 입력해주세요"
            />
          </div>

          {/* 에러 상태 */}
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">에러 상태</h3>
            <Input 
              type={INPUT_TYPES.TEXT}
              placeholder="텍스트를 입력해주세요"
              error={true}
            />
          </div>

          {/* 비활성화 상태 */}
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">비활성화 상태</h3>
            <Input 
              type={INPUT_TYPES.TEXT}
              placeholder="텍스트를 입력해주세요"
              disabled={true}
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b">아이콘 포함</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 아이콘(오른쪽) */}
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">오른쪽 아이콘</h3>
            <Input 
              type={INPUT_TYPES.TEXT}
              placeholder="검색어를 입력하세요"
              icon={<MagnifyingGlassIcon className="h-4 w-4 text-gray-500" />}
              iconPosition="right"
            />
          </div>

          {/* 아이콘(왼쪽) */}
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">왼쪽 아이콘</h3>
            <Input 
              type={INPUT_TYPES.TEXT}
              placeholder="검색어를 입력하세요"
              icon={<MagnifyingGlassIcon className="h-4 w-4 text-gray-500" />}
              iconPosition="left"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default InputExample; 