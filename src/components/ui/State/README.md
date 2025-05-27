# StateBadge 컴포넌트

## 개요
StateBadge 컴포넌트는 다양한 상태를 시각적으로 표시하는 뱃지 컴포넌트입니다. 기본 상태와 업무 상태를 모두 지원하며, 다양한 스타일링 옵션을 제공합니다.

## 파일 구조
- `StateBadge.jsx`: 메인 상태 뱃지 컴포넌트
- `StateBadgeExample.jsx`: 상태 뱃지 사용 예시
- `index.js`: 컴포넌트 export 파일

## 주요 기능
1. **기본 상태 타입**
   - SUCCESS: 성공/완료 상태
   - WARNING: 경고/주의 상태
   - ERROR: 오류/실패 상태
   - INFO: 정보 상태
   - PENDING: 대기/진행중 상태
   - INACTIVE: 비활성 상태
   - CUSTOM: 커스텀 상태

2. **업무 상태 타입**
   - RECEIPT: 접수
   - ASSIGN: 지정
   - CONFIRM: 확인
   - IN_DEVELOPMENT: 개발중
   - DEV_COMPLETE: 개발완료
   - TEST: 테스트
   - TEST_REQUEST: 테스트요청
   - TEST_REJECT: 테스트부적합
   - SUPPLEMENTING: 보완중
   - DEV_END: 개발종료
   - HOLD: 보류
   - WITHDRAW: 철회
   - TRANSFER: 이관

3. **크기 옵션**
   - SMALL: 20px 높이
   - MEDIUM: 24px 높이 (기본)
   - LARGE: 28px 높이

4. **스타일링 옵션**
   - 아웃라인 모드
   - 둥근 모서리 설정
   - 아이콘 지원
   - 커스텀 색상 지원

## 사용 예시
```jsx
// 기본 사용법
<StateBadge>진행중</StateBadge>

// 기본 상태 타입 사용
<StateBadge badgeType={BADGE_TYPES.SUCCESS}>완료</StateBadge>
<StateBadge badgeType={BADGE_TYPES.ERROR}>오류</StateBadge>

// 업무 상태 타입 사용
<StateBadge badgeType={BADGE_TYPES.IN_DEVELOPMENT}>개발중</StateBadge>
<StateBadge badgeType={BADGE_TYPES.TEST_REQUEST}>테스트요청</StateBadge>

// 아웃라인 모드
<StateBadge 
  badgeType={BADGE_TYPES.SUCCESS}
  outline={true}
>
  완료
</StateBadge>

// 아이콘 포함
<StateBadge 
  badgeType={BADGE_TYPES.WARNING}
  icon={<WarningIcon />}
>
  주의
</StateBadge>

// 커스텀 스타일
<StateBadge 
  badgeType={BADGE_TYPES.CUSTOM}
  customColor="bg-emerald-100 text-emerald-800"
>
  커스텀 상태
</StateBadge>
```

## Props
| Prop 이름 | 타입 | 기본값 | 설명 |
|-----------|------|--------|------|
| children | node | - | 뱃지 내용 |
| badgeType | string | 'info' | 뱃지 타입 |
| size | string | 'medium' | 뱃지 크기 |
| outline | boolean | false | 아웃라인 모드 여부 |
| rounded | boolean | true | 둥근 모서리 여부 |
| icon | element | null | 뱃지에 표시할 아이콘 |
| className | string | '' | 추가 CSS 클래스 |
| customColor | string | '' | 커스텀 색상 |

## 스타일링
- Tailwind CSS 클래스 사용
- 상태별 색상 조합:
  - 기본 모드: 배경색 (light) + 텍스트 색상 (dark)
  - 아웃라인 모드: 흰색 배경 + 테두리 색상 + 텍스트 색상
- 크기별 패딩과 폰트 크기 자동 조정
- 아이콘 크기 자동 조정

## 접근성
- 시맨틱한 상태 표시
- 적절한 색상 대비
- 아이콘과 텍스트 조합으로 의미 전달 강화 