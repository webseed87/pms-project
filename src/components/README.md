# PMS 컴포넌트 라이브러리

이 폴더에는 프로젝트 관리 시스템(PMS)에서 사용되는 모든 React 컴포넌트가 포함되어 있습니다. 각 하위 폴더는 특정 기능이나 UI 영역과 관련된 컴포넌트 그룹을 포함하고 있습니다.

## 컴포넌트 카테고리

각 카테고리별 상세 문서는 해당 폴더의 README.md 파일을 참조하세요.

### [테이블 컴포넌트 (Table Components)](./table/README.md)
데이터 테이블 관련 컴포넌트입니다. 프로젝트 데이터를 표 형식으로 표시하고 관리합니다.
- CustomPrimeTable: 다양한 기능을 갖춘 고급 데이터 테이블

### [폼 컴포넌트 (Form Components)](./form/README.md)
사용자 입력을 받는 폼과 관련된 컴포넌트입니다.
- FormField: 레이블이 있는 다양한 타입의 입력 필드

### [첨부 파일 컴포넌트 (Attachment Components)](./attachment/README.md)
파일 첨부 및 관리를 위한 컴포넌트입니다.
- AttachmentAdd: 파일 업로드 및 첨부 파일 관리
- AttachmentList: 첨부 파일 목록 표시

### [모달 컴포넌트 (Modal Components)](./modal/README.md)
팝업 형태로 표시되는 모달 컴포넌트입니다.
- TestDetailInfoModal: 테스트 상세 정보 표시
- DeveloperSearchModal: 개발자 검색 및 선택

### [UI 컴포넌트 (UI Components)](./ui/README.md)
기본적인 UI 요소들로 구성된 컴포넌트입니다. 디자인 시스템의 기반이 되는 컴포넌트 모음입니다.
- Button, Input, Select, DatePicker 등 기본 UI 컴포넌트

### [상단바 컴포넌트 (TopBar Components)](./topbar/README.md)
애플리케이션 상단에 위치하는 네비게이션 바 컴포넌트입니다.
- TopBar: 로고, 메뉴, 사용자 정보 등 표시

### [검색 컴포넌트 (Search Components)](./searchbox/README.md)
검색 기능과 관련된 컴포넌트입니다.
- SearchForm: 고급 검색 양식
- ToolBar: 검색 결과 작업 도구

### [사이드바 하단 컴포넌트 (Side Bottom Components)](./sdiebottom/README.md)
사이드바 하단에 위치하는 컴포넌트입니다.
- SideBottom: 빠른 링크, 설정, 도움말 등 제공

### [사용자 정보 박스 컴포넌트 (User Box Components)](./userbox/README.md)
사용자 정보 표시 및 관련 메뉴를 제공하는 컴포넌트입니다.
- UserBox: 사용자 이름, 팀 정보 표시 및 드롭다운 메뉴

## 사용 지침

### 컴포넌트 가져오기

```jsx
// 절대 경로 사용 (추천)
import CustomPrimeTable from 'src/components/table/CustomPrimeTable';
import FormField from 'src/components/form/FormField';

// 상대 경로 사용
import CustomPrimeTable from '../components/table/CustomPrimeTable';
```

### 새 컴포넌트 개발 시 유의사항

1. **폴더 구조**: 관련 컴포넌트는 동일한 폴더에 위치시킵니다.
2. **문서화**: 각 컴포넌트 폴더에는 README.md 파일을 통해 사용법을 문서화합니다.
3. **인덱스 파일**: 가능한 경우 index.js 파일을 사용하여 컴포넌트를 내보냅니다.
4. **독립성**: 컴포넌트는 가능한 독립적으로 설계하여 재사용성을 높입니다.
5. **Props 검증**: PropTypes를 사용하여 컴포넌트 속성을 검증합니다.
6. **스타일**: 컴포넌트별 스타일은 별도의 CSS 파일로 분리합니다. 