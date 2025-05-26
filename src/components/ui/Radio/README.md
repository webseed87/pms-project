# Radio 컴포넌트

Radio 컴포넌트는 사용자가 여러 옵션 중 하나를 선택할 수 있는 라디오 버튼을 제공합니다.

## 특징

- 세 가지 크기 옵션 (작은, 중간, 큰)
- 비활성화 상태 지원
- 오류 상태 표시
- 커스텀 스타일링 가능
- 접근성 지원

## 사용법

```jsx
import Radio, { RADIO_SIZES } from './Radio';

// 기본 사용
<Radio
  name="options"
  value="option1"
  checked={selectedOption === 'option1'}
  onChange={handleChange}
  label="옵션 1"
/>

// 크기 변경
<Radio
  size={RADIO_SIZES.LARGE}
  name="size"
  value="large"
  label="큰 사이즈"
  checked={size === 'large'}
  onChange={handleSizeChange}
/>

// 비활성화 상태
<Radio
  disabled
  name="disabled"
  value="disabled"
  label="비활성화된 옵션"
/>

// 오류 상태
<Radio
  error
  name="error"
  value="error"
  label="오류 상태"
/>
```

## Props

| Prop 이름 | 타입 | 기본값 | 설명 |
|-----------|------|--------|------|
| id | string | - | 라디오 버튼의 고유 ID |
| name | string | - | 라디오 버튼 그룹 이름 (필수) |
| value | string | - | 라디오 버튼의 값 (필수) |
| checked | boolean | false | 선택 여부 |
| onChange | function | - | 변경 이벤트 핸들러 (필수) |
| label | string | - | 라벨 텍스트 |
| disabled | boolean | false | 비활성화 여부 |
| error | boolean | false | 오류 상태 여부 |
| size | RADIO_SIZES | MEDIUM | 라디오 버튼 크기 |
| className | string | - | 추가 CSS 클래스 |

## 크기 상수

```javascript
RADIO_SIZES.SMALL   // 16px
RADIO_SIZES.MEDIUM  // 20px (기본값)
RADIO_SIZES.LARGE   // 24px
```

## 예제

자세한 사용 예제는 `RadioExample.jsx` 파일을 참고하세요. 