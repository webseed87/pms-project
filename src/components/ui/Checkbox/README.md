# Checkbox 컴포넌트

## 개요
Checkbox 컴포넌트는 사용자가 특정 옵션을 선택하거나 해제할 수 있는 체크박스를 제공합니다.

## 파일 구조
- `Checkbox.jsx`: 메인 체크박스 컴포넌트
- `CheckboxExample.jsx`: 체크박스 사용 예시
- `index.js`: 컴포넌트 export 파일

## 주요 기능
1. **상태 관리**
   - 체크/언체크 상태
   - 비활성화 상태
   - 라벨 표시

2. **스타일링**
   - 체크 상태: 파란색 배경과 흰색 체크 아이콘
   - 언체크 상태: 흰색 배경과 회색 테두리
   - 비활성화 상태: 60% 투명도
   - 커스텀 스타일링 지원

3. **접근성**
   - 키보드 접근성 지원
   - 스크린 리더 지원
   - 적절한 라벨링

## 사용 예시
```jsx
// 기본 사용법
<Checkbox checked={isChecked} onChange={handleChange} />

// 라벨 포함
<Checkbox 
  checked={isChecked}
  onChange={handleChange}
  label="이용약관에 동의합니다"
/>

// 비활성화 상태
<Checkbox 
  checked={true}
  onChange={handleChange}
  disabled={true}
  label="비활성화된 옵션"
/>

// 폼 내에서 사용
<form onSubmit={handleSubmit}>
  <Checkbox 
    name="agreement"
    checked={agreed}
    onChange={handleAgreementChange}
    label="개인정보 수집에 동의합니다"
  />
</form>
```

## Props
| Prop 이름 | 타입 | 기본값 | 설명 |
|-----------|------|--------|------|
| checked | boolean | false | 체크박스 체크 상태 |
| onChange | function | - | 체크 상태 변경 핸들러 |
| disabled | boolean | false | 비활성화 여부 |
| label | node | '' | 체크박스 라벨 |
| name | string | '' | form에서 사용할 name 속성 |
| className | string | '' | 추가 CSS 클래스 |

## 스타일링
- Tailwind CSS 클래스 사용
- 상태별 스타일:
  - 체크 상태: `bg-blue-800` + 흰색 체크 아이콘
  - 언체크 상태: `bg-white border-gray-400`
  - 비활성화: `opacity-60`
  - 라벨: `text-gray-700` (비활성화 시 `text-gray-500`)

## 이벤트 처리
- `onChange`: 체크박스 상태가 변경될 때 호출
- 비활성화 상태에서는 이벤트 처리되지 않음
- 클릭 이벤트 버블링 방지 처리

## 접근성 고려사항
- 숨겨진 네이티브 체크박스 사용 (`sr-only`)
- 적절한 라벨 연결
- 키보드 포커스 지원
- ARIA 속성 적용 