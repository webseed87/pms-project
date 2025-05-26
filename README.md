# PMS 시스템 컴포넌트 가이드 

[피그마 시안](https://www.figma.com/design/5Grjwwuc24FNiI412CUT2g/new-PMS?node-id=6-3693&t=S7R0EWo6A9ASH5en-1)

Tailwind CSS를 사용하여 구현된 재사용 가능한 UI 컴포넌트 라이브러리입니다.

## 📚 컴포넌트 문서

각 컴포넌트의 자세한 사용법과 예제는 해당 컴포넌트의 README 파일을 참조하세요:

### 기본 UI 컴포넌트

| 컴포넌트 | 문서 | 주요 기능 |
|---------|------|-----------|
| Button | [문서](src/components/ui/Button/README.md) | 다양한 스타일, 크기, 상태 지원 |
| Checkbox | [문서](src/components/ui/Checkbox/README.md) | 단일/그룹 선택, 중간 상태 지원 |
| DatePicker | [문서](src/components/ui/DatePicker/README.md) | 날짜/기간 선택, 입력 필드 통합 |
| Input | [문서](src/components/ui/Input/README.md) | 다양한 입력 타입, 상태 표시 |
| Label | [문서](src/components/ui/Label/README.md) | 필수 항목, 도움말 텍스트 지원 |
| Menu | [문서](src/components/ui/Menu/README.md) | 계층적 메뉴, 전체/개별 토글 |
| Modal | [문서](src/components/ui/Modal/README.md) | 다양한 크기, 오버레이 설정 |
| Radio | [문서](src/components/ui/Radio/README.md) | 단일 선택, 크기 옵션 |
| Select | [문서](src/components/ui/Select/README.md) | 단일/다중 선택, 검색 기능 |
| State | [문서](src/components/ui/State/README.md) | 상태 표시, 뱃지 스타일 |
| Tab | [문서](src/components/ui/Tab/README.md) | 다양한 레이아웃, 아이콘 위치 |

### 복합 컴포넌트

| 컴포넌트 | 문서 | 설명 |
|---------|------|------|
| Table | [문서](src/components/table/README.md) | PrimeReact 기반 데이터 테이블 |
| Form | [문서](src/components/form/README.md) | 폼 필드 및 유효성 검사 |
| Attachment | [문서](src/components/attachment/README.md) | 파일 첨부 및 관리 |
| SearchBox | [문서](src/components/searchbox/README.md) | 고급 검색 및 필터링 |
| UserBox | [문서](src/components/userbox/README.md) | 사용자 정보 및 메뉴 |

## 🗂 프로젝트 구조

```
src/
├── components/           # 컴포넌트 루트 디렉토리
│   ├── ui/              # 기본 UI 컴포넌트
│   │   ├── Button/      # 버튼 컴포넌트
│   │   ├── Checkbox/    # 체크박스 컴포넌트
│   │   ├── DatePicker/  # 날짜 선택 컴포넌트
│   │   ├── Input/       # 입력 필드 컴포넌트
│   │   ├── Label/       # 레이블 컴포넌트
│   │   ├── Menu/        # 메뉴 컴포넌트
│   │   ├── Modal/       # 모달 컴포넌트
│   │   ├── Radio/       # 라디오 컴포넌트
│   │   ├── Select/      # 선택 컴포넌트
│   │   ├── State/       # 상태 표시 컴포넌트
│   │   └── Tab/         # 탭 컴포넌트
│   ├── table/           # 테이블 컴포넌트
│   ├── form/            # 폼 컴포넌트
│   ├── attachment/      # 첨부 파일 컴포넌트
│   ├── searchbox/       # 검색 컴포넌트
│   └── userbox/         # 사용자 정보 컴포넌트
└── pages/               # 페이지 컴포넌트
    └── UiComponentsPage.jsx  # UI 컴포넌트 예제 페이지
```

## 💻 컴포넌트 개발 가이드

### 컴포넌트 구조

각 컴포넌트는 다음 구조를 따릅니다:

```
components/ui/[컴포넌트명]/
├── [컴포넌트명].jsx     # 메인 컴포넌트
├── [컴포넌트명]Example.jsx  # 사용 예제
├── index.js            # 내보내기
└── README.md           # 컴포넌트 문서
```

### 문서화 규칙

각 컴포넌트의 README.md는 다음 내용을 포함해야 합니다:

1. 컴포넌트 개요
2. 주요 기능
3. Props 설명
4. 사용 예제
5. 접근성 고려사항

### 개발 원칙

1. **재사용성**: 컴포넌트는 독립적이고 재사용 가능하게 설계
2. **접근성**: WCAG 가이드라인 준수
3. **성능**: 불필요한 리렌더링 방지
4. **타입 안정성**: PropTypes 또는 TypeScript 사용
5. **테스트**: 단위 테스트 작성

## 🎨 디자인 시스템

- Tailwind CSS 기반 스타일링
- 일관된 디자인 토큰 사용
- 반응형 디자인 지원
- 다크 모드 대응

## 📌 참고사항

- 컴포넌트는 props를 통한 설정 우선
- 커스텀 스타일은 className prop 사용
- 새로운 기능은 별도 컴포넌트로 개발
- 기존 컴포넌트 수정 시 하위 호환성 유지