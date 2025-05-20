# Modal 컴포넌트

팝업 형태의 모달 다이얼로그를 표시하는 컴포넌트입니다.

## 기능

- 화면 중앙에 오버레이와 함께 표시
- 모달 타이틀과 닫기 버튼 제공
- 스크롤 가능한 내용 영역
- 배경 클릭으로 닫기 옵션
- 다양한 너비 옵션

## 컴포넌트 구조

```
src/components/ui/Modal/
├── Modal.jsx          # 메인 모달 컴포넌트
└── README.md          # 현재 문서
```

## 사용법

```jsx
import Modal from './components/ui/Modal/Modal';
import { useState } from 'react';

// 모달 상태 관리
const [isModalOpen, setIsModalOpen] = useState(false);

// 모달 컴포넌트 사용
<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="모달 제목"
>
  <div>모달 내용을 이곳에 작성합니다.</div>
</Modal>

// 모달 열기 버튼
<button onClick={() => setIsModalOpen(true)}>
  모달 열기
</button>
```

## Props

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `isOpen` | Boolean | 필수 | 모달 열림 여부 |
| `onClose` | Function | 필수 | 모달 닫기 핸들러 |
| `title` | String | 필수 | 모달 타이틀 |
| `children` | Node | 필수 | 모달 내용 |
| `width` | String | 'max-w-3xl' | 모달 너비 클래스 |
| `closeOnOverlayClick` | Boolean | true | 오버레이 클릭 시 닫기 여부 |

## 예제

### 기본 모달

```jsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="알림"
>
  <p>모달 내용입니다.</p>
</Modal>
```

### 커스텀 너비 모달

```jsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="큰 모달"
  width="max-w-5xl"
>
  <p>넓은 모달 내용입니다.</p>
</Modal>
```

### 오버레이 클릭으로 닫기 비활성화

```jsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="중요 정보"
  closeOnOverlayClick={false}
>
  <p>이 모달은 오버레이 클릭으로 닫히지 않습니다.</p>
</Modal>
``` 