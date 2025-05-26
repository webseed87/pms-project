import React, { forwardRef, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker-custom.css';

/**
 * 날짜 선택 필드 크기 상수 정의 - 다양한 크기의 날짜 선택기를 지원합니다.
 * @type {Object}
 */
export const DATEPICKER_SIZES = {
  SMALL: 'small',     // 작은 사이즈 (높이: 32px)
  MEDIUM: 'medium',   // 중간 사이즈 (높이: 40px)
  LARGE: 'large'      // 큰 사이즈 (높이: 48px)
};

/**
 * 날짜 선택 모드 상수 정의 - 단일 날짜 또는 범위 선택을 지원합니다.
 * @type {Object}
 */
export const DATEPICKER_MODES = {
  SINGLE: 'single',   // 단일 날짜 선택
  RANGE: 'range'      // 날짜 범위 선택
};

/**
 * DatePicker 컴포넌트 - 캘린더를 통해 날짜와 시간을 선택할 수 있는 컴포넌트입니다.
 * react-datepicker 라이브러리를 기반으로 커스텀 스타일링을 적용했습니다.
 * 
 * @component
 * @example
 * // 기본 사용법
 * <DatePicker
 *   selected={selectedDate}
 *   onChange={setSelectedDate}
 *   placeholder="날짜를 선택해주세요"
 * />
 * 

 * 
 * @example
 * // 다양한 속성 사용 예시
 * <DatePicker
 *   selected={date}
 *   onChange={handleDateChange}
 *   dateFormat="yyyy년 MM월 dd일"
 *   size={DATEPICKER_SIZES.MEDIUM}
 *   disabled={false}
 *   error={false}
 * />
 * 
 * @example
 * // 날짜 범위 선택 사용 예시
 * <DatePicker
 *   mode={DATEPICKER_MODES.RANGE}
 *   startDate={startDate}
 *   endDate={endDate}
 *   onChange={({ startDate, endDate }) => {
 *     setStartDate(startDate);
 *     setEndDate(endDate);
 *   }}
 *   placeholder="날짜 범위를 선택해주세요"
 * />
 */
const DatePicker = forwardRef(({
  // 기본 속성
  id,
  name,
  selected,
  onChange,
  placeholder = '날짜',
  // 날짜 형식
  dateFormat = 'yyyy-MM-dd',
  // 상태 속성
  disabled = false,
  error = false,
  // 크기 속성
  size = DATEPICKER_SIZES.MEDIUM,
  // 범위 선택 속성
  mode = DATEPICKER_MODES.SINGLE,
  startDate = null,
  endDate = null,
  // 기타 속성
  className = '',
  ...props
}, ref) => {
  // 날짜 선택 참조
  const datePickerWrapperRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [startDateInput, setStartDateInput] = useState('');
  const [endDateInput, setEndDateInput] = useState('');
  const [singleDateInput, setSingleDateInput] = useState('');
  
  // 시간 제거 헬퍼 함수 - 날짜만 사용하도록 시간을 00:00:00으로 설정
  const removeTimeFromDate = (date) => {
    if (!date) return null;
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  };
  
  // 초기 시작일/종료일에서 시간 제거
  const initialStartDate = startDate ? removeTimeFromDate(startDate) : null;
  const initialEndDate = endDate ? removeTimeFromDate(endDate) : null;
  
  // 범위 선택 내부 상태 (mode가 RANGE일 때 사용)
  const [dateRange, setDateRange] = useState({
    startDate: initialStartDate,
    endDate: initialEndDate
  });
  
  // 반응형 처리를 위한 화면 너비 상태
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const isMobile = windowWidth < 768; // 768px 미만은 모바일로 간주
  
  // 화면 너비 변경 감지
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // 외부에서 startDate, endDate prop이 변경될 때 내부 상태 업데이트
  useEffect(() => {
    if (mode === DATEPICKER_MODES.RANGE) {
      setDateRange({
        startDate: startDate ? removeTimeFromDate(startDate) : null,
        endDate: endDate ? removeTimeFromDate(endDate) : null
      });
    }
  }, [startDate, endDate, mode]);
  
  // 외부 클릭 감지
  useEffect(() => {
    function handleClickOutside(event) {
      if (datePickerWrapperRef.current && !datePickerWrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 날짜 변경 핸들러
  const handleDateChange = (date) => {
    if (onChange) {
      onChange(removeTimeFromDate(date));
      // 날짜 선택 후 달력 닫기
      setIsOpen(false);
    }
  };

  // 시작일 변경 핸들러
  const handleStartDateChange = (date) => {
    // 시작일이 종료일보다 나중이면 종료일도 같이 업데이트
    let newEndDate = dateRange.endDate;
    if (date && dateRange.endDate && date > dateRange.endDate) {
      newEndDate = removeTimeFromDate(date);
    }
    
    const newDateRange = { 
      startDate: removeTimeFromDate(date), 
      endDate: newEndDate 
    };
    
    setDateRange(newDateRange);
    
    if (onChange) {
      onChange(newDateRange);
    }
  };

  // 종료일 변경 핸들러
  const handleEndDateChange = (date) => {
    // 종료일이 시작일보다 이전이면 시작일도 같이 업데이트
    let newStartDate = dateRange.startDate;
    if (date && dateRange.startDate && date < dateRange.startDate) {
      newStartDate = removeTimeFromDate(date);
    }
    
    const newDateRange = { 
      startDate: newStartDate, 
      endDate: removeTimeFromDate(date) 
    };
    
    setDateRange(newDateRange);
    
    if (onChange) {
      onChange(newDateRange);
      
      // 종료일 선택 시 팝업 닫기
      if (date && dateRange.startDate) {
        setIsOpen(false);
      }
    }
  };

  // 캘린더 토글
  const toggleCalendar = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  // 날짜 표시 텍스트 생성
  const getDisplayText = () => {
    if (mode === DATEPICKER_MODES.RANGE) {
      if (dateRange.startDate && dateRange.endDate) {
        const startDateStr = dateRange.startDate.toLocaleDateString('ko-KR', { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit' 
        }).replace(/\. /g, '-').replace(/\.$/, '');
        
        const endDateStr = dateRange.endDate.toLocaleDateString('ko-KR', { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit' 
        }).replace(/\. /g, '-').replace(/\.$/, '');
        
        return `${startDateStr} ~ ${endDateStr}`;
      } else if (dateRange.startDate) {
        const startDateStr = dateRange.startDate.toLocaleDateString('ko-KR', { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit' 
        }).replace(/\. /g, '-').replace(/\.$/, '');
        
        return `${startDateStr} ~ `;
      }
      return placeholder;
    } else {
      return selected ? 
        selected.toLocaleDateString('ko-KR', { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit'
        }).replace(/\. /g, '-').replace(/\.$/, '') : 
        placeholder;
    }
  };

  // useEffect로 선택된 날짜가 변경될 때 input 값 업데이트
  useEffect(() => {
    if (mode === DATEPICKER_MODES.RANGE) {
      setStartDateInput(formatDateToString(dateRange.startDate));
      setEndDateInput(formatDateToString(dateRange.endDate));
    } else {
      setSingleDateInput(formatDateToString(selected));
    }
  }, [dateRange.startDate, dateRange.endDate, selected, mode]);

  // 사용자 정의 입력 컴포넌트
  const CustomInput = forwardRef(({ value, onClick }, inputRef) => {
    return (
      <div
        className={`
          ${sizeClasses[size]}
          w-full
          ${disabled ? 'bg-gray-100' : 'bg-white'} 
          outline outline-1 outline-offset-[-1px] 
          ${error ? 'outline-red-500' : isOpen ? 'outline-blue-800' : disabled ? 'outline-gray-300' : 'outline-gray-400'}
          flex justify-between items-center 
          ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <input
          ref={inputRef}
          type="text"
          value={mode === DATEPICKER_MODES.RANGE ? getDisplayText() : singleDateInput}
          onChange={(e) => {
            const input = e.target.value;
            if (mode === DATEPICKER_MODES.SINGLE) {
              setSingleDateInput(input);
              
              // YYYY-MM-DD 형식 검증
              const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
              
              if (dateRegex.test(input)) {
                const [year, month, day] = input.split('-').map(Number);
                const date = new Date(year, month - 1, day);
                
                if (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day) {
                  handleDateChange(date);
                }
              }
            }
          }}
          onBlur={() => {
            if (mode === DATEPICKER_MODES.SINGLE) {
              if (!singleDateInput) {
                setSingleDateInput(formatDateToString(selected));
              }
            }
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className={`w-full bg-transparent border-none outline-none  ${disabled ? 'text-gray-500' : value !== placeholder ? 'text-gray-700' : 'text-gray-500'} font-normal font-pretendard leading-tight`}
          disabled={disabled}
        />
        <CalendarIcon 
          className={`h-4 w-4 ${disabled ? 'text-gray-400' : 'text-gray-500'} transition-transform ml-2 cursor-pointer`}
          onClick={disabled ? undefined : toggleCalendar}
        />
      </div>
    );
  });

  CustomInput.displayName = 'CustomInput';

  // 커스텀 헤더 네비게이션 버튼
  const renderCustomHeader = ({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }) => (
    <div className="flex items-center justify-between px-2">
      <button
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        className="p-1 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
        type="button"
      >
        <ChevronLeftIcon className="h-4 w-4 text-gray-600" />
      </button>
      <div className="text-base font-medium text-blue-950">
        {date.toLocaleString('ko', { year: 'numeric', month: 'long' })}
      </div>
      <button
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        className="p-1 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
        type="button"
      >
        <ChevronRightIcon className="h-4 w-4 text-gray-600" />
      </button>
    </div>
  );

  // 날짜 문자열 포맷팅 함수
  const formatDateToString = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('ko-KR', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    }).replace(/\. /g, '-').replace(/\.$/, '');
  };

  // 단일 날짜 선택 모드 렌더링
  const renderSingleMode = () => (
    <div ref={datePickerWrapperRef} className="relative w-full">
      <CustomInput value={singleDateInput} />
      
      {isOpen && (
        <div className="absolute w-[255px] h-[310px] border flex flex-col border-gray-300 right-0 mt-2 z-[90000999] p-4 bg-white rounded-lg">
          <ReactDatePicker
            inline
            selected={selected}
            onChange={handleDateChange}
            dateFormat={dateFormat}
            disabled={disabled}
            locale={ko}
            calendarClassName="datepicker-calendar"
            dayClassName={(date) => 
              date.getDay() === 0 
                ? "datepicker-sunday" 
                : date.getDay() === 6 
                  ? "datepicker-saturday" 
                  : undefined
            }
            renderCustomHeader={renderCustomHeader}
            {...props}
          />
          <div className="mt-2">
            <input
              type="text"
              value={singleDateInput}
              onChange={(e) => {
                const input = e.target.value;
                setSingleDateInput(input);
                
                // YYYY-MM-DD 형식 검증
                const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
                
                if (dateRegex.test(input)) {
                  const [year, month, day] = input.split('-').map(Number);
                  const date = new Date(year, month - 1, day);
                  
                  if (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day) {
                    handleDateChange(date);
                  }
                }
              }}
              onBlur={() => {
                if (!singleDateInput) {
                  setSingleDateInput(formatDateToString(selected));
                }
              }}
              placeholder="YYYY-MM-DD"
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-800"
            />
          </div>
        </div>
      )}
    </div>
  );

  // 범위 선택 모드 렌더링 - 두 개의 독립적인 달력으로 구현
  const renderRangeMode = () => (
    <div ref={datePickerWrapperRef} className="relative w-full">
      <CustomInput value="" />
      
      {isOpen && (
        <div className="absolute top-full border border-gray-200 left-0 mt-2 z-[9999] p-4 bg-white rounded-lg dual-calendar-container">
          <div className="flex flex-wrap md:flex-nowrap lg:flex-nowrap">
            {/* 왼쪽 달력 - 시작일 선택 */}
            <div className="dual-calendar-left">
              <div className="text-center text-sm font-medium p-2">
                시작일 선택
              </div>
              <div className="px-2 mb-2">
                <input
                  type="text"
                  value={startDateInput}
                  onChange={(e) => {
                    const input = e.target.value;
                    setStartDateInput(input);
                    
                    // YYYY-MM-DD 형식 검증
                    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
                    
                    if (dateRegex.test(input)) {
                      const [year, month, day] = input.split('-').map(Number);
                      const date = new Date(year, month - 1, day);
                      
                      if (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day) {
                        handleStartDateChange(date);
                      }
                    }
                  }}
                  onBlur={() => {
                    // 포커스를 잃었을 때 유효하지 않은 입력값이면 원래 값으로 복원
                    setStartDateInput(formatDateToString(dateRange.startDate));
                  }}
                  placeholder="YYYY-MM-DD"
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-800"
                />
              </div>
              <ReactDatePicker
                inline
                selected={dateRange.startDate}
                onChange={handleStartDateChange}
                startDate={dateRange.startDate}
                endDate={dateRange.endDate}
                selectsStart
                locale={ko}
                calendarClassName="datepicker-range-calendar-left"
                dayClassName={(date) => {
                  const isInRange = dateRange.startDate && dateRange.endDate && 
                    date >= dateRange.startDate && date <= dateRange.endDate;
                  
                  if (dateRange.startDate && date.getTime() === dateRange.startDate.getTime()) {
                    return "datepicker-day-start";
                  } else if (isInRange) {
                    return "datepicker-day-in-range";
                  } else if (date.getDay() === 0) {
                    return "datepicker-sunday";
                  } else if (date.getDay() === 6) {
                    return "datepicker-saturday";
                  }
                  return undefined;
                }}
                renderCustomHeader={renderCustomHeader}
              />
            </div>
            
            {/* 오른쪽 달력 - 종료일 선택 */}
            <div className="dual-calendar-right">
              <div className="text-center text-sm font-medium p-2">
                종료일 선택
              </div>
              <div className="px-2 mb-2">
                <input
                  type="text"
                  value={endDateInput}
                  onChange={(e) => {
                    const input = e.target.value;
                    setEndDateInput(input);
                    
                    // YYYY-MM-DD 형식 검증
                    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
                    
                    if (dateRegex.test(input)) {
                      const [year, month, day] = input.split('-').map(Number);
                      const date = new Date(year, month - 1, day);
                      
                      if (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day) {
                        handleEndDateChange(date);
                      }
                    }
                  }}
                  onBlur={() => {
                    // 포커스를 잃었을 때 유효하지 않은 입력값이면 원래 값으로 복원
                    setEndDateInput(formatDateToString(dateRange.endDate));
                  }}
                  placeholder="YYYY-MM-DD"
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-800"
                />
              </div>
              <ReactDatePicker
                inline
                selected={dateRange.endDate}
                onChange={handleEndDateChange}
                startDate={dateRange.startDate}
                endDate={dateRange.endDate}
                selectsEnd
                locale={ko}
                calendarClassName="datepicker-range-calendar-right"
                dayClassName={(date) => {
                  const isInRange = dateRange.startDate && dateRange.endDate && 
                    date >= dateRange.startDate && date <= dateRange.endDate;
                  
                  if (dateRange.endDate && date.getTime() === dateRange.endDate.getTime()) {
                    return "datepicker-day-end";
                  } else if (isInRange) {
                    return "datepicker-day-in-range";
                  } else if (date.getDay() === 0) {
                    return "datepicker-sunday";
                  } else if (date.getDay() === 6) {
                    return "datepicker-saturday";
                  }
                  return undefined;
                }}
                renderCustomHeader={renderCustomHeader}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // 크기별 스타일
  const sizeClasses = {
    [DATEPICKER_SIZES.SMALL]: 'text-xs px-3 py-1.5 h-8',
    [DATEPICKER_SIZES.MEDIUM]: 'text-sm px-4 py-2.5 h-10',
    [DATEPICKER_SIZES.LARGE]: 'text-base px-5 py-3 h-12'
  };

  return (
    <div className={`relative w-full ${className}`}>
      {mode === DATEPICKER_MODES.RANGE ? renderRangeMode() : renderSingleMode()}
    </div>
  );
});

DatePicker.displayName = 'DatePicker';

DatePicker.propTypes = {
  // 기본 속성
  /** 날짜 선택기 ID (label 연결 및 접근성) */
  id: PropTypes.string,
  /** 날짜 선택기 이름 (form 제출 시 사용) */
  name: PropTypes.string,
  /** 선택된 날짜 (Date 객체) */
  selected: PropTypes.instanceOf(Date),
  /** 날짜 변경 시 호출될 함수: (date: Date) => void 또는 ({ startDate, endDate }) => void */
  onChange: PropTypes.func.isRequired,
  /** 날짜 선택기 플레이스홀더 텍스트 */
  placeholder: PropTypes.string,
  
  // 날짜 형식
  /** 날짜 표시 형식 (예: 'yyyy-MM-dd') */
  dateFormat: PropTypes.string,
  
  // 상태 속성
  /** 비활성화 여부 */
  disabled: PropTypes.bool,
  /** 오류 상태 여부 (빨간색 테두리 표시) */
  error: PropTypes.bool,
  
  // 크기 속성
  /** 날짜 선택기 크기 - DATEPICKER_SIZES 상수 참조 */
  size: PropTypes.oneOf(Object.values(DATEPICKER_SIZES)),
  
  // 범위 선택 속성
  /** 날짜 선택 모드 - 단일 또는 범위 선택 */
  mode: PropTypes.oneOf(Object.values(DATEPICKER_MODES)),
  /** 시작 날짜 (범위 선택 모드에서 사용) */
  startDate: PropTypes.instanceOf(Date),
  /** 종료 날짜 (범위 선택 모드에서 사용) */
  endDate: PropTypes.instanceOf(Date),
  
  // 기타 속성
  /** 추가 CSS 클래스 */
  className: PropTypes.string
};

export default DatePicker; 