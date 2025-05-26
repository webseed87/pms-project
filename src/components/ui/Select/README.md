# Select 컴포넌트

드롭다운 선택 컴포넌트입니다.

## 주요 기능

- 단일/다중 선택
- 옵션 그룹화
- 검색 기능
- 커스텀 렌더링
- 일관된 너비 유지
  - 선택된 옵션에 따른 너비 변경 방지
  - truncate 및 flex 유틸리티 적용
  - 아이콘 flex-shrink-0 적용
- 반응형 디자인

## 사용 예시

```jsx
import Select from './components/ui/Select';

// 기본 사용법
<Select
  options={[
    { value: 'option1', label: '옵션 1' },
    { value: 'option2', label: '옵션 2' }
  ]}
  value={selectedValue}
  onChange={handleChange}
  placeholder="선택하세요"
/>

// 다중 선택
<Select
  multiple
  options={options}
  value={selectedValues}
  onChange={handleMultiChange}
  placeholder="여러 항목 선택"
/>

// 그룹화된 옵션
<Select
  options={[
    {
      label: '그룹 1',
      options: [
        { value: '1-1', label: '옵션 1-1' },
        { value: '1-2', label: '옵션 1-2' }
      ]
    },
    {
      label: '그룹 2',
      options: [
        { value: '2-1', label: '옵션 2-1' },
        { value: '2-2', label: '옵션 2-2' }
      ]
    }
  ]}
  value={selectedValue}
  onChange={handleChange}
/>
```

## Props

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| options | Option[] \| OptionGroup[] | [] | 선택 옵션 배열 |
| value | string \| string[] | null | 선택된 값 |
| onChange | function | - | 선택 변경 시 호출될 함수 |
| multiple | boolean | false | 다중 선택 모드 |
| searchable | boolean | false | 검색 기능 활성화 |
| placeholder | string | "선택" | 기본 표시 텍스트 |
| disabled | boolean | false | 비활성화 상태 |
| className | string | "" | 추가 CSS 클래스 |
| width | string | "w-full" | 컴포넌트 너비 |

## Option 타입

```typescript
type Option = {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

type OptionGroup = {
  label: string;
  options: Option[];
}
```

## 스타일 가이드

- 선택 영역은 고정된 너비 유지
- 긴 텍스트는 말줄임표로 처리
- 아이콘은 크기 유지 (flex-shrink-0)
- 포커스/호버 상태 스타일링
- 비활성화된 옵션 스타일링

## 접근성

- 키보드 네비게이션
  - Space/Enter: 드롭다운 열기/닫기
  - 화살표 키: 옵션 이동
  - Tab: 컴포넌트 포커스 이동
- ARIA 레이블 및 역할 지원
- 스크린 리더 호환성 