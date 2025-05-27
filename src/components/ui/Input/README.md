# Input 컴포넌트

## 개요
Input 컴포넌트는 다양한 타입, 크기, 상태를 지원하는 재사용 가능한 입력 필드 컴포넌트입니다.

## 파일 구조
- `Input.jsx`: 메인 입력 필드 컴포넌트
- `InputExample.jsx`: 입력 필드 사용 예시
- `index.js`: 컴포넌트 export 파일

## 주요 기능
1. **다양한 입력 필드 타입**
   - TEXT: 일반 텍스트 입력
   - PASSWORD: 비밀번호 입력 (마스킹 처리)
   - DATE: 날짜 선택 입력
   - SELECT: 선택 상자 입력
   - TEXTAREA: 여러 줄 텍스트 입력

2. **크기 옵션**
   - SMALL: 32px 높이
   - MEDIUM: 40px 높이 (기본)
   - LARGE: 48px 높이

3. **상태 관리**
   - DEFAULT: 기본 상태
   - FOCUS: 포커스 상태
   - ERROR: 오류 상태
   - DISABLED: 비활성화 상태

4. **추가 기능**
   - 아이콘 지원 (왼쪽/오른쪽 배치)
   - 비밀번호 표시/숨김 토글
   - 날짜 선택기 아이콘
   - 선택 상자 드롭다운 아이콘

## 사용 예시
```jsx
// 기본 텍스트 입력 필드
<Input 
  id="email"
  name="email"
  value={email}
  onChange={handleChange}
  placeholder="이메일을 입력하세요"
/>

// 비밀번호 입력 필드
<Input 
  type={INPUT_TYPES.PASSWORD}
  id="password"
  name="password"
  value={password}
  onChange={handleChange}
  placeholder="비밀번호를 입력하세요"
/>

// 여러 줄 텍스트 입력 필드
<Input 
  type={INPUT_TYPES.TEXTAREA}
  id="description"
  name="description"
  value={description}
  onChange={handleChange}
  placeholder="설명을 입력하세요"
  rows={5}
/>

// 선택 상자 입력 필드
<Input 
  type={INPUT_TYPES.SELECT}
  id="category"
  name="category"
  value={category}
  onChange={handleChange}
  placeholder="카테고리 선택"
  options={[
    { value: '1', label: '옵션 1' },
    { value: '2', label: '옵션 2' }
  ]}
/>
```

## Props
| Prop 이름 | 타입 | 기본값 | 설명 |
|-----------|------|--------|------|
| type | string | 'text' | 입력 필드 타입 |
| id | string | - | 입력 필드 ID |
| name | string | - | 입력 필드 이름 |
| value | any | - | 입력 필드 값 |
| onChange | function | - | 값 변경 핸들러 |
| placeholder | string | '' | 플레이스홀더 텍스트 |
| disabled | boolean | false | 비활성화 여부 |
| readOnly | boolean | false | 읽기 전용 여부 |
| error | boolean | false | 오류 상태 여부 |
| size | string | 'medium' | 입력 필드 크기 |
| rows | number | 3 | textarea 줄 수 |
| options | array | [] | 선택 상자 옵션 배열 |
| icon | element | null | 커스텀 아이콘 |
| iconPosition | string | 'right' | 아이콘 위치 |
| className | string | '' | 추가 CSS 클래스 | 