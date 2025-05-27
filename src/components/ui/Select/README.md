# Select 컴포넌트

## 개요
Select 컴포넌트는 커스텀 드롭다운 메뉴를 가진 고급 선택 필드 컴포넌트입니다.

## 파일 구조
- `Select.jsx`: 메인 선택 필드 컴포넌트
- `SelectExample.jsx`: 선택 필드 사용 예시
- `index.js`: 컴포넌트 export 파일

## 주요 기능
1. **크기 옵션**
   - SMALL: 32px 높이
   - MEDIUM: 40px 높이 (기본)
   - LARGE: 48px 높이

2. **상태 관리**
   - 기본 상태
   - 오류 상태 (빨간색 테두리)
   - 비활성화 상태
   - 포커스/열림 상태 (파란색 테두리)

3. **고급 기능**
   - 커스텀 드롭다운 UI
   - 호버 효과
   - 선택된 항목 체크 표시
   - 키보드 접근성 지원
   - 외부 클릭 감지 및 자동 닫힘
   - 폼 제출을 위한 숨겨진 네이티브 select 요소

## 사용 예시
```jsx
// 기본 사용법
<Select
  options={[
    { value: 'option1', label: '옵션 1' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' }
  ]}
  value={selectedValue}
  onChange={(e) => setSelectedValue(e.target.value)}
  placeholder="옵션을 선택하세요"
/>

// 다양한 속성 사용 예시
<Select
  options={options}
  value={selectedValue}
  onChange={handleChange}
  placeholder="옵션을 선택하세요"
  size={SELECT_SIZES.MEDIUM}
  disabled={false}
  error={false}
/>
```

## Props
| Prop 이름 | 타입 | 기본값 | 설명 |
|-----------|------|--------|------|
| id | string | - | 선택 필드 ID |
| name | string | - | 선택 필드 이름 |
| value | string/number | - | 선택된 값 |
| onChange | function | - | 값 변경 핸들러 |
| placeholder | string | '값을 선택해주세요.' | 플레이스홀더 텍스트 |
| options | array | [] | 선택 옵션 배열 |
| disabled | boolean | false | 비활성화 여부 |
| error | boolean | false | 오류 상태 여부 |
| size | string | 'medium' | 선택 필드 크기 |
| className | string | '' | 추가 CSS 클래스 |

## 옵션 객체 구조
```javascript
{
  value: string/number,  // 옵션 값
  label: string         // 표시될 텍스트
}
```

## 스타일링
- 기본적으로 Tailwind CSS 클래스를 사용하여 스타일링
- 상태에 따른 테두리 색상 변경
  - 기본: 회색 (gray-400)
  - 포커스/열림: 파란색 (blue-800)
  - 오류: 빨간색 (red-500)
  - 비활성화: 연한 회색 (gray-300)
- 호버 효과와 선택 상태에 따른 배경색 변경
- 반응형 디자인 지원 