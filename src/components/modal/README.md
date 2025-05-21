# 모달 컴포넌트 (Modal Components)

이 폴더에는 PMS 시스템에서 사용되는 모달(팝업) 관련 컴포넌트가 포함되어 있습니다.

## 주요 컴포넌트

### TestDetailInfoModal.jsx

테스트 상세 정보를 표시하는 모달 컴포넌트입니다.

#### 주요 기능
- **상세 정보 표시**: 테스트 관련 세부 정보를 모달 형태로 표시
- **정보 편집**: 권한에 따라 정보 편집 기능 제공
- **섹션 구분**: 여러 섹션으로 나누어 정보 구성
- **반응형 레이아웃**: 다양한 화면 크기에 맞춰 반응하는 UI

#### 사용 방법
```jsx
import TestDetailInfoModal from '../components/modal/TestDetailInfoModal';

// 기본 사용법
<TestDetailInfoModal
  visible={isModalVisible}
  onHide={() => setIsModalVisible(false)}
  testData={selectedTestData}
  onSave={handleSaveTestData}
/>
```

### DeveloperSearchModal.jsx

개발자 검색 및, 선택을 위한 모달 컴포넌트입니다.

#### 주요 기능
- **개발자 검색**: 이름, 소속 등으로 개발자 검색
- **검색 결과 표시**: 검색된 개발자 목록 표시
- **개발자 선택**: 단일 또는 다중 개발자 선택 기능
- **선택 완료**: 선택된 개발자 정보를 부모 컴포넌트로 전달

#### 사용 방법
```jsx
import DeveloperSearchModal from '../components/modal/DeveloperSearchModal';

// 단일 선택 모드
<DeveloperSearchModal
  visible={isModalVisible}
  onHide={() => setIsModalVisible(false)}
  onSelect={handleDeveloperSelect}
  multiSelect={false}
/>

// 다중 선택 모드
<DeveloperSearchModal
  visible={isModalVisible}
  onHide={() => setIsModalVisible(false)}
  onSelect={handleDevelopersSelect}
  multiSelect={true}
/>
``` 