# 첨부 파일 컴포넌트 (Attachment Components)

이 폴더에는 PMS 시스템에서 파일 첨부 기능을 위한 컴포넌트가 포함되어 있습니다.

## 주요 컴포넌트

### AttachmentAdd.jsx

사용자가 파일을 업로드하고 첨부 파일 목록을 관리할 수 있는 컴포넌트입니다.

#### 주요 기능
- **파일 업로드**: 로컬 파일 시스템에서 파일 선택 및 업로드
- **드래그 앤 드롭**: 파일을 끌어다 놓는 방식의 업로드 지원
- **파일 목록 관리**: 업로드된 파일 목록 표시
- **파일 삭제**: 업로드된 파일 개별 삭제
- **파일 정보 표시**: 파일명, 종류, 크기, 첨부일자, 첨부자 등 정보 표시

#### 사용 방법
```jsx
import AttachmentAdd from '../components/attachment/AttachmentAdd';

// 기본 사용법
<AttachmentAdd 
  onFileUpload={handleFileUpload}
  onFileDelete={handleFileDelete}
  attachments={attachmentList}
/>

// 읽기 전용 모드
<AttachmentAdd 
  readOnly={true}
  attachments={attachmentList}
/>
```

### AttachmentList.jsx

업로드된 첨부 파일 목록을 표시하는 컴포넌트입니다.

#### 주요 기능
- **첨부 파일 목록 표시**: 테이블 형태로 파일 목록 표시
- **파일 다운로드**: 첨부 파일 다운로드 기능
- **파일 삭제**: 첨부 파일 삭제 기능 (권한에 따라 활성화)
- **파일 정보 표시**: 파일명, 종류, 크기, 업로드 일자 등 표시

#### 사용 방법
```jsx
import AttachmentList from '../components/attachment/AttachmentList';

// 기본 사용법
<AttachmentList 
  attachments={attachmentList}
  onDownload={handleDownload}
  onDelete={handleDelete}
/>

// 삭제 기능 비활성화
<AttachmentList 
  attachments={attachmentList}
  onDownload={handleDownload}
  allowDelete={false}
/>
``` 