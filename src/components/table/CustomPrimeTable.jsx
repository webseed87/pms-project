import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
// PrimeReact 컴포넌트 import
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { ContextMenu } from 'primereact/contextmenu';
import { Button as PrimeButton } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import { Dialog } from 'primereact/dialog';
import { Tooltip } from 'primereact/tooltip';
import Button, { BUTTON_TYPES } from '../ui/Button';
import { ArrowDownIcon } from '@heroicons/react/24/outline';
import './primeTable.css';

/**
 * 한글 로케일을 Calendar 컴포넌트에 등록
 * 달력의 요일, 월 이름 등을 한글로 지정
 */
addLocale('ko-number', {
  firstDayOfWeek: 0,
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
  monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
  monthNamesShort: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
  today: '오늘',
  clear: '초기화',
  chooseDate: '날짜 선택'
});

/**
 * 고급 데이터 테이블 컴포넌트
 * PrimeReact의 DataTable을 확장하여 다양한 기능을 추가한 커스텀 테이블
 * 
 * 주요 기능:
 * - 셀 인라인 편집 (다양한 타입: 텍스트, 숫자, 선택, 날짜 등)
 * - 행 선택 (체크박스)
 * - 컨텍스트 메뉴 (우클릭)
 * - 정렬 및 필터링
 * - 무한 스크롤 (더보기 기능)
 * - 한글/영문 전용 입력 필드
 */
export default function CustomPrimeTable({
  data,                       // 테이블 데이터
  columns = [],               // 컬럼 정의 배열
  selectionEnabled = false,   // 선택(체크박스) 활성화 여부
  cellEditEnabled = false,    // 셀 인라인 수정 활성화 여부
  onDoubleClick = null,       // 더블클릭 이벤트 핸들러
  contextMenuEnabled = false, // 우클릭 컨텍스트 메뉴 활성화 여부
  contextMenuItems = [],      // 컨텍스트 메뉴 항목
  showMoreButton = false,     // "더보기" 버튼 활성화 여부
  showRowNumbers = false,     // 행 번호 열 표시 여부
  handleCellEditComplete = null, // 셀 수정 완료 이벤트 핸들러
  selectOptionsMap = {},      // select형 필드 옵션 목록 (field -> options)
  selection = null,           // 외부로부터 전달받는 선택된 행 데이터
  onSelectionChange = null,   // 외부로부터 전달받는 선택 이벤트 핸들러
  onShowPopup = null,         // 팝업오픈
  setLoadMore = false,        // 마지막 행 테이블 데이터 유무
  onLoadMore = null,          // 마지막 행 테이블 데이터 불러오기
  tableHeight = '300px',      // 테이블 높이
  style,                      // 컴포넌트 스타일
}) {
  // ===== 내부 상태 관리 =====
  const [tableData, setTableData] = useState(data);                  // 테이블 데이터 상태
  const [contextMenuSelection, setContextMenuSelection] = useState(null); // 현재 우클릭한 row 상태
  const contextMenuRef = useRef(null);                               // ContextMenu 참조
  const [customContextItems, setCustomContextItems] = useState([]);  // 가공된 ContextMenu 항목
  const [currentSelection, setCurrentSelection] = useState(selection || []); // 내부 선택 상태 관리

  // 팝업 관련 상태 추가
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);

  // 무한 스크롤 구현을 위한 데이터 처리
  const loadMoreData = useMemo(() => 
    setLoadMore ? [...data, { isBlurRow: setLoadMore, id: 'blur-row' }] : data, 
  [data, setLoadMore]);

  // 선택 상태 업데이트 효과
  useEffect(() => {
    if (selection !== null) {
      setCurrentSelection(selection);
    }
  }, [selection]);

  // ===== 사이드 이펙트 처리 =====
  
  /**
   * contextMenuSelection 변경 시 contextMenuItems에 row 데이터 포함한 command 설정
   * 우클릭 메뉴 항목에 클릭된 행 데이터를 전달하여 메뉴 동작 시 해당 행 정보를 사용할 수 있도록 함
   */
  useEffect(() => {
    if (contextMenuEnabled && contextMenuItems.length > 0 && contextMenuSelection) {
      const updatedItems = contextMenuItems.map(item => ({
        ...item,
        command: (e) => {
          if (item.command) {
            item.command({
              ...e,
              value: contextMenuSelection, // 클릭한 row 데이터 전달
              item,                        // 메뉴 항목 정보도 전달
            });
          }
        }
      }));
      setCustomContextItems(updatedItems);
    }
  }, [contextMenuSelection, contextMenuItems, contextMenuEnabled]);

  /**
   * 외부 data prop 변경 시 tableData 상태 갱신
   */
  useEffect(() => {
    setTableData(data);
  }, [data]);

  /**
   * window 전역 클릭 판별 함수 (중복 방지)
   * 클릭 이벤트 전파 관련 헬퍼 함수를 전역에 한 번만 등록
   */
  useEffect(() => {
    if (!window.isOutsideClicked) {
      window.isOutsideClicked = (event, element) => {
        return element && !element.contains(event.target);
      };
    }
  }, []);  

  // ===== 에디터 컴포넌트 (셀 편집) =====
  
  /**
   * 기본 텍스트 에디터 컴포넌트
   * 일반 텍스트 필드 편집용
   */
  const textEditor = useCallback((options) => {
    const { rowData } = options;
    if (rowData.isBlurRow) {
      return;
    }
    return(
      <InputText
        value={options.value || ''}
        style={{width: '100%', height: '100%', boxSizing: 'border-box'}}
        onChange={(e) => options.editorCallback(e.target.value)}
        autoFocus
      />
    )
  }, []);

  /**
   * 영문+숫자만 입력 가능한 텍스트 에디터
   */
  const textEditorEnglishOnly = useCallback((options) => {
    const { rowData } = options;
    if (rowData.isBlurRow) {
      return;
    }

    const handleChange = (e) => {
        const value = e.target.value.replace(/[^a-zA-Z0-9]/g, ''); // 영문+숫자만 남기기
        options.editorCallback(value);
    };

    return (
        <InputText
            style={{width: '100%', height: '100%', boxSizing: 'border-box'}}
            value={options.value}
            onChange={handleChange}
            autoFocus
        />
    );
  }, []);

  /**
   * 한글 입력 처리를 위한 특수 입력 컴포넌트
   * 한글 IME 조합 중 상태를 관리하여 올바른 필터링 적용
   */
  const KoreanNumberInput = React.memo(({ value, onChange, style }) => {
    const [localValue, setLocalValue] = useState(value || '');
    const isComposingRef = useRef(false);

    const handleCompositionStart = () => {
        isComposingRef.current = true;
    };

    const handleCompositionEnd = (e) => {
        isComposingRef.current = false;
        const filteredValue = e.target.value.replace(/[^가-힣0-9]/g, '');
        setLocalValue(filteredValue);
        onChange(filteredValue);
    };

    const handleChange = (e) => {
        const inputValue = e.target.value;

        if (isComposingRef.current) {
            // 한글 조합 중일 때는 필터링 없이 표시만 업데이트
            setLocalValue(inputValue);
        } else {
            // 조합이 완료되었을 때 필터링 적용
            const filteredValue = inputValue.replace(/[^가-힣0-9]/g, '');
            setLocalValue(filteredValue);
            onChange(filteredValue);
        }
    };

    // 외부 value 변경 시 내부 상태 동기화
    useEffect(() => {
        setLocalValue(value || '');
    }, [value]);

    return (
        <InputText
            value={localValue}
            onChange={handleChange}
            style={style}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            autoFocus
        />
    );
  });
  
  KoreanNumberInput.displayName = 'KoreanNumberInput';

  /**
   * 한글+숫자만 입력 가능한 텍스트 에디터
   */
  const textEditorKoreanOnly = useCallback((options) => {
    const { rowData } = options;
    if (rowData.isBlurRow) {
      return;
    }

    return (
        <KoreanNumberInput
            value={options.value}
            style={{width: '100%', height: '100%', boxSizing: 'border-box'}}
            onChange={(value) => options.editorCallback(value)}
        />
    );
  }, []);

  /**
   * 돋보기 버튼이 포함된 셀 렌더러
   * 텍스트 옆에 검색 버튼을 표시하여 추가 정보 조회 기능 제공
   */
  const searchButtonTemplate = useCallback((rowData, column) => {
    const columnMeta = columns.find(c => c.field === column.field);
    if (!columnMeta) return null;
    
    return (
      <div className="flex items-center gap-2" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          {rowData[column.field]}
          <PrimeButton
            icon="pi pi-search"
            className="p-button-text p-button-sm"
            onClick={() => {handleMagnifierClick(rowData, column.field)}}
            tooltip={columnMeta.searchBtnText}
            tooltipOptions={{ position: 'top' }}
          />
      </div>
    );
  }, [columns]);

  /**
   * 돋보기 버튼 클릭 핸들러
   * 부모 컴포넌트로 클릭 이벤트와 데이터 전달
   */
  const handleMagnifierClick = useCallback((rowData, field) => {
    if (onShowPopup) {
      onShowPopup(rowData, field);  // 부모 함수 호출
    }
  }, [onShowPopup]);

  /**
   * 숫자 입력 전용 에디터
   */
  const numberEditor = useCallback((options) => {
    const { rowData } = options;
    if (rowData.isBlurRow) {
      return;
    }

    return(
      <InputNumber
        value={options.value}
        style={{width: '100%', height: '100%', boxSizing: 'border-box'}}
        inputStyle={{ width: '100%', height: '100%', boxSizing: 'border-box' }}
        onValueChange={(e) => options.editorCallback(e.value)}
        autoFocus
        min={0}
      />
    )
  }, []);

  /**
   * 드롭다운 선택 에디터 구현을 위한 래퍼 컴포넌트
   * PrimeReact Dropdown을 DataTable 셀 에디터로 사용하기 위한 설정 추가
   */
  const SelectEditorComponent = React.memo(({ value, options, editorCallback, style }) => {
    const dropdownRef = useRef(null);
  
    // 드롭다운이 마운트된 직후 자동으로 열리도록 설정
    useEffect(() => {
      const timeout = setTimeout(() => {
        if (dropdownRef.current) {
          dropdownRef.current.show();
        }
      }, 0);
  
      return () => clearTimeout(timeout);
    }, []);
  
    return (
      <Dropdown
        ref={dropdownRef}
        value={value}
        style={style}
        options={options}
        onChange={(e) => editorCallback(e.value)}
        autoFocus
      />
    );
  });
  
  SelectEditorComponent.displayName = 'SelectEditorComponent';
  
  /**
   * 셀렉트 타입 에디터
   * 드롭다운 옵션에서 선택하는 형태의 에디터
   */
  const selectEditor = useCallback((options) => {
    const field = options.field;
    const fieldOptions = selectOptionsMap[field] || [];

    const { rowData } = options;
    if (rowData.isBlurRow) {
      return;
    }
    
    // 옵션이 없을 경우 콘솔에 경고 메시지 출력
    if (fieldOptions.length === 0) {
      console.warn(`No options available for field "${field}". Check selectOptionsMap prop.`);
    }
  
    return (
      <SelectEditorComponent
        value={options.value}
        options={fieldOptions.length > 0 ? fieldOptions : [{ label: '옵션 없음', value: null, disabled: true }]}
        editorCallback={options.editorCallback}
        style={{width: '100%', height: '100%', boxSizing: 'border-box'}}
      />
    );
  }, [selectOptionsMap]);
  
  /**
   * 날짜 선택 에디터
   * 캘린더 팝업으로 날짜를 선택할 수 있는 에디터
   */
  const dateEditor = useCallback((options) => {
    const { rowData } = options;
    if (rowData.isBlurRow) {
      return;
    }

    return(
      <Calendar
        value={options.value}
        style={{width: '100%', height: '100%', boxSizing: 'border-box'}}
        onChange={(e) => options.editorCallback(e.value)}
        dateFormat="yy-mm-dd"
        showIcon
        autoFocus
        locale="ko-number"
      />
    )
  }, []);

  // ===== 이벤트 핸들러 =====
  
  /**
   * ContextMenu 이벤트 핸들러
   * 우클릭 시 메뉴를 표시하고 현재 선택된 행 정보를 저장
   */
  const handleContextMenu = useCallback((e) => {
    e.originalEvent.preventDefault();
    setContextMenuSelection(e.value);
    contextMenuRef.current.hide();
  }, []);

  /**
   * 셀 수정 완료 시 처리 로직
   * 1. 데이터 형식 변환 (필요시)
   * 2. 내부 테이블 데이터 업데이트
   * 3. 부모 컴포넌트에 변경 사항 통지
   */
  const onCellEditHandler = useCallback((e) => {
    const { rowIndex, field, newValue } = e;
    const updatedData = [...tableData];

    // 날짜 포맷팅 (yyyy-mm-dd)
    let formattedValue = newValue;
    if (newValue instanceof Date) {
      const year = newValue.getFullYear();
      const month = String(newValue.getMonth() + 1).padStart(2, '0');
      const day = String(newValue.getDate()).padStart(2, '0');
      formattedValue = `${year}-${month}-${day}`;
    }

    // 내부 상태 업데이트
    updatedData[rowIndex] = { ...updatedData[rowIndex], [field]: formattedValue };
    setTableData(updatedData);

    // 부모 컴포넌트에 변경 통지
    if (handleCellEditComplete) {
      handleCellEditComplete({
        rowData: updatedData[rowIndex],
        field,
        newValue: formattedValue,
      });
    }
  }, [tableData, handleCellEditComplete]);

  /**
   * 행 선택 핸들러 - 체크박스 선택/해제 이벤트 처리
   */
  const handleSelectionChange = (e) => {
    console.log("행 선택 변경:", e.value); // 디버깅 로그
    setCurrentSelection(e.value);
    
    if (onSelectionChange) {
      onSelectionChange(e);
    }
  };

  // ===== 데이터 렌더링 헬퍼 함수 =====
  
  /**
   * DataTable 속성 정의
   * 테이블의 기본 동작 설정
   */
  const dataTableProps = useMemo(() => ({
    value: loadMoreData,
    dataKey: 'id',
    responsiveLayout: 'scroll',
    selection: currentSelection,
    onSelectionChange: handleSelectionChange,
    contextMenuSelection,
    onContextMenuSelectionChange: (e) => setContextMenuSelection(e.value),
    onRowDoubleClick: onDoubleClick ? (e) => onDoubleClick(e.data) : undefined,
    onContextMenu: contextMenuEnabled ? handleContextMenu : undefined,
    editMode: cellEditEnabled ? 'cell' : undefined,
  }), [
    loadMoreData, 
    currentSelection, 
    handleSelectionChange, 
    contextMenuSelection, 
    onDoubleClick, 
    contextMenuEnabled, 
    handleContextMenu, 
    cellEditEnabled
  ]);

  /**
   * select 타입 컬럼의 label 반환 함수
   * value 값을 사용자에게 표시할 label로 변환
   */
  const getSelectLabel = useCallback((field, value) => {
    const fieldOptions = selectOptionsMap[field] || [];
    if (fieldOptions.length === 0) {
      console.warn(`No options available for select field "${field}". Check selectOptionsMap prop.`);
      return value || '-';
    }
    const option = fieldOptions.find(opt => opt.value === value);
    return option ? option.label : (value || '-');
  }, [selectOptionsMap]);

  /**
   * 셀 표시용 bodyTemplate
   * 각 데이터 타입에 맞는 셀 렌더링 처리
   */
  const bodyTemplate = useCallback((rowData, column, colIndex) => {
    const { field } = column;
    const columnDef = columns.find(col => col.field === field);
    
    if (!columnDef) return null;
    
    // 돋보기 버튼이 있는 필드 처리
    if(columnDef.searchBtn) {
      return (
      <div className="flex items-center gap-2" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          {rowData[column.field]}
          <PrimeButton
          icon="pi pi-search"
          className="p-button-text p-button-sm"
          onClick={() => {handleMagnifierClick(rowData, column.field)}}
          tooltip={columnDef.searchBtnText}
          tooltipOptions={{ position: 'top' }}
          />
      </div>
      );
    }

    // Select 타입 필드는 value를 label로 변환하여 표시
    if (columnDef?.type === 'select') {
      return getSelectLabel(field, rowData[field]);
    }

    // 기본 데이터 표시
    return rowData[field];
  }, [columns, handleMagnifierClick, getSelectLabel]);

  /**
   * 마지막 행(더보기 행) 클릭 시 이벤트
   * 무한 스크롤 구현을 위한 데이터 로드 요청
   */
  const handleLoadMore = useCallback(() => {
    if (onLoadMore) {
      onLoadMore();  // 부모로 전달
    }
  }, [onLoadMore]);

  // ===== 렌더링 =====
  return (
    <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', ...style}}>
      {/* ContextMenu 렌더링 */}
      {contextMenuEnabled && (
        <ContextMenu
          model={customContextItems}
          ref={contextMenuRef}
          onHide={() => setContextMenuSelection(null)}
        />
      )}

      {/* 스크롤 컨테이너 - 테이블만 포함 */}
      <div style={{
        width: '100%', 
        maxWidth: '100%',
        height: tableHeight, 
        overflow: 'auto', 
        position: 'relative'
      }}>
        <DataTable 
          value={loadMoreData.filter(item => !item.isBlurRow)} // 더보기 행은 제외하고 렌더링
          dataKey="id"
          selection={selection}
          onSelectionChange={onSelectionChange}
          scrollable
          scrollHeight={tableHeight}
          frozenHeader
          resizableColumns
          style={{ width: '100%' }}
          tableStyle={{ width: '100%', minWidth: '2000px' }}
          rowHeight={36}
          contextMenuSelection={contextMenuSelection}
          onContextMenuSelectionChange={(e) => setContextMenuSelection(e.value)}
          onContextMenu={contextMenuEnabled ? handleContextMenu : undefined}
          onRowDoubleClick={onDoubleClick ? (e) => onDoubleClick(e.data) : undefined}
          editMode={cellEditEnabled ? 'cell' : undefined}
          >
          {/* 체크박스 컬럼 */}
          {selectionEnabled && (
            <Column 
              selectionMode="multiple" 
              headerStyle={{ width: '50px' }}
              bodyClassName="checkbox-cell"
              headerClassName="checkbox-header-cell"
              style={{height: '36px'}}
            />
          )}

          {/* 행 번호 컬럼 */}
          {showRowNumbers && (
            <Column
            header="No"
            body={(rowData, { rowIndex }) => {
              return rowIndex + 1;
            }}
            style={{ width: '4rem', textAlign: 'center', height: '36px' }}
          />
          )}

          {/* 데이터 컬럼들 */}
          {columns.map((col, colIndex) => (
            <Column
              key={col.field}
              field={col.field}
              header={col.header}
              style={{ width: col.width, height: '36px' }}
              sortable={col.sortable}
              body={(rowData) => bodyTemplate(rowData, col, colIndex)}              
              editor={
                cellEditEnabled && col.editable
                  ? col.type === 'num'
                    ? numberEditor
                    : col.type === 'select'
                    ? (options) => selectEditor({ ...options, field: col.field })
                    : col.type === 'date'
                    ? dateEditor
                    : col.type === 'korText'
                    ? textEditorKoreanOnly
                    : col.type === 'engText'
                    ? textEditorEnglishOnly
                    : textEditor
                  : undefined
              }
              editable={cellEditEnabled && col.editable}
              onCellEditComplete={cellEditEnabled && col.editable ? onCellEditHandler : undefined}
            />
          ))}

          {/* 더보기 버튼 컬럼 */}
          {showMoreButton && (
            <Column
              body={(rowData) => {
                return (
                  <PrimeButton
                    icon="pi pi-ellipsis-v"
                    className="p-button-text"
                    onClick={(e) => {
                      setContextMenuSelection(rowData);
                      contextMenuRef.current.show(e);
                    }}
                  />
                );
              }}
              header="더보기"
              style={{ width: '5rem', textAlign: 'center', height: '36px' }}
            />
          )}
        </DataTable>
      </div>

      {/* 테이블 아래에 완전히 독립된 더보기 버튼 */}
      {setLoadMore && (
        <div style={{
          width: '100%',
          display: 'flex', 
          justifyContent: 'center', 
          padding: '12px 0', 
          marginTop: '10px',
          backgroundColor: 'white'
        }}>
          <Button 
            buttonType={BUTTON_TYPES.SECONDARY}
            size="medium"
            onClick={handleLoadMore}
            icon={<ArrowDownIcon className="h-5 w-5" />}
          >
            데이터 더 불러오기
          </Button>
        </div>
      )}
    </div>
  );
}
