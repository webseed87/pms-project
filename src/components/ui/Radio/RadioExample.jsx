import React, { useState } from 'react';
import Radio, { RADIO_SIZES } from './Radio';

const RadioExample = () => {
  const [selectedOption, setSelectedOption] = useState('option1');
  const [selectedSize, setSelectedSize] = useState('medium');
  const [selectedColor, setSelectedColor] = useState('blue');

  return (
    <div className="p-4 space-y-8">
      {/* 기본 사용 예시 */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold mb-4">기본 사용</h2>
        <div className="flex gap-2">
          <Radio
            name="basic-example"
            value="option1"
            checked={selectedOption === 'option1'}
            onChange={(e) => setSelectedOption(e.target.value)}
            label="옵션 1"
          />
          <Radio
            name="basic-example"
            value="option2"
            checked={selectedOption === 'option2'}
            onChange={(e) => setSelectedOption(e.target.value)}
            label="옵션 2"
          />
          <Radio
            name="basic-example"
            value="option3"
            checked={selectedOption === 'option3'}
            onChange={(e) => setSelectedOption(e.target.value)}
            label="옵션 3"
          />
        </div>
      </div>

      {/* 크기 변경 예시 */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold mb-4">크기 변경</h2>
        <div className=" flex gap-2">
          <Radio
            size={RADIO_SIZES.SMALL}
            name="size-example"
            value="small"
            checked={selectedSize === 'small'}
            onChange={(e) => setSelectedSize(e.target.value)}
            label="작은 크기"
          />
          <Radio
            size={RADIO_SIZES.MEDIUM}
            name="size-example"
            value="medium"
            checked={selectedSize === 'medium'}
            onChange={(e) => setSelectedSize(e.target.value)}
            label="중간 크기"
          />
          <Radio
            size={RADIO_SIZES.LARGE}
            name="size-example"
            value="large"
            checked={selectedSize === 'large'}
            onChange={(e) => setSelectedSize(e.target.value)}
            label="큰 크기"
          />
        </div>
      </div>

      {/* 상태 예시 */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold mb-4">상태</h2>
        <div className="flex flex-row gap-2">
          <Radio
            name="state-example-1"
            value="disabled"
            checked={false}
            onChange={() => {}}
            label="비활성화 (미선택)"
            disabled
          />
          <Radio
            name="state-example-1"
            value="disabled-checked"
            checked={true}
            onChange={() => {}}
            label="비활성화 (선택됨)"
            disabled
          />
          <Radio
            name="state-example-2"
            value="error"
            checked={false}
            onChange={() => {}}
            label="오류 상태"
            error
          />
        </div>
      </div>

      {/* 인라인 그룹 예시 */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold mb-4">인라인 그룹</h2>
        <div className="flex space-x-4">
          <Radio
            name="color"
            value="red"
            checked={selectedColor === 'red'}
            onChange={(e) => setSelectedColor(e.target.value)}
            label="빨간색"
          />
          <Radio
            name="color"
            value="blue"
            checked={selectedColor === 'blue'}
            onChange={(e) => setSelectedColor(e.target.value)}
            label="파란색"
          />
          <Radio
            name="color"
            value="green"
            checked={selectedColor === 'green'}
            onChange={(e) => setSelectedColor(e.target.value)}
            label="초록색"
          />
        </div>
      </div>

      {/* 선택된 값 표시 */}
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h3 className="font-medium mb-2">선택된 값:</h3>
        <p>기본 예시: {selectedOption}</p>
        <p>크기 예시: {selectedSize}</p>
        <p>색상 예시: {selectedColor}</p>
      </div>
    </div>
  );
};

export default RadioExample; 