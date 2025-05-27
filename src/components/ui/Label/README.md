# Label 컴포넌트

## 개요
Label 컴포넌트는 다양한 스타일로 텍스트 라벨을 표시하는 컴포넌트입니다. 박스형과 일반 텍스트형을 지원하며, 필수 입력 표시도 가능합니다.

## 파일 구조
- `Label.jsx`: 메인 라벨 컴포넌트
- `LabelExample.jsx`: 라벨 사용 예시
- `index.js`: 컴포넌트 export 파일

## 주요 기능
1. **라벨 타입**
   - BOX: 박스형 라벨 (배경색 있음)
   - PLAIN: 일반 텍스트 라벨 (배경색 없음)

2. **스타일링**
   - 박스형: 회색 배경과 테두리
   - 일반형: 텍스트만 표시
   - 필수 입력 표시: 빨간색 별표(*)
   - 커스텀 너비 설정 가능

3. **정렬**
   - 박스형: 가운데 정렬
   - 일반형: 왼쪽 정렬

## 사용 예시
```jsx
// 기본 사용법
<Label>접수 NO</Label>

// 박스형 라벨
<Label labelType={LABEL_TYPES.BOX}>
  이름
</Label>

// 필수 입력 표시
<Label required={true}>
  이메일
</Label>

// 너비 지정
<Label width="150px">
  전화번호
</Label>

// 다양한 속성 조합
<Label 
  labelType={LABEL_TYPES.BOX}
  required={true}
  width="150px"
  className="my-custom-class"
>
  주소
</Label>
```

## Props
| Prop 이름 | 타입 | 기본값 | 설명 |
|-----------|------|--------|------|
| children | node | - | 라벨 내용 (필수) |
| labelType | string | 'plain' | 라벨 타입 (box/plain) |
| required | boolean | false | 필수 입력 표시 여부 |
| width | string | '' | 라벨 너비 |
| className | string | '' | 추가 CSS 클래스 |

## 스타일링
- Tailwind CSS 클래스 사용
- 타입별 스타일:
  - 박스형:
    - 배경색: `bg-gray-50`
    - 테두리: `border-r border-gray-300`
    - 높이: `h-14`
    - 최소 너비: `min-w-28`
  - 일반형:
    - 패딩: `py-0.5`
    - 정렬: `text-left`
- 공통 스타일:
  - 폰트: Pretendard
  - 크기: `text-sm`
  - 색상: `text-slate-800`
  - 굵기: `font-normal`

## 접근성
- 시맨틱 HTML 구조
- 필수 입력 표시 시 시각적 구분
- 적절한 텍스트 크기와 색상 대비 