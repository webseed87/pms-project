import React, { useState, useCallback, useMemo, useEffect } from 'react';
import CustomPrimeTable from './CustomPrimeTable';
import { Dialog } from 'primereact/dialog';
import Button, { BUTTON_TYPES } from '../ui/Button';
import 'primereact/resources/themes/lara-light-blue/theme.css'; // 테마
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { PencilSquareIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

/**
 * 테이블 기능을 보여주는 메인 컴포넌트
 * PrimeReact DataTable을 활용한 CRUD 예제와 다양한 테이블 기능을 시연합니다.
 */
export default function AppInner() {
  // ===== 상태 관리 =====
  // 테이블 데이터 샘플
  const [sampleData, setSampleData] = useState([
    { id: 1, company:'테스트', name: '홍길동', age: 30, gender: 'M', birth: '1992-05-01', test1: 'A', test3: '한글만입력', test4: 'onlyEng', develop: '정창인1' },
    { id: 2, company:'테스트임',name: '이순신', age: 45, gender: 'W', birth: '1978-04-05', test1: 'B', test3: '한글만입력', test4: 'onlyEng', develop: '정창인2' },
    { id: 3, company: '새로운 회사', name: '김유신', age: 38, gender: 'M', birth: '1985-07-10', test1: 'C', test3: '한글만입력', test4: 'onlyEng', develop: '정창인3' },
    { id: 4, company: '추가된 회사', name: '장보고', age: 50, gender: 'W', birth: '1975-09-20', test1: 'D', test3: '한글만입력', test4: 'onlyEng', develop: '정창인4' },
    { id: 5, company: '다른 회사', name: '강감찬', age: 42, gender: 'M', birth: '1980-12-15', test1: 'A', test3: '한글만입력', test4: 'onlyEng', develop: '정창인5' },
    { id: 6, company: '테스트 회사', name: '을지문덕', age: 36, gender: 'M', birth: '1988-03-25', test1: 'B', test3: '한글만입력', test4: 'onlyEng', develop: '정창인6' },
    { id: 7, company: '다른 회사', name: '강감찬', age: 42, gender: 'M', birth: '1980-12-15', test1: 'A', test3: '한글만입력', test4: 'onlyEng', develop: '정창인5' },
    { id: 8, company: '테스트 회사', name: '을지문덕', age: 36, gender: 'M', birth: '1988-03-25', test1: 'B', test3: '한글만입력', test4: 'onlyEng', develop: '정창인6' },
  ]);
  const [modifiedData, setModifiedData] = useState([]); // 수정된 row만 추적하여 서버 저장 시 필요
  const [dialogVisible, setDialogVisible] = useState(false); // 팝업 표시 여부
  const [dialogContent, setDialogContent] = useState(''); // 팝업 내용
  const [selectedRows, setSelectedRows] = useState([]); // 선택된 행 추적
  const [loadMoreItem, setLoadMoreItem] = useState(true); // 테이블 더보기 기능 상태
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  
  // Listen for window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ===== 설정 및 옵션 정의 =====
  // Select 필드 옵션 정의 (select 타입 필드에 사용)
  const selectOptionsMap = useMemo(() => ({
    gender: [
      { label: '남자', value: 'M' },
      { label: '여자', value: 'W' },
    ],
    test1: [
      { label: '테스트A', value: 'A' },
      { label: '테스트B', value: 'B' },
      { label: '테스트C', value: 'C' },
    ],
  }), []);

  // 컬럼 정의 - 각 컬럼의 속성 및 동작 설정
  const columns = useMemo(() => [
    { field: 'company', header: '발주사 명', editable: true, type: 'text', searchBtn: true, searchBtnText: '발주사 조회', width: '150px', sortable: true},
    { field: 'name', header: '이름', editable: true, type: 'text', width: '100px', sortable: true },
    { field: 'age', header: '나이', editable: true, type: 'num', width: '100px', sortable: true },
    { field: 'gender', header: '성별', editable: true, type: 'select', width: '100px', sortable: true },
    { field: 'birth', header: '생년월일', editable: true, type: 'date', width: '150px', sortable: true },
    { field: 'test1', header: '테스트1', editable: true, type: 'select', width: '120px', sortable: true },
    { field: 'test3', header: '한글만', editable: true, type: 'korText', width: '120px', sortable: true },
    { field: 'test4', header: 'onlyEng', editable: true, type: 'engText', width: '120px', sortable: true },
    { field: 'develop', header: '개발자 명', editable: true, type: 'text', searchBtn: true, searchBtnText: '개발자 조회', width: '150px', sortable: true },
  ], []);

  // 우클릭 메뉴 항목 정의
  const menuItems = useMemo(() => [
    {
      label: '팝업1',
      icon: 'pi pi-pencil',
      command: (e) => showSamplePopup('edit', e.value, e.item.label),
    },
    {
      label: '팝업2',
      icon: 'pi pi-trash',
      command: (e) => showSamplePopup('delete', e.value, e.item.label),
    },
  ], []);

  // ===== 이벤트 핸들러 =====
  /**
   * 우클릭 메뉴 팝업 표시 함수
   * @param {string} type - 액션 타입 ('edit' 또는 'delete')
   * @param {Object} row - 선택된 행 데이터
   * @param {string} label - 메뉴 항목 라벨
   */
  const showSamplePopup = useCallback((type, row, label) => {
    if (!row) return;

    const message = (
      <div>
        <div className="mb-2">
          {type === 'edit' ? '✏️' : '🗑️'} <strong>{label} 클릭됨</strong>
        </div>
        <div>이름: {row.name}</div>
        <div>나이: {row.age}</div>
        <div>성별: {row.gender}</div>
        <div>생년월일: {row.birth}</div>
        <div>테스트1: {row.test1}</div>
      </div>
    );

    setDialogContent(message);
    setDialogVisible(true);
  }, []);

  /**
   * 돋보기 버튼 클릭 시 팝업 표시 함수
   * @param {Object} popupData - 클릭된 행 데이터
   * @param {string} field - 클릭된 필드명
   */
  const handleShowPopup = useCallback((popupData, field) => {
    const message = (
      <div>
        <div className="mb-2">
          🔍 <h3>{field}</h3>
          🔍 <strong>돋보기 클릭됨</strong>
        </div>
        <div>이름: {popupData.name}</div>
        <div>나이: {popupData.age}</div>
        <div>성별: {popupData.gender}</div>
        <div>생년월일: {popupData.birth}</div>
        <div>테스트1: {popupData.test1}</div>
      </div>
    );
  
    setDialogContent(message);
    setDialogVisible(true);
  }, []);  

  /**
   * 셀 편집 완료 시 처리 함수
   * 1. 로컬 테이블 데이터 업데이트
   * 2. 변경된 데이터 추적하여 저장
   */
  const handleCellEditComplete = useCallback(({ rowData, newValue, field }) => {
    const updatedRow = { ...rowData, [field]: newValue };

    // 테이블 데이터 업데이트
    setSampleData((prev) =>
      prev.map((item) =>
        item.id === rowData.id ? updatedRow : item
      )
    );

    // 변경 데이터 추적
    setModifiedData((prev) => {
      const existing = prev.find((item) => item.id === rowData.id);
      if (existing) {
        // 이미 수정된 행이 있으면 해당 필드만 업데이트
        return prev.map((item) =>
          item.id === rowData.id ? { ...existing, [field]: newValue } : item
        );
      } else {
        // 새로 수정된 행이면 추가
        return [...prev, updatedRow];
      }
    });
  }, []);

  /**
   * 행 선택 변경 핸들러
   */
  const handleRowSelect = useCallback((e) => {
    console.log('행 선택 이벤트:', e);
    setSelectedRows(e.value);
  }, []);

  /**
   * 새 행 추가 핸들러
   */
  const handleAddRow = useCallback(() => {
    const newId = sampleData.length > 0 ? Math.max(...sampleData.map(d => d.id)) + 1 : 1;
    const newRow = {
      id: newId,
      company: '',
      develop: '',
      name: '',
      age: 0,
      gender: 'M', // 기본값 설정
      birth: '',
      test1: '',
      test3: '',
      test4: '',
    };
    setSampleData((prev) => [...prev, newRow]);
  }, [sampleData]); 

  /**
   * 선택한 행 삭제 핸들러
   */
  const handleDeleteRows = useCallback(() => {
    if (selectedRows.length === 0) {
      alert('삭제할 항목을 선택하세요.');
      return;
    }
    const idsToDelete = selectedRows.map(row => row.id);
    setSampleData((prev) => prev.filter((item) => !idsToDelete.includes(item.id)));
    setSelectedRows([]); // 선택 해제
  }, [selectedRows]);

  /**
   * 데이터 저장 핸들러 - 실제로는 API 호출
   */
  const handleSaveData = useCallback(() => {
    if (modifiedData.length === 0) {
      alert('변경된 항목이 없습니다.');
      return;
    }
  
    // 실제 구현 시에는 API 호출
    console.log('저장할 데이터:', modifiedData);
    
    // 성공 시 변경 데이터 초기화
    // setModifiedData([]);
    alert(`${modifiedData.length}개 항목이 저장되었습니다.`);
  }, [modifiedData]);

  /**
   * 행 더블클릭 핸들러
   */
  const handleDoubleClick = useCallback((row) => {
    console.log('더블클릭된 행:', row);
  }, []);  

  /**
   * 더보기(무한스크롤) 구현을 위한 데이터 로드 함수
   */
  const handleParentLoadMore = useCallback(() => {
    const lastId = sampleData.length > 0 ? Math.max(...sampleData.map(row => row.id)) : 0;
    
    // 새로운 데이터 추가 (실제로는 API 호출)
    const newRows = [
      { id: lastId + 1, company: '새로운 회사', name: '김유신', age: 38, gender: 'M', birth: '1985-07-10', test1: 'C', test3: '한글만입력', test4: 'onlyEng', develop: '정창인3' },
      { id: lastId + 2, company: '추가된 회사', name: '장보고', age: 50, gender: 'W', birth: '1975-09-20', test1: 'D', test3: '한글만입력', test4: 'onlyEng', develop: '정창인4' },
      { id: lastId + 3, company: '추가된 회사', name: '장보고', age: 50, gender: 'W', birth: '1975-09-20', test1: 'D', test3: '한글만입력', test4: 'onlyEng', develop: '정창인4' },
      { id: lastId + 4, company: '추가된 회사', name: '장보고', age: 50, gender: 'W', birth: '1975-09-20', test1: 'D', test3: '한글만입력', test4: 'onlyEng', develop: '정창인4' },
      // 추가 데이터...
    ];
    
    setSampleData(prev => [...prev, ...newRows]);
    
    // 데이터가 충분히 로드되었으면 더보기 비활성화
    if(sampleData.length > 8) {
      setLoadMoreItem(false);
    } else {
      setLoadMoreItem(true);
    }
  }, [sampleData]);

  return (
    <div >
      {/* 버튼 그룹 */}
      <div className="w-full self-stretch px-4 py-3 bg-gray-50 border-t border-r border-l border-gray-300 inline-flex justify-end items-center">
      <div className="flex justify-start items-center gap-2">
        <Button 
          buttonType={BUTTON_TYPES.ADD}
          size="medium"
          onClick={handleAddRow}
          icon={<PlusIcon />}
        >
          추가
        </Button>
        <Button 
          buttonType={BUTTON_TYPES.DELETE}
          size="medium"
          onClick={handleDeleteRows}
          icon={<TrashIcon />}
        >
          삭제
        </Button>
        <Button 
        buttonType={BUTTON_TYPES.SAVE}
        icon={<PencilSquareIcon/>}
      >
        저장
      </Button>
      </div>
      </div>

      {/* 테이블 컴포넌트 */}
      <div className="self-stretch p-4 bg-white outline outline-1 outline-offset-[-1px] outline-gray-300 inline-flex justify-between items-center" style={{
          width: '100%', 
          flex: '1', 
          display: 'flex', 
          overflow: 'hidden', 
          paddingBottom: windowHeight <= 900 ? '60px' : '20px'
      }}>

        <CustomPrimeTable
          style={{
            width: '100%', 
            overflow:'auto',
            borderTop: '1px solid #0F172B',
            '--scrollbar-thumb-color': '#E2E8F0',
            '--scrollbar-track-color': '#f8fafc',
            '--scrollbar-hover-color': '#cbd5e1',
            scrollbarWidth: 'thin',
            scrollbarColor: 'var(--scrollbar-thumb-color) var(--scrollbar-track-color)',
            
          }}
          data={sampleData}                               // 테이블 데이터
          columns={columns}                               // 컬럼 정의
          selectionEnabled={true}                         // 체크박스 선택 활성화
          cellEditEnabled={true}                          // 셀 편집 활성화
          contextMenuEnabled={true}                       // 컨텍스트 메뉴 활성화
          contextMenuItems={menuItems}                    // 컨텍스트 메뉴 항목
          showMoreButton={true}                           // 더보기 버튼 표시
          showRowNumbers={true}                           // 행 번호 표시
          onDoubleClick={handleDoubleClick}               // 행 더블클릭 이벤트
          handleCellEditComplete={handleCellEditComplete} // 셀 편집 완료 핸들러
          selectOptionsMap={selectOptionsMap}             // select 타입 필드 옵션
          selection={selectedRows}                        // 선택된 행 상태
          onSelectionChange={handleRowSelect}             // 선택 변경 핸들러
          onShowPopup={handleShowPopup}                   // 돋보기 버튼 팝업 핸들러
          setLoadMore={loadMoreItem}                      // 더보기 버튼 표시 여부
          onLoadMore={handleParentLoadMore}               // 더보기 클릭 핸들러
        />
      </div>

      {/* 정보 표시용 팝업 다이얼로그 */}
      <Dialog
        header="샘플 팝업"
        visible={dialogVisible}
        style={{ width: '300px' }}
        onHide={() => setDialogVisible(false)}
        dismissableMask
        draggable={false}
      >
        {dialogContent}
      </Dialog>
    </div>
  );
}
