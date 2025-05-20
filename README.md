# PMS 시스템 컴포넌트 가이드 

[피그마 시안](https://www.figma.com/design/5Grjwwuc24FNiI412CUT2g/new-PMS?node-id=6-3693&t=S7R0EWo6A9ASH5en-1)

tailwindcss 사용하여 만든 컴포넌트 가이드 입니다.

## 컴포넌트 목록

| 컴포넌트 | 경로 | 설명 |
|---------|-----|------|
| Tab | [src/components/ui/Tab](src/components/ui/Tab) | 다양한 스타일과 레이아웃 옵션을 제공하는 탭 메뉴 컴포넌트 |
| Button | [src/components/ui/Button](src/components/ui/Button) | 다양한 스타일, 크기, 상태를 지원하는 버튼 컴포넌트 |
| Checkbox | [src/components/ui/Checkbox](src/components/ui/Checkbox) | 체크박스 입력 컴포넌트 |
| DatePicker | [src/components/ui/DatePicker](src/components/ui/DatePicker) | 날짜 선택 컴포넌트 |
| Input | [src/components/ui/Input](src/components/ui/Input) | 텍스트 입력 필드 컴포넌트 |
| Label | [src/components/ui/Label](src/components/ui/Label) | 폼 요소의 레이블 컴포넌트 |
| Menu | [src/components/ui/Menu](src/components/ui/Menu) | 드롭다운 및 컨텍스트 메뉴 컴포넌트 |
| Select | [src/components/ui/Select](src/components/ui/Select) | 드롭다운 선택 컴포넌트 |

## 컴포넌트 주요 기능 및 사용법

### Tab 컴포넌트
다양한 스타일과 레이아웃 옵션을 제공하는 탭 메뉴 컴포넌트입니다.
- 가로(상단)/세로(좌측) 레이아웃
- 아이콘 위치 커스터마이징
- 다양한 디자인 스타일 (기본, 아웃라인)
- 텍스트 오버플로우 처리 (120px 초과 시 말줄임표)

### Button 컴포넌트
다양한 스타일, 크기, 상태를 지원하는 버튼 컴포넌트입니다.
- 여러 변형: 기본, 주요, 아웃라인, 텍스트
- 크기: 소, 중, 대
- 아이콘 지원 (왼쪽/오른쪽)
- 비활성화 상태 지원

### Checkbox 컴포넌트
사용자 선택 입력을 위한 체크박스 컴포넌트입니다.
- 체크, 미체크, 부분 체크 상태
- 비활성화 상태 지원
- 커스텀 레이블 지원

### DatePicker 컴포넌트
날짜 및 날짜 범위 선택을 위한 컴포넌트입니다.
- 단일 날짜 및 기간 선택
- 달력 네비게이션
- 날짜 형식 커스터마이징

### Input 컴포넌트
텍스트 입력을 위한 기본 컴포넌트입니다.
- 다양한 입력 타입 지원
- 접두/접미 아이콘
- 유효성 검사 상태 표시
- 크기 옵션

### Label 컴포넌트
폼 요소의 레이블을 표시하는 컴포넌트입니다.
- 필수 항목 표시
- 도움말 텍스트 지원
- 에러 메시지 표시

### Menu 컴포넌트
드롭다운 및 컨텍스트 메뉴를 제공하는 컴포넌트입니다.
- 계층적 메뉴 구조
- 아이콘 지원
- 키보드 네비게이션
- 호버/클릭 액션

### Select 컴포넌트
옵션 선택을 위한 드롭다운 컴포넌트입니다.
- 단일/다중 선택
- 옵션 그룹화
- 검색 기능
- 커스텀 렌더링

## 컴포넌트 사용 가이드라인

### 1. 일관된 스타일링

모든 컴포넌트는 Tailwind CSS를 사용하여 스타일링되었습니다. 프로젝트 전체에서 일관된 디자인 시스템을 유지하기 위해 커스텀 스타일보다는 제공된 속성(props)을 사용하여 컴포넌트를 조정하세요.

### 2. 접근성

컴포넌트는 웹 접근성 가이드라인을 준수하도록 설계되었습니다. 사용 시 다음 사항을 고려하세요:
- 아이콘만 있는 버튼에는 적절한 aria-label 제공
- 키보드 네비게이션 지원
- 적절한 색상 대비 유지

### 3. 성능 최적화

컴포넌트 사용 시 다음 사항을 고려하세요:
- 불필요한 리렌더링 방지
- 큰 목록이나 테이블에는 가상화 기법 적용 고려
- 큰 컴포넌트는 동적 임포트를 통한 코드 분할 고려

## 컴포넌트 개발 시작하기

1. 컴포넌트 디렉토리 구조 유지:
```
src/components/ui/[컴포넌트명]/
├── [컴포넌트명].jsx  # 메인 컴포넌트
├── [컴포넌트명]Example.jsx  # 사용 예제
└── README.md  # 문서
```

2. 새 컴포넌트를 추가할 때 이 가이드에 문서화하세요.

## 개발 환경 설정

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```
