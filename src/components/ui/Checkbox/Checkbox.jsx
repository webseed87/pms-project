import React from 'react';
import PropTypes from 'prop-types';

/**
 * 체크박스 컴포넌트 - 체크/언체크 상태를 표시하는 컴포넌트입니다.
 * 
 * @component
 * @example
 * // 기본 사용법
 * <Checkbox checked={true} onChange={handleChange} />
 * 
 * @example
 * // 다양한 속성을 사용한 예시
 * <Checkbox 
 *   checked={isChecked}
 *   onChange={handleChange}
 *   disabled={false}
 *   label="동의합니다"
 * />
 */
const Checkbox = ({
  checked = false,
  onChange,
  disabled = false,
  label = '',
  name = '',
  className = '',
  ...props
}) => {
  // 체크박스 클릭 핸들러
  const handleChange = (e) => {
    if (!disabled && onChange) {
      onChange(e);
    }
  };

  // 공통 체크박스 컨테이너 스타일
  const checkboxContainerStyle = "w-4 h-4 relative rounded-sm flex items-center justify-center";

  return (
    <label className={`inline-flex items-center leading-none ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'} ${className}`}>
      <div className="relative flex-shrink-0" style={{ display: 'flex', height: '16px' }} onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          name={name}
          {...props}
        />
        
        {checked ? (
          // 체크된 상태 스타일
          <div className={`${checkboxContainerStyle} bg-blue-800 outline outline-1 outline-offset-[-1px] outline-blue-800`}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-2.5 h-2.5 text-white"
              aria-hidden="true"
            >
              <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
            </svg>
          </div>
        ) : (
          // 체크되지 않은 상태 스타일
          <div className={`${checkboxContainerStyle} bg-white border border-gray-400`} />
        )}
      </div>
      
      {label && (
        <span className={`ml-2 text-sm flex-shrink-0 ${disabled ? 'text-gray-500' : 'text-gray-700'}`} style={{ lineHeight: '16px' }}>
          {label}
        </span>
      )}
    </label>
  );
};

Checkbox.propTypes = {
  /** 체크박스 체크 상태 */
  checked: PropTypes.bool,
  /** 체크 상태 변경 핸들러 함수 */
  onChange: PropTypes.func,
  /** 체크박스 비활성화 여부 */
  disabled: PropTypes.bool,
  /** 체크박스 라벨 */
  label: PropTypes.node,
  /** form에서 사용할 name 속성 */
  name: PropTypes.string,
  /** 추가 CSS 클래스 */
  className: PropTypes.string
};

export default Checkbox; 