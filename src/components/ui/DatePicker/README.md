# DatePicker 컴포넌트

날짜 선택을 위한 캘린더 컴포넌트입니다.

## 주요 기능

- 단일 날짜 및 날짜 범위 선택
- 달력 네비게이션
- 날짜 형식 커스터마이징
- 입력 필드 통합
  - 직접 날짜 입력 가능
  - 포맷팅된 날짜 표시
- 절대 위치 지정 (right-0)
- 반응형 디자인

## 사용 예시

```jsx
import DatePicker from './components/ui/DatePicker';

// 기본 사용법
<DatePicker
  value={selectedDate}
  onChange={handleDateChange}
  placeholder="날짜 선택"
/>

// 날짜 범위 선택
<DatePicker
  value={[startDate, endDate]}
  onChange={handleRangeChange}
  isRange={true}
  placeholder="기간 선택"
/>

// 입력 필드와 통합
<DatePicker
  value={date}
  onChange={handleDateChange}
  withInput={true}
  inputProps={{
    placeholder: "YYYY-MM-DD",
    className: "custom-input"
  }}
/>
```

## Props

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| value | Date \| [Date, Date] | null | 선택된 날짜 또는 날짜 범위 |
| onChange | function | - | 날짜 선택 시 호출될 함수 |
| isRange | boolean | false | 날짜 범위 선택 모드 |
| withInput | boolean | false | 입력 필드 통합 여부 |
| inputProps | object | {} | 입력 필드 속성 |
| format | string | "YYYY-MM-DD" | 날짜 표시 형식 |
| placeholder | string | "날짜 선택" | 입력 필드 플레이스홀더 |
| className | string | "" | 추가 CSS 클래스 |
| position | string | "right-0" | 달력 위치 지정 |

## 입력 필드 통합

입력 필드와 통합 시 다음 기능을 제공합니다:
- 직접 날짜 입력 가능
- 자동 날짜 포맷팅
- 유효성 검사
- 키보드 네비게이션

## 스타일 가이드

- 달력은 기본적으로 입력 필드 아래에 위치
- 모바일에서는 전체 화면 모달로 표시
- 선택된 날짜는 강조 표시
- 오늘 날짜 표시
- 비활성화된 날짜 스타일링

## 접근성

- 키보드 네비게이션
  - Tab: 달력 셀 간 이동
  - Enter/Space: 날짜 선택
  - 화살표 키: 날짜 이동
- ARIA 레이블 및 역할 지원
- 스크린 리더 호환성 