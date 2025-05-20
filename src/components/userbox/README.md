# UserBox 컴포넌트

사용자 정보와 드롭다운 메뉴를 표시하는 컴포넌트입니다.

## 기능

- 사용자 이름과 팀 정보 표시
- 클릭 시 드롭다운 메뉴 표시
- 드롭다운 메뉴 항목 선택 이벤트 처리
- 외부 영역 클릭 시 드롭다운 닫기

## 사용 방법

```jsx
import UserBox from 'path/to/components/ui/UserBox';

// 사용자 옵션 정의
const userOptions = [
  { label: '내 프로필', onClick: () => console.log('내 프로필 클릭') },
  { label: '설정', onClick: () => console.log('설정 클릭') },
  { label: '로그아웃', onClick: () => console.log('로그아웃 클릭') },
];

// 기본 사용법
<UserBox 
  userName="김경태" 
  teamName="프로젝트 1팀" 
  options={userOptions}
/>

// 옵션 없이 사용
<UserBox 
  userName="홍길동" 
  teamName="개발팀"
/>
```

## 속성(Props)

| 속성명 | 타입 | 기본값 | 설명 |
|--------|------|--------|------|
| userName | string | (필수) | 사용자 이름 |
| teamName | string | (필수) | 팀 이름 |
| options | array | [] | 드롭다운 메뉴 옵션 배열 |

### options 배열 항목 속성

| 속성명 | 타입 | 설명 |
|--------|------|------|
| label | string | 메뉴 항목에 표시될 텍스트 |
| onClick | function | 메뉴 항목 클릭 시 실행할 함수 | 