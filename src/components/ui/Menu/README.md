# Menu 컴포넌트

드롭다운 및 컨텍스트 메뉴를 제공하는 컴포넌트입니다.

## 주요 기능

- 계층적 메뉴 구조
- 아이콘 지원
- 키보드 네비게이션
- 호버/클릭 액션
- 전체 메뉴 토글 기능
  - 상단 메뉴 아이콘으로 모든 하위 메뉴 펼치기/접기
  - 개별 메뉴 클릭으로 해당 메뉴만 토글
  - 재귀적 하위 메뉴 확장/축소
- 메뉴 상태 관리
  - 활성화된 메뉴 시각적 표시
  - 하위 메뉴 애니메이션 효과
  - 메뉴 접힘 상태에서도 타이틀 유지
- 반응형 디자인
  - 모바일/데스크톱 레이아웃 지원
  - 스크롤 가능한 메뉴 영역

## 사용 예시

```jsx
const menuItems = [
  {
    id: 'project',
    label: '프로젝트 관리',
    icon: <Squares2X2Icon className="w-6 h-6" />,
    children: [
      { id: 'project-info', label: '프로젝트 정보' },
      { id: 'project-task', label: '프로젝트 업무 정보' }
    ]
  }
];

<Menu 
  items={menuItems}
  title="메뉴"
  onMenuItemClick={handleMenuClick}
  isCollapsible={true}
  defaultCollapsed={false}
/>
```

## Props

| 속성 | 타입 | 설명 |
|------|------|------|
| title | string | 메뉴 상단에 표시될 제목 |
| items | MenuItem[] | 메뉴 아이템 배열 |
| onMenuItemClick | function | 메뉴 아이템 클릭 시 호출될 함수 |
| isCollapsible | boolean | 메뉴 접기/펼치기 가능 여부 |
| defaultCollapsed | boolean | 초기 메뉴 접힘 상태 |
| className | string | 추가 CSS 클래스 |

## MenuItem 타입

```typescript
type MenuItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
  onClick?: () => void;
}
```

## 스타일 가이드

- 메뉴 아이템의 아이콘은 24x24 크기를 권장합니다.
- 하위 메뉴는 최대 2단계까지 지원합니다.
- 메뉴 아이템의 텍스트는 한 줄로 표시되며, 길이가 긴 경우 말줄임표로 처리됩니다.

## 접근성

- 키보드 네비게이션 지원
  - Tab: 메뉴 아이템 간 이동
  - Enter/Space: 메뉴 아이템 선택
  - Escape: 하위 메뉴 닫기
- 스크린 리더 지원
  - 메뉴 아이템의 상태 정보 제공
  - 계층 구조 정보 제공 