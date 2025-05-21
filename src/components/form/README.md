# 폼 컴포넌트 (Form Components)

이 폴더에는 PMS 시스템에서 사용되는 폼 관련 컴포넌트가 포함되어 있습니다.

## 주요 컴포넌트

### FormField.jsx

입력 폼의 필드를 생성하는 범용 컴포넌트입니다. 다양한 타입의 입력 필드를 지원하며, 레이블과 입력 영역을 포함합니다.

#### 지원하는 필드 타입
- **텍스트 입력 (text)**: 일반 텍스트 입력 필드
- **숫자 입력 (number)**: 숫자 전용 입력 필드
- **선택 (select)**: 드롭다운 선택 메뉴
- **날짜 선택 (date)**: 날짜 선택 캘린더
- **체크박스 (checkbox)**: 체크박스 필드
- **라디오 (radio)**: 라디오 버튼 그룹
- **텍스트 영역 (textarea)**: 여러 줄 텍스트 입력 영역

#### 유효성 검사
- 필수 입력 필드 검사
- 커스텀 유효성 검사 함수 지원
- 에러 메시지 표시

#### 사용 방법
```jsx
import FormField from '../components/form/FormField';

// 기본 텍스트 필드
<FormField
  label="이름"
  name="userName"
  value={userName}
  onChange={handleChange}
  required
/>

// 선택 필드
<FormField
  type="select"
  label="부서"
  name="department"
  value={department}
  onChange={handleChange}
  options={[
    { value: 'dev', label: '개발팀' },
    { value: 'design', label: '디자인팀' },
    { value: 'planning', label: '기획팀' }
  ]}
/>

// 날짜 필드
<FormField
  type="date"
  label="시작일"
  name="startDate"
  value={startDate}
  onChange={handleChange}
/>
```

### index.js

모듈 내보내기를 위한 인덱스 파일로, FormField 컴포넌트를 쉽게 임포트할 수 있도록 합니다. 