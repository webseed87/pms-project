import React, { useState, memo, useCallback } from 'react';
import FormField, { FIELD_TYPES } from '../form/FormField';
import DatePicker from '../ui/DatePicker/DatePicker';
import Label from '../ui/Label';
import Select from '../ui/Select/Select';
import './SearchForm.css'; // CSS 파일 import

// 날짜 범위 선택 컴포넌트 - memo로 감싸서 불필요한 리렌더링 방지
const DateRangeField = memo(({ startDate, endDate, onStartDateChange, onEndDateChange }) => {
  return (
    <div className="w-1/3 flex">
      <div className="w-[120px] flex-shrink-0 flex">
        <Label labelType="box" className="h-full w-full ">등록일자</Label>
      </div>
      <div className="flex-1 flex items-center h-14 p-2.5 border-b border-t border-gray-300 inline-flex justify-start items-center gap-2.5">
        <DatePicker 
          className="w-5/12" 
          placeholderText="날짜 선택"
          selected={startDate}
          onChange={onStartDateChange}
          popperClassName="date-picker-popper"
          showTimeSelect={false}
          popperPlacement="bottom-start"
          usePortal={false}
        />
        <span className="mx-1 flex-shrink-0">~</span>
        <DatePicker 
          className="w-5/12" 
          placeholderText="날짜 선택" 
          selected={endDate}
          onChange={onEndDateChange}
          popperClassName="date-picker-popper"
          showTimeSelect={false}
          popperPlacement="bottom-start"
          usePortal={false}
        />
      </div>
    </div>
  );
});

DateRangeField.displayName = 'DateRangeField';

// 셀렉트 필드 컴포넌트 - 간단하게 직접 Select 사용
const SelectField = memo(({ label, name, value, options, onChange, placeholder, wrapperClassName }) => {
  return (
    <div className="w-1/3 flex">
      <div className="w-[120px] flex-shrink-0 flex">
        <Label labelType="box" className="h-full w-full flex-grow">{label}</Label>
      </div>
      <div className={`flex-1 flex items-center h-14 p-2.5 inline-flex justify-start items-center ${wrapperClassName || 'border-b border-gray-300'}`}>
        <Select
          className="w-full"
          options={options}
          value={value}
          name={name}
          onChange={onChange}
          placeholder={placeholder || `${label}을(를) 선택해주세요`}
        />
      </div>
    </div>
  );
});

SelectField.displayName = 'SelectField';

const SearchForm = () => {
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

  return (
    <div className="p-4 bg-white border border-gray-300 inline-flex justify-between items-center min-w-[900px]">
      <form className="flex flex-wrap" onSubmit={handleSearch}>
        <DateRangeField 
          startDate={formState.startDate}
          endDate={formState.endDate}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
        />
        
        <FormField 
          type="input"
          label="과제명"
          placeholder="과제명을 입력해주세요."
          name="projectName"
          value={formState.projectName}
          onChange={handleInputChange}
          wrapperClassName="border-b border-t border-gray-300"
        />
        
        <SelectField
          label="과제상태"
          name="projectStatus"
          placeholder="과제상태를 선택해주세요."
          value={formState.projectStatus}
          onChange={handleSelectChange}
          options={statusOptions}
          wrapperClassName="border-t border-b border-r border-gray-300"
        />
        
        <SelectField
          label="시스템 명"
          name="systemName"
          placeholder="시스템 명을 선택해주세요."
          value={formState.systemName}
          onChange={handleSelectChange}
          options={systemOptions}

        />
        
        <SelectField
          label="업무명"
          name="taskName"
          placeholder="업무명을 선택해주세요."
          value={formState.taskName}
          onChange={handleSelectChange}
          options={taskOptions}
          wrapperClassName="border-b  border-gray-300"

        />
        
        <SelectField
          label="메뉴 명"
          name="menuName"
          placeholder="메뉴 명을 선택해주세요."
          value={formState.menuName}
          onChange={handleSelectChange}
          options={menuOptions}
          wrapperClassName="border-b border-r border-gray-300"

        />

        <FormField 
          type="input"
          label="접수NO"
          placeholder="접수NO를 입력해주세요."
          name="receiptNo"
          value={formState.receiptNo}
          onChange={handleInputChange}
          wrapperClassName="border-b border-r border-gray-300"
        />
      </form>
    </div>
  );
};

export default SearchForm; 