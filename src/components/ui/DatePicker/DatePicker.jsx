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
 * @example
 * // 시간 선택 포함
 * <DatePicker
 *   selected={selectedDateTime}
 *   onChange={setSelectedDateTime}
 *   showTimeSelect={true}
 *   dateFormat="yyyy-MM-dd HH:mm"
 *   placeholder="날짜와 시간을 선택해주세요"
 * />
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
 */
const DatePicker = forwardRef(({
  // 기본 속성
  id,
  name,
  selected,
  onChange,
  placeholder = '날짜를 선택해주세요.',
  // 날짜 형식
  dateFormat = 'yyyy-MM-dd',
  showTimeSelect = false,
  timeFormat = 'HH:mm',
  // 상태 속성
  disabled = false,
  error = false,
  // 크기 속성
  size = DATEPICKER_SIZES.MEDIUM,
  // 기타 속성
  className = '',
  ...props
}, ref) => {
  // 날짜 선택 참조
  const datePickerWrapperRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  
  // 크기별 스타일
  const sizeClasses = {
    [DATEPICKER_SIZES.SMALL]: 'text-xs px-3 py-1.5 h-8',
    [DATEPICKER_SIZES.MEDIUM]: 'text-sm px-4 py-2.5 h-10',
    [DATEPICKER_SIZES.LARGE]: 'text-base px-5 py-3 h-12'
  };

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
      onChange(date);
    }
  };

  // 캘린더 토글
  const toggleCalendar = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  // 사용자 정의 입력 컴포넌트
  const CustomInput = forwardRef(({ value, onClick }, inputRef) => (
    <div
      className={`
        ${sizeClasses[size]}
        w-full
        ${disabled ? 'bg-gray-100' : 'bg-white'} 
        outline outline-1 outline-offset-[-1px] 
        ${error ? 'outline-red-500' : isOpen ? 'outline-blue-950' : disabled ? 'outline-gray-300' : 'outline-gray-400'}
        flex justify-between items-center 
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
      `}
      onClick={disabled ? undefined : toggleCalendar}
    >
      <div className={`${disabled ? 'text-gray-500' : value ? 'text-gray-700' : 'text-gray-500'} font-normal font-pretendard leading-tight`}>
        {value || placeholder}
      </div>
      <CalendarIcon className={`h-4 w-4 ${disabled ? 'text-gray-400' : 'text-gray-500'} transition-transform ml-2`} />
    </div>
  ));

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
        {date.toLocaleString('ko', { month: 'long', year: 'numeric' })}
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

  return (
    <div ref={datePickerWrapperRef} className={`relative w-full ${className}`}>
      <ReactDatePicker
        ref={ref}
        id={id}
        name={name}
        selected={selected}
        onChange={handleDateChange}
        dateFormat={showTimeSelect ? `${dateFormat} ${timeFormat}` : dateFormat}
        showTimeSelect={showTimeSelect}
        timeFormat={timeFormat}
        disabled={disabled}
        locale={ko}
        popperClassName="datepicker-popper"
        calendarClassName="datepicker-calendar"
        dayClassName={(date) => 
          date.getDay() === 0 
            ? "datepicker-sunday" 
            : date.getDay() === 6 
              ? "datepicker-saturday" 
              : undefined
        }
        customInput={<CustomInput />}
        renderCustomHeader={renderCustomHeader}
        open={isOpen}
        onClickOutside={() => setIsOpen(false)}
        onSelect={() => setIsOpen(false)}
        showPopperArrow={false}
        {...props}
      />
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
  /** 날짜 변경 시 호출될 함수: (date: Date) => void */
  onChange: PropTypes.func.isRequired,
  /** 날짜 선택기 플레이스홀더 텍스트 */
  placeholder: PropTypes.string,
  
  // 날짜 형식
  /** 날짜 표시 형식 (예: 'yyyy-MM-dd') */
  dateFormat: PropTypes.string,
  /** 시간 선택 활성화 여부 */
  showTimeSelect: PropTypes.bool,
  /** 시간 표시 형식 (예: 'HH:mm') */
  timeFormat: PropTypes.string,
  
  // 상태 속성
  /** 비활성화 여부 */
  disabled: PropTypes.bool,
  /** 오류 상태 여부 (빨간색 테두리 표시) */
  error: PropTypes.bool,
  
  // 크기 속성
  /** 날짜 선택기 크기 - DATEPICKER_SIZES 상수 참조 */
  size: PropTypes.oneOf(Object.values(DATEPICKER_SIZES)),
  
  // 기타 속성
  /** 추가 CSS 클래스 */
  className: PropTypes.string
};

export default DatePicker; 