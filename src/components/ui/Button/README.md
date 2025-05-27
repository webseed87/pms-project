# Button 컴포넌트

## 개요
Button 컴포넌트는 다양한 스타일, 크기, 상태를 지원하는 재사용 가능한 버튼 컴포넌트입니다.

## 파일 구조
- `Button.jsx`: 메인 버튼 컴포넌트
- `ButtonExample.jsx`: 버튼 사용 예시
- `index.js`: 컴포넌트 export 파일

## 주요 기능
1. **다양한 버튼 타입**
   - PRIMARY: 네이비 블루 버튼 (주요 작업용)
   - SECONDARY: 밝은 파란색 버튼 (보조 작업용)
   - DANGER: 빨간색/삭제 버튼
   - LINE: 테두리만 있는 버튼
   - ADD: 추가 버튼
   - DELETE: 삭제 버튼
   - SAVE: 저장 버튼
   - REFRESH: 리프레쉬 버튼

2. **크기 옵션**
   - SMALL: 32px 높이
   - MEDIUM: 40px 높이 (기본)
   - LARGE: 48px 높이
   - XLARGE: 56px 높이

3. **상태 관리**
   - 비활성화(disabled) 상태
   - 로딩(loading) 상태 (스피너 포함)

4. **아이콘 지원**
   - 왼쪽 또는 오른쪽 아이콘 배치
   - 크기별 자동 아이콘 크기 조정

## 사용 예시
```jsx
import Button, { BUTTON_TYPES, BUTTON_SIZES } from './Button';

// 기본 사용
<Button>버튼 텍스트</Button>

// 다양한 속성 사용
<Button 
  buttonType={BUTTON_TYPES.PRIMARY}
  size={BUTTON_SIZES.MEDIUM}
  icon={<IconComponent />}
  iconPosition="left"
  disabled={false}
  isLoading={false}
  onClick={handleClick}
>
  버튼 텍스트
</Button>
```

## Props
| Prop 이름 | 타입 | 기본값 | 설명 |
|-----------|------|--------|------|
| children | node | - | 버튼 내용 (텍스트 또는 React 노드) |
| type | string | 'button' | HTML 버튼 타입 ('button', 'submit', 'reset') |
| buttonType | string | 'primary' | 버튼 스타일 타입 |
| disabled | boolean | false | 버튼 비활성화 여부 |
| isLoading | boolean | false | 로딩 상태 표시 여부 |
| size | string | 'medium' | 버튼 크기 |
| icon | element | null | 버튼에 표시할 아이콘 요소 |
| iconPosition | string | 'left' | 아이콘 위치 ('left', 'right') |
| fullWidth | boolean | false | 전체 너비 사용 여부 |
| onClick | function | - | 클릭 이벤트 핸들러 |
| className | string | '' | 추가 CSS 클래스 | 