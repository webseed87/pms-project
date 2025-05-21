# 상단바 컴포넌트 (TopBar Components)

이 폴더에는 PMS 시스템의 상단바(헤더) 컴포넌트가 포함되어 있습니다.

## 주요 컴포넌트

### TopBar.jsx

애플리케이션 상단에 위치하는 네비게이션 바 컴포넌트입니다.

#### 주요 기능
- **로고 표시**: 애플리케이션 로고 및 제목 표시
- **네비게이션 메뉴**: 주요 메뉴 링크 제공
- **사용자 정보**: 로그인한 사용자 정보 및 옵션 표시
- **알림**: 시스템 알림 표시
- **검색**: 전체 시스템 검색 기능 제공

#### 사용 방법
```jsx
import TopBar from '../components/topbar';

// 기본 사용법
<TopBar 
  userName="김철수"
  userRole="관리자"
  notifications={notificationList}
  onProfileClick={handleProfileClick}
  onLogoutClick={handleLogout}
/>
```

### index.js

TopBar 컴포넌트를 쉽게 임포트할 수 있도록 하는 인덱스 파일입니다. 