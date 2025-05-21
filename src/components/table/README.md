# 테이블 컴포넌트 (Table Components)

이 폴더에는 PMS 시스템에서 사용되는 테이블 관련 컴포넌트가 포함되어 있습니다.

## 주요 컴포넌트

### CustomPrimeTable.jsx

PrimeReact 라이브러리를 기반으로 한 고급 데이터 테이블 컴포넌트입니다.

#### 주요 기능
- **데이터 표시**: 다양한 형식의 데이터를 표 형태로 표시
- **인라인 편집**: 셀 내에서 직접 데이터 편집 가능
- **다양한 입력 타입**: 텍스트, 숫자, 선택(드롭다운), 날짜 등 지원
- **행 선택**: 체크박스를 통한, 단일/다중 행 선택 기능
- **컨텍스트 메뉴**: 우클릭 시 컨텍스트 메뉴 표시
- **무한 스크롤**: '더보기' 기능을 통한 추가 데이터 로드
- **한글/영문 전용 입력**: 특정 언어만 입력 가능한 필드 지원

#### 사용 방법
```jsx
import CustomPrimeTable from '../components/table/CustomPrimeTable';

// 테이블에 표시할 데이터
const tableData = [
  { id: 1, name: '홍길동', department: '개발팀' },
  { id: 2, name: '김철수', department: '기획팀' }
];

// 컬럼 정의
const columns = [
  { field: 'id', header: '번호', width: '80px' },
  { field: 'name', header: '이름', width: '150px' },
  { field: 'department', header: '부서', width: '150px' }
];

// 컴포넌트 사용
<CustomPrimeTable 
  data={tableData}
  columns={columns}
  selectionEnabled={true}
  showRowNumbers={true}
  tableHeight="400px"
/>
```

### CustomPrimeTable.css

CustomPrimeTable 컴포넌트의 스타일을 정의하는 CSS 파일입니다.

#### 주요 스타일
- 테이블 레이아웃 및 셀 스타일
- 헤더 고정(sticky header) 기능
- 행 높이 고정
- 커스텀 스크롤바
- 폰트 및 색상 설정

## 기타 파일

### primeTable.css
레거시 스타일시트로, 일부 스타일이 CustomPrimeTable.css로 이전되었습니다.

### AppInner.jsx
애플리케이션의 내부 레이아웃을 구성하는 컴포넌트입니다. 