# 사이드바 하단 컴포넌트 (Side Bottom Components)

이 폴더에는 PMS 시스템의 사이드바 하단에 위치하는 컴포넌트가 포함되어 있습니다.

## 주요 컴포넌트

### SideBottom.jsx

사이드바 하단에 위치하는 기능 버튼 및 링크를 제공하는 컴포넌트입니다.

#### 주요 기능
- **빠른 링크**: 자주 사용하는 페이지로의 빠른 접근 링크
- **설정 버튼**: 앱 설정에 접근하는 버튼
- **도움말 링크**: 사용자 매뉴얼 및 도움말 액세스
- **버전 정보**: 현재 애플리케이션 버전 표시
- **지원 정보**: 고객 지원 연락처 링크

#### 사용 방법
```jsx
import SideBottom from '../components/sdiebottom';

// 기본 사용법
<SideBottom 
  version="1.0.0"
  onSettingsClick={handleSettingsClick}
  onHelpClick={handleHelpClick}
  quickLinks={[
    { label: '대시보드', path: '/dashboard' },
    { label: '내 작업', path: '/my-tasks' }
  ]}
/>
```

### index.js

SideBottom 컴포넌트를 쉽게 임포트할 수 있도록 하는 인덱스 파일입니다. 