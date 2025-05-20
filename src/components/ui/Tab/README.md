# Tab 컴포넌트

다양한 스타일과 레이아웃 옵션을 제공하는 탭 메뉴 컴포넌트입니다.

## 기능

- 가로(상단) 또는 세로(좌측) 탭 메뉴 레이아웃
- 다양한 크기 옵션 (소, 중, 대)
- 아이콘 위치 커스터마이징 (왼쪽, 오른쪽, 상단)
- 디자인 스타일 변경 (기본, 아웃라인)
- 텍스트 오버플로우 처리 (120px 초과 시 말줄임표)
- 콘텐츠 표시 여부 설정

## 컴포넌트 구조

```
src/components/ui/Tab/
├── Tab.jsx            # 메인 Tab 컴포넌트
├── TabExample.jsx     # 사용 예제 컴포넌트
└── README.md          # 현재 문서
```

## 사용법

```jsx
import Tab, { TAB_POSITIONS, TAB_SIZES, ICON_POSITIONS, TAB_DESIGNS } from './components/ui/Tab/Tab';
import { HomeIcon, UserIcon } from '@heroicons/react/24/outline';

// 기본 사용법
<Tab 
  tabs={[
    {
      label: '홈',
      icon: <HomeIcon className="w-5 h-5" />,
      content: <div>홈 탭 내용입니다.</div>
    },
    {
      label: '사용자',
      icon: <UserIcon className="w-5 h-5" />,
      content: <div>사용자 탭 내용입니다.</div>
    }
  ]}
  defaultActiveTab={0}
  onChange={(index) => console.log(`탭 ${index} 선택됨`)}
/>
```

## Props

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `tabs` | Array | 필수 | 탭 아이템 배열 |
| `defaultActiveTab` | Number | 0 | 기본 활성화 탭 인덱스 |
| `onChange` | Function | - | 탭 변경 시 호출되는 콜백 함수 |
| `position` | String | 'top' | 탭 위치 (상단 또는 좌측) |
| `size` | String | 'medium' | 탭 크기 (소, 중, 대) |
| `iconPosition` | String | 'left' | 아이콘 위치 |
| `design` | String | 'default' | 탭 디자인 타입 |
| `showContent` | Boolean | true | 콘텐츠 표시 여부 |
| `className` | String | '' | 추가 CSS 클래스 |

### tabs 속성

각 탭 객체는 다음 속성을 갖습니다:

| 속성 | 타입 | 필수 여부 | 설명 |
|------|------|-----------|------|
| `label` | String | 필수 | 탭 레이블 |
| `icon` | Node | 선택 | 탭 아이콘 |
| `content` | Node | 선택 | 탭 내용 |

## 상수

탭 컴포넌트는 다음과 같은 상수를 제공합니다:

### TAB_POSITIONS
```js
{
  TOP: 'top',    // 상단에 탭 메뉴
  LEFT: 'left',  // 좌측에 탭 메뉴
}
```

### TAB_SIZES
```js
{
  SMALL: 'small',    // 작은 크기 탭
  MEDIUM: 'medium',  // 중간 크기 탭
  LARGE: 'large',    // 큰 크기 탭
}
```

### ICON_POSITIONS
```js
{
  LEFT: 'left',   // 왼쪽에 아이콘
  RIGHT: 'right', // 오른쪽에 아이콘
  TOP: 'top',     // 위쪽에 아이콘
  NONE: 'none',   // 아이콘 없음
}
```

### TAB_DESIGNS
```js
{
  DEFAULT: 'default', // 기본 디자인 (하단 또는 우측 바)
  OUTLINE: 'outline', // 아웃라인 디자인 (테두리 있는 버튼형)
}
```

## 예제

### 기본 탭 (상단)
```jsx
<Tab 
  tabs={tabs}
  defaultActiveTab={0}
  onChange={handleTabChange}
  iconPosition={ICON_POSITIONS.RIGHT}
/>
```

### 아웃라인 디자인 탭
```jsx
<Tab 
  tabs={outlineTabs}
  defaultActiveTab={0}
  design={TAB_DESIGNS.OUTLINE}
  iconPosition={ICON_POSITIONS.RIGHT}
  showContent={true}
/>
```

### 좌측 탭 (세로 메뉴)
```jsx
<Tab 
  tabs={sidebarTabs}
  defaultActiveTab={0}
  position={TAB_POSITIONS.LEFT}
  iconPosition={ICON_POSITIONS.RIGHT}
/>
```

### 아이콘 없는 텍스트 탭
```jsx
<Tab 
  tabs={[
    { label: '탭 1', content: <div>첫 번째 탭 내용입니다.</div> },
    { label: '탭 2', content: <div>두 번째 탭 내용입니다.</div> },
    { label: '탭 3', content: <div>세 번째 탭 내용입니다.</div> },
  ]}
  defaultActiveTab={0}
/>
```

더 다양한 예제는 `TabExample.jsx` 파일을 참고하세요. 