import React, { forwardRef, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/24/outline';

/**
 * 선택 필드 크기 상수 정의 - 다양한 크기의 셀렉트 박스를 지원합니다.
 * @type {Object}
 */
export const SELECT_SIZES = {
  SMALL: 'small',     // 작은 사이즈 (높이: 32px)
  MEDIUM: 'medium',   // 중간 사이즈 (높이: 40px)
  LARGE: 'large'      // 큰 사이즈 (높이: 48px)
};

/**
 * Select 컴포넌트 - 커스텀 드롭다운 메뉴를 가진 선택 필드 컴포넌트입니다.
 * 
 * @component
 * @example
 * // 기본 사용법
 * <Select
 *   options={[
 *     { value: 'option1', label: '옵션 1' },
 *     { value: 'option2', label: '옵션 2' },
 *     { value: 'option3', label: '옵션 3' }
 *   ]}
 *   value={selectedValue}
 *   onChange={(e) => setSelectedValue(e.target.value)}
 *   placeholder="옵션을 선택하세요"
 * />
 * 
 * @example
 * // 다양한 속성 사용 예시
 * <Select
 *   options={options}
 *   value={selectedValue}
 *   onChange={handleChange}
 *   placeholder="옵션을 선택하세요"
 *   size={SELECT_SIZES.MEDIUM}
 *   disabled={false}
 *   error={false}
 * />
 */
const Select = forwardRef(({
  // 기본 속성
  id,
  name,
  value,
  onChange,
  placeholder = '값을 선택해주세요.',
  // 선택 상자 속성
  options = [],
  // 상태 속성
  disabled = false,
  error = false,
  // 크기 속성
  size = SELECT_SIZES.MEDIUM,
  // 기타 속성
  className = '',
  ...props
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const selectRef = useRef(null);
  const dropdownRef = useRef(null);

  // 외부 클릭 감지하여 드롭다운 닫기
  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 선택된 옵션이 변경될 때마다 외부에 알림
  useEffect(() => {
    if (onChange && selectedOption !== undefined) {
      // 이전 값과 현재 값이 같으면 불필요한 이벤트 발생 방지
      if (selectedOption === value) {
        return;
      }
      
      // 비동기적으로 호출하여 리렌더링 사이클 방지
      const timeoutId = setTimeout(() => {
        const simulatedEvent = {
          target: { name, value: selectedOption }
        };
        onChange(simulatedEvent);
      }, 0);
      
      return () => clearTimeout(timeoutId);
    }
  }, [selectedOption]);

  // 초기 선택 값 설정 - 외부에서 value가 변경될 때만 실행
  useEffect(() => {
    // 현재 선택된 값과 다를 때만 업데이트하여 무한 루프 방지
    if (value !== undefined && value !== selectedOption) {
      setSelectedOption(value);
    }
  }, [value]);

  // 크기별 스타일
  const sizeClasses = {
    [SELECT_SIZES.SMALL]: 'text-xs px-3 py-1.5 h-8',
    [SELECT_SIZES.MEDIUM]: 'text-sm px-4 py-2.5 h-10',
    [SELECT_SIZES.LARGE]: 'text-base px-5 py-3 h-12'
  };

  // 옵션 선택 핸들러
  const handleSelect = (option) => {
    setSelectedOption(option.value);
    setIsOpen(false);
  };

  // 선택된 옵션의 레이블 찾기
  const getSelectedLabel = () => {
    const selected = options.find(option => option.value === selectedOption);
    return selected ? selected.label : placeholder;
  };

  return (
    <div 
      ref={selectRef} 
      className={`relative w-full ${className}`}
    >
      {/* 선택 필드 헤더 */}
      <div
        className={`
          ${sizeClasses[size]}
          ${disabled ? 'bg-gray-100' : 'bg-white'} 
          outline outline-1 outline-offset-[-1px] 
          ${error ? 'outline-red-500' : isOpen ? 'outline-blue-800' : disabled ? 'outline-gray-300' : 'outline-gray-400'}
          flex justify-between items-center 
          ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        `}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <div className={`${disabled ? 'text-gray-500' : selectedOption ? 'text-gray-700' : 'text-gray-500'} font-normal font-pretendard leading-tight`}>
          {getSelectedLabel()}
        </div>
        <ChevronDownIcon className={`h-4 w-4 ${disabled ? 'text-gray-400' : 'text-gray-500'} transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </div>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div 
          ref={dropdownRef}
          className="absolute z-10 mt-1 w-full self-stretch p-3 bg-white shadow-[2px_2px_2px_0px_rgba(222,222,222,0.25)] outline outline-1 outline-offset-[-1px] outline-gray-300 inline-flex flex-col justify-start items-start gap-2.5 overflow-hidden"
        >
          {options.map((option, index) => {
            // 선택 여부 확인
            const isSelected = selectedOption === option.value;
            // 호버 여부 확인
            const isHovered = hoveredIndex === index && !isSelected;
            
            return (
              <div
                key={option.value}
                data-size="medium"
                data-state={isSelected ? "Select" : isHovered ? "Hover" : "Default"}
                className={`
                  self-stretch px-2 py-1 w-full
                  ${isSelected ? 'bg-slate-100' : isHovered ? 'bg-slate-50' : ''}
                  inline-flex justify-between items-center
                  cursor-pointer transition-colors duration-150
                `}
                onClick={() => handleSelect(option)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className={`justify-start ${isSelected || isHovered ? 'text-gray-950' : 'text-gray-600'} text-base font-medium font-['Pretendard'] leading-normal`}>
                  {option.label}
                </div>
                {/* 선택 상태일 때는 진한 체크 아이콘, 호버 상태일 때는 옅은 체크 아이콘 표시 */}
                {(isSelected || isHovered) && (
                  <div className="w-5 h-5 relative overflow-hidden flex items-center justify-center">
                    {isSelected ? (
                      <CheckIcon className="h-4 w-4 text-slate-700" />
                    ) : (
                      <CheckIcon className="h-4 w-4 text-slate-400" />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* 숨겨진 기본 select - 폼 제출용 */}
      <select
        ref={ref}
        name={name}
        id={id}
        value={selectedOption}
        disabled={disabled}
        onChange={(e) => setSelectedOption(e.target.value)}
        className="sr-only"
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
});

Select.displayName = 'Select';

Select.propTypes = {
  // 기본 속성
  /** 선택 필드 ID (label 연결 및 접근성) */
  id: PropTypes.string,
  /** 선택 필드 이름 (form 제출 시 사용) */
  name: PropTypes.string,
  /** 선택된 값 */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** 값 변경 시 호출될 함수 */
  onChange: PropTypes.func,
  /** 선택 필드 플레이스홀더 텍스트 */
  placeholder: PropTypes.string,
  
  // 상태 속성
  /** 비활성화 여부 */
  disabled: PropTypes.bool,
  /** 오류 상태 여부 (빨간색 테두리 표시) */
  error: PropTypes.bool,
  
  // 크기 속성
  /** 선택 필드 크기 - SELECT_SIZES 상수 참조 */
  size: PropTypes.oneOf(Object.values(SELECT_SIZES)),
  
  // 선택 상자 속성
  /** 선택할 수 있는 옵션 배열 */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      /** 옵션 값 */
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      /** 옵션 레이블 (표시 텍스트) */
      label: PropTypes.string.isRequired
    })
  ),
  
  // 기타 속성
  /** 추가 CSS 클래스 */
  className: PropTypes.string
};

export default Select; 