import React from 'react';
import Label, { LABEL_TYPES } from './Label';

/**
 * Label 컴포넌트 사용 예시
 */
const LabelExample = () => {
  return (
    <div className="space-y-8 p-4">
      <div>
        <h2 className="text-xl font-semibold mb-4">라벨 컴포넌트 예시</h2>
        <p className="text-gray-600 mb-6">
          다양한 스타일의 라벨 컴포넌트 예시입니다.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">박스형 라벨 (BOX)</h3>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-4">
              <Label labelType={LABEL_TYPES.BOX}>접수 NO</Label>
              <Label labelType={LABEL_TYPES.BOX}>고객명</Label>
              <Label labelType={LABEL_TYPES.BOX}>연락처</Label>
            </div>
            <div className="text-sm text-gray-500 mt-1">
              배경색과 테두리가 있는 박스형 라벨입니다.
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">일반 라벨 (PLAIN)</h3>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-4">
              <Label labelType={LABEL_TYPES.PLAIN}>접수 NO</Label>
              <Label labelType={LABEL_TYPES.PLAIN}>고객명</Label>
              <Label labelType={LABEL_TYPES.PLAIN}>연락처</Label>
            </div>
            <div className="text-sm text-gray-500 mt-1">
              배경색이 없는 일반 텍스트 라벨입니다.
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">필수 입력 라벨 (Required)</h3>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-4">
              <Label required>이름</Label>
              <Label required>비밀번호</Label>
              <Label required>비밀번호 확인</Label>
            </div>
            <div className="text-sm text-gray-500 mt-1">
              필수 입력 항목을 표시하는 라벨입니다. 텍스트 오른쪽에 "*" 기호가 표시됩니다.
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">너비 지정 라벨</h3>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-4">
              <Label labelType={LABEL_TYPES.BOX} width="150px">150px 너비</Label>
              <Label labelType={LABEL_TYPES.PLAIN} width="100px">100px 너비</Label>
              <Label required width="120px">필수 120px</Label>
            </div>
            <div className="text-sm text-gray-500 mt-1">
              너비를 지정한 라벨 예시입니다.
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">폼 내부 사용 예시</h3>
          <div className="p-4 border rounded-md">
            <div className="space-y-4">
              <div className="flex items-center">
                <Label required width="120px">이름</Label>
                <input type="text" className="border border-gray-300 rounded px-3 py-1.5 flex-1" />
              </div>
              <div className="flex items-center">
                <Label required width="120px">이메일</Label>
                <input type="email" className="border border-gray-300 rounded px-3 py-1.5 flex-1" />
              </div>
              <div className="flex items-center">
                <Label width="120px">연락처</Label>
                <input type="tel" className="border border-gray-300 rounded px-3 py-1.5 flex-1" />
              </div>
        
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabelExample; 