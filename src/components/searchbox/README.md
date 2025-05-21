# 검색 컴포넌트 (Search Components)

이 폴더에는 PMS 시스템에서 사용되는 검색 관련 컴포넌트가 포함되어 있습니다.

## 주요 컴포넌트

### SearchForm.jsx

고급 검색 양식 컴포넌트로, 다양한 필터와 옵션을 통해 데이터를 검색할 수 있습니다.

#### 주요 기능
- **키워드 검색**: 텍스트 기반 검색 기능
- **다중 필터**: 다양한 속성별 필터링 옵션
- **날짜 범위 검색**: 특정 기간 내 데이터 검색
- **카테고리 검색**: 카테고리별 데이터 분류 및 검색
- **검색 결과 정렬**: 다양한 기준으로 결과 정렬
- **검색 기록**: 최근 검색 기록 저장 및 재사용

#### 사용 방법
```jsx
import SearchForm from '../components/searchbox/SearchForm';

// 기본 사용법
<SearchForm 
  onSearch={handleSearch}
  categories={categoryList}
  defaultFilters={initialFilters}
  saveSearchHistory={true}
/>
```

### SearchForm.css

SearchForm 컴포넌트의 스타일링을 담당하는 CSS 파일입니다.

### ToolBar.jsx

검색 결과에 대한 추가 작업 도구를 제공하는 툴바 컴포넌트입니다.

#### 주요 기능
- **검색 결과 액션**: 검색 결과에 대한 일괄 작업 도구
- **필터 토글**: 검색 필터 표시/숨김 기능
- **보기 방식 전환**: 리스트/그리드 등 다양한 보기 방식 전환
- **내보내기**: 검색 결과 내보내기 기능

#### 사용 방법
```jsx
import ToolBar from '../components/searchbox/ToolBar';

// 기본 사용법
<ToolBar 
  resultCount={searchResults.length}
  onExport={handleExport}
  onViewChange={handleViewChange}
  viewMode="list"
/>
``` 