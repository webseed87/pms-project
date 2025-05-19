import React, { useState } from 'react';
import Checkbox from './Checkbox';

/**
 * Checkbox 컴포넌트 사용 예시
 */
const CheckboxExample = () => {
  const [checkedState1, setCheckedState1] = useState(false);
  const [checkedState2, setCheckedState2] = useState(true);
  const [checkedState3, setCheckedState3] = useState(false);
  const [checkedState4, setCheckedState4] = useState(true);

  return (
    <div className="space-y-8 p-4">
      <div>
        <h2 className="text-xl font-semibold mb-4">체크박스 컴포넌트 예시</h2>
        <p className="text-gray-600 mb-6">
          다양한 상태의 체크박스 컴포넌트 예시입니다.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">기본 체크박스</h3>
          <div className="space-y-2">
            <Checkbox 
              checked={checkedState1} 
              onChange={() => setCheckedState1(!checkedState1)} 
              label="체크박스 라벨"
            />
            <div className="text-sm text-gray-500 mt-1">
              기본 체크박스 컴포넌트입니다. 선택 여부를 확인할 수 있습니다.
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">체크된 상태</h3>
          <div className="space-y-2">
            <Checkbox 
              checked={checkedState2} 
              onChange={() => setCheckedState2(!checkedState2)} 
              label="체크된 체크박스"
            />
            <div className="text-sm text-gray-500 mt-1">
              체크된 상태의 체크박스입니다.
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">비활성화 상태</h3>
          <div className="space-y-2">
            <Checkbox 
              disabled 
              checked={false} 
              label="비활성화된 체크박스 (체크되지 않음)" 
            />
            <div className="mt-2">
              <Checkbox 
                disabled 
                checked={true} 
                label="비활성화된 체크박스 (체크됨)" 
              />
            </div>
            <div className="text-sm text-gray-500 mt-1">
              비활성화 상태의 체크박스입니다. 체크 상태를 변경할 수 없습니다.
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">라벨 없는 체크박스</h3>
          <div className="space-y-2">
            <div className="flex space-x-4">
              <Checkbox 
                checked={checkedState3} 
                onChange={() => setCheckedState3(!checkedState3)} 
              />
              <Checkbox 
                checked={checkedState4} 
                onChange={() => setCheckedState4(!checkedState4)} 
              />
            </div>
            <div className="text-sm text-gray-500 mt-1">
              라벨이 없는 체크박스입니다.
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">폼 내부 사용 예시</h3>
          <div className="p-4 border rounded-md">
            <form onSubmit={(e) => { e.preventDefault(); alert('폼이 제출되었습니다!'); }}>
              <div className="space-y-3 mb-4">
                <Checkbox 
                  name="terms" 
                  checked={checkedState1} 
                  onChange={() => setCheckedState1(!checkedState1)} 
                  label="이용약관에 동의합니다."
                />
                <Checkbox 
                  name="privacy" 
                  checked={checkedState2} 
                  onChange={() => setCheckedState2(!checkedState2)} 
                  label="개인정보 처리방침에 동의합니다."
                />
                <Checkbox 
                  name="marketing" 
                  checked={checkedState3} 
                  onChange={() => setCheckedState3(!checkedState3)} 
                  label="마케팅 정보 수신에 동의합니다."
                />
              </div>
              <button 
                type="submit" 
                className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700"
              >
                제출하기
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckboxExample; 