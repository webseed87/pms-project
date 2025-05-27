# DatePicker 컴포넌트

## 개요
DatePicker 컴포넌트는 react-datepicker 라이브러리를 기반으로 한 커스텀 날짜 선택 컴포넌트입니다. 단일 날짜 선택과 날짜 범위 선택을 모두 지원합니다.

## 파일 구조
- `DatePicker.jsx`: 메인 날짜 선택 컴포넌트
- `datepicker-custom.css`: 커스텀 스타일링
- `DatePickerExample.jsx`: 사용 예시
- `index.js`: 컴포넌트 export 파일

## 주요 기능
1. **선택 모드**
   - SINGLE: 단일 날짜 선택
   - RANGE: 날짜 범위 선택

2. **크기 옵션**
   - SMALL: 32px 높이
   - MEDIUM: 40px 높이 (기본)
   - LARGE: 48px 높이

3. **고급 기능**
   - 한국어 로케일 지원
   - 커스텀 달력 헤더
   - 반응형 디자인 (모바일 지원)
   - 날짜 범위 선택 시 자동 정렬
   - 외부 클릭 감지 및 자동 닫힘
   - 시간 자동 제거 (날짜만 사용)

4. **상태 관리**
   - 기본 상태
   - 오류 상태
   - 비활성화 상태
   - 포커스/열림 상태

## 사용 예시
```jsx
// 단일 날짜 선택
<DatePicker
  selected={selectedDate}
  onChange={setSelectedDate}
  dateFormat="yyyy년 MM월 dd일"
  placeholder="날짜를 선택해주세요"
/>

// 날짜 범위 선택
<DatePicker
  mode={DATEPICKER_MODES.RANGE}
  startDate={startDate}
  endDate={endDate}
  onChange={({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  }}
  placeholder="날짜 범위를 선택해주세요"
/>

// 다양한 속성 사용
<DatePicker
  selected={date}
  onChange={handleDateChange}
  dateFormat="yyyy-MM-dd"
  size={DATEPICKER_SIZES.MEDIUM}
  disabled={false}
  error={false}
/>
```

## Props
| Prop 이름 | 타입 | 기본값 | 설명 |
|-----------|------|--------|------|
| id | string | - | 날짜 선택 필드 ID |
| name | string | - | 날짜 선택 필드 이름 |
| selected | Date | - | 선택된 날짜 (단일 선택 모드) |
| onChange | function | - | 날짜 변경 핸들러 |
| placeholder | string | '날짜' | 플레이스홀더 텍스트 |
| dateFormat | string | 'yyyy-MM-dd' | 날짜 표시 형식 |
| disabled | boolean | false | 비활성화 여부 |
| error | boolean | false | 오류 상태 여부 |
| size | string | 'medium' | 선택 필드 크기 |
| mode | string | 'single' | 선택 모드 (single/range) |
| startDate | Date | null | 시작 날짜 (범위 선택 모드) |
| endDate | Date | null | 종료 날짜 (범위 선택 모드) |
| className | string | '' | 추가 CSS 클래스 |

## 스타일링
- 기본 react-datepicker 스타일 확장
- Tailwind CSS 클래스 사용
- 커스텀 CSS 파일 (`datepicker-custom.css`)로 추가 스타일링
- 반응형 디자인:
  - 데스크톱: 인라인 캘린더
  - 모바일: 전체 화면 모달

## 접근성
- 키보드 네비게이션 지원
- ARIA 레이블 및 역할 적용
- 스크린 리더 지원 