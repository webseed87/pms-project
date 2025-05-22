import React, { useState, memo, useCallback, useEffect } from 'react';
import FormField, { FIELD_TYPES } from '../form/FormField';
import DatePicker, { DATEPICKER_MODES } from '../ui/DatePicker/DatePicker';
import Label from '../ui/Label';
import Select from '../ui/Select/Select';
import Input, { INPUT_TYPES } from '../ui/Input/Input';
import './SearchForm.css'; // CSS 파일 import

// 통합 필드 컴포넌트 - 모든 필드 타입을 처리
const UnifiedField = memo(({ 
  label, 
  type = 'input', 
  name, 
  value, 
  onChange,
  options = [],
  placeholder,
  startDate, 
  endDate, 
  onStartDateChange, 
  onEndDateChange,
  className = '',
  wrapperClassName = '',
  index = 0,
  totalFields = 1,
  isMobile = false
}) => {
  const renderField = () => {
    switch(type) {
      case 'date-range':
        return (
          <div className="flex-1 flex items-center h-14 p-2.5 inline-flex justify-start items-center gap-2.5">
            <DatePicker 
              className="w-5/12" 
              placeholderText="날짜 선택"
              selected={startDate}
              onChange={onStartDateChange}
              popperClassName="date-picker-popper"
              showTimeSelect={false}
              popperPlacement="bottom-start"
              usePortal={false}
              mode={DATEPICKER_MODES.RANGE}
            />
            
          </div>
        );
      case 'select':
        return (
          <div className={`flex-1 flex items-center h-14 p-2.5 inline-flex justify-start items-center ${wrapperClassName}`}>
            <Select
              className="w-full"
              options={options}
              value={value}
              name={name}
              onChange={onChange}
              placeholder={placeholder || `${label}을(를) 선택해주세요`}
            />
          </div>
        );
      case 'input':
      default:
        return (
          <div className={`flex-1 flex items-center h-14 p-2.5 inline-flex justify-start items-center ${wrapperClassName}`}>
            <Input
              type={INPUT_TYPES.TEXT}
              className="w-full"
              placeholder={placeholder}
              name={name}
              value={value}
              onChange={onChange}
            />
          </div>
        );
    }
  };

  // 인덱스 기반 스타일 적용 (모바일 여부에 따라 다른 로직 적용)
  const getFieldStyle = () => {
    // 행당 아이템 수: 모바일이면 2개, 데스크탑이면 3개
    const itemsPerRow = isMobile ? 2 : 3;
    
    // 행에서의 위치 계산
    const rowPosition = index % itemsPerRow;
    const isLastRow = Math.floor(index / itemsPerRow) === Math.floor((totalFields - 1) / itemsPerRow);
    const isLastInRow = rowPosition === (itemsPerRow - 1) || index === totalFields - 1;
    
    let borderStyle = 'border-gray-300 ';
    
    // 기본 테두리 (왼쪽, 오른쪽, 위, 아래)
    // 첫 번째 열(rowPosition === 0)에만 왼쪽 테두리 추가
    if (rowPosition === 0) {
      borderStyle += 'border-l ';
    }
    
    // 마지막 행이 아니면 아래 테두리 추가
    if (!isLastRow) {
      borderStyle += 'border-b ';
    } else {
      // 마지막 행이면 아래 테두리 항상 추가
      borderStyle += 'border-b ';
    }
    
    // 오른쪽 테두리 (행의 마지막 요소가 아닌 모든 요소)
    if (!isLastInRow) {
      borderStyle += 'border-r ';
    } else {
      // 행의 마지막 요소도 오른쪽 테두리 추가
      borderStyle += 'border-r ';
    }
    
    // 첫 번째 행이면 위 테두리 추가
    if (index < itemsPerRow) {
      borderStyle += 'border-t ';
    }
    
    return borderStyle;
  };

  // 필드 너비 설정: 모바일이면 1/2, 아니면 1/3
  const fieldWidth = isMobile ? 'w-1/2' : 'w-1/3';

  return (
    <div className={`${fieldWidth} flex ${className} ${getFieldStyle()}`}>
      <div className="w-[120px] flex-shrink-0 flex">
        <Label labelType="box" className="h-full w-full flex-grow">{label}</Label>
      </div>
      {renderField()}
    </div>
  );
});

UnifiedField.displayName = 'UnifiedField';

const SearchForm = () => {
  // 화면 너비 상태
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // 모바일 화면 여부 (1280px 이하)
  const isMobile = windowWidth <= 1280;

  // 화면 크기 변경 감지
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 폼 상태 관리
  const [formState, setFormState] = useState({
    startDate: null,
    endDate: null,
    projectName: '',
    projectStatus: '',
    systemName: '',
    taskName: '',
    menuName: '',
    receiptNo: ''
  });

  // 메모이제이션된 변경 핸들러들
  const handleStartDateChange = useCallback((date) => {
    setFormState(prev => ({
      ...prev,
      startDate: date
    }));
  }, []);

  const handleEndDateChange = useCallback((date) => {
    setFormState(prev => ({
      ...prev,
      endDate: date
    }));
  }, []);

  // 일반 입력 필드 핸들러
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  // 공통 핸들러 추가 - 무한 루프 방지 로직 포함
  const handleSelectChange = useCallback((e) => {
    const { name, value } = e.target;
    
    // 값이 실제로 변경되었을 때만 상태 업데이트 (타입 안전 비교를 위해 String으로 변환)
    setFormState(prev => {
      // 타입에 안전한 비교를 위해 문자열로 변환
      if (String(prev[name]) === String(value)) {
        // 값이 같으면 이전 상태 그대로 반환하여 리렌더링 방지
        return prev;
      }
      
      // 콘솔에 상태 변경 로깅 (디버깅용)
      console.log(`Updating ${name} from "${prev[name]}" to "${value}"`);
      
      // 값이 다르면 새 상태 반환
      return { ...prev, [name]: value };
    });
  }, []);

  // 검색 실행 함수
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('검색 조건:', formState);
    // API 호출 또는 상위 컴포넌트로 검색 조건 전달
  };

  // 프로젝트 상태 옵션
  const statusOptions = [
    {label: '진행중', value: 'in_progress'},
    {label: '완료', value: 'completed'},
    {label: '대기', value: 'pending'}
  ];

  // 시스템 옵션
  const systemOptions = [
    {label: '한얼아이티', value: 'haneul_it'},
    {label: '시스템B', value: 'system_b'},
    {label: '시스템C', value: 'system_c'}
  ];

  // 업무명 옵션
  const taskOptions = [
    {label: '개발', value: 'development'},
    {label: '테스트', value: 'testing'},
    {label: '기획', value: 'planning'}
  ];

  // 메뉴명 옵션  
  const menuOptions = [
    {label: '대시보드', value: 'dashboard'},
    {label: '프로젝트 관리', value: 'project_management'},
    {label: '사용자 관리', value: 'user_management'}
  ];

  // 폼 필드 설정
  const formFields = [
    { 
      type: "date-range", 
      label: "등록일자",
      props: {
        startDate: formState.startDate,
        endDate: formState.endDate,
        onStartDateChange: handleStartDateChange,
        onEndDateChange: handleEndDateChange
      }
    },
    { 
      type: "input", 
      label: "과제명", 
      props: {
        placeholder: "과제명을 입력해주세요.",
        name: "projectName",
        value: formState.projectName,
        onChange: handleInputChange
      }
    },
    { 
      type: "select", 
      label: "과제상태", 
      props: {
        name: "projectStatus",
        placeholder: "과제상태를 선택해주세요.",
        value: formState.projectStatus,
        onChange: handleSelectChange,
        options: statusOptions
      }
    },
    { 
      type: "select", 
      label: "시스템 명", 
      props: {
        name: "systemName",
        placeholder: "시스템 명을 선택해주세요.",
        value: formState.systemName,
        onChange: handleSelectChange,
        options: systemOptions
      }
    },
    { 
      type: "select", 
      label: "업무명", 
      props: {
        name: "taskName",
        placeholder: "업무명을 선택해주세요.",
        value: formState.taskName,
        onChange: handleSelectChange,
        options: taskOptions
      }
    },
    { 
      type: "select", 
      label: "메뉴 명", 
      props: {
        name: "menuName",
        placeholder: "메뉴 명을 선택해주세요.",
        value: formState.menuName,
        onChange: handleSelectChange,
        options: menuOptions
      }
    },
    { 
      type: "input", 
      label: "접수NO", 
      props: {
        placeholder: "접수NO를 입력해주세요.",
        name: "receiptNo",
        value: formState.receiptNo,
        onChange: handleInputChange
      }
    }
  ];

  // 반응형 클래스 설정
  const formClasses = isMobile 
    ? "flex flex-wrap" // 모바일 화면
    : "flex flex-wrap"; // 데스크톱 화면 (동일하게 유지)

 

  return (
    <div 
      className="p-4 bg-white border border-gray-300 inline-flex justify-between items-center w-full"
    >
      <form className={formClasses} onSubmit={handleSearch}>
        {formFields.map((field, index) => (
          <UnifiedField 
            key={index}
            type={field.type}
            label={field.label}
            index={index}
            totalFields={formFields.length}
            isMobile={isMobile}
            {...field.props}
          />
        ))}
      </form>
    </div>
  );
};

export default SearchForm; 