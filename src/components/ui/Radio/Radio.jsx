import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/**
 * 라디오 버튼 크기 상수 정의
 * @type {Object}
 */
export const RADIO_SIZES = {
  SMALL: 'small',     // 작은 사이즈 (16px)
  MEDIUM: 'medium',   // 중간 사이즈 (20px)
  LARGE: 'large'      // 큰 사이즈 (24px)
};

/**
 * Radio 컴포넌트 - 사용자가 여러 옵션 중 하나를 선택할 수 있는 라디오 버튼 컴포넌트입니다.
 * 
 * @component
 * @example
 * // 기본 사용법
 * <Radio
 *   name="options"
 *   value="option1"
 *   checked={selectedOption === 'option1'}
 *   onChange={handleChange}
 *   label="옵션 1"
 * />
 * 
 * @example
 * // 다양한 속성 사용 예시
 * <Radio
 *   name="size-example"
 *   value="large"
 *   checked={size === 'large'}
 *   onChange={handleSizeChange}
 *   label="큰 사이즈"
 *   size={RADIO_SIZES.LARGE}
 *   disabled={false}
 *   error={false}
 * />
 */
const Radio = forwardRef(({
  // 기본 속성
  id,
  name,
  value,
  checked = false,
  onChange,
  label,
  // 상태 속성
  disabled = false,
  error = false,
  // 크기 속성
  size = RADIO_SIZES.MEDIUM,
  // 기타 속성
  className = '',
  ...props
}, ref) => {
  // 크기별 스타일 클래스
  const sizeClasses = {
    [RADIO_SIZES.SMALL]: 'w-4 h-4',
    [RADIO_SIZES.MEDIUM]: 'w-5 h-5',
    [RADIO_SIZES.LARGE]: 'w-6 h-6'
  };

  // 라벨 크기별 스타일 클래스
  const labelSizeClasses = {
    [RADIO_SIZES.SMALL]: 'text-sm',
    [RADIO_SIZES.MEDIUM]: 'text-base',
    [RADIO_SIZES.LARGE]: 'text-lg'
  };

  return (
    <label 
      className={`
        inline-flex items-center gap-2
        ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
        ${className}
      `}
    >
      <div className="relative flex items-center justify-center">
        <input
          ref={ref}
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={`
            appearance-none
            ${sizeClasses[size]}
            border-2
            rounded-full
            transition-all
            duration-200
            ${error 
              ? 'border-red-500 focus:border-red-500' 
              : disabled
                ? checked
                  ? 'border-blue-600 bg-blue-600'
                  : 'border-gray-300'
                : checked
                  ? 'border-blue-600 bg-blue-600'
                  : 'border-gray-400 hover:border-blue-600'
            }
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            ${error 
              ? 'focus:ring-red-200'
              : 'focus:ring-blue-200'
            }
          `}
          {...props}
        />
        {/* 체크 표시 */}
        <div 
          className={`
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-white
            transition-all
            duration-200
            ${checked ? 'opacity-100' : 'opacity-0'}
            ${size === RADIO_SIZES.SMALL ? 'w-1.5 h-1.5' : size === RADIO_SIZES.MEDIUM ? 'w-2 h-2' : 'w-2.5 h-2.5'}
          `}
        />
      </div>
      {label && (
        <span 
          className={`
            ${labelSizeClasses[size]}
            ${disabled ? 'text-gray-500' : 'text-gray-700'}
            font-medium
            select-none
            leading-none
          `}
        >
          {label}
        </span>
      )}
    </label>
  );
});

Radio.displayName = 'Radio';

Radio.propTypes = {
  // 기본 속성
  /** 라디오 버튼 ID */
  id: PropTypes.string,
  /** 라디오 버튼 그룹 이름 */
  name: PropTypes.string.isRequired,
  /** 라디오 버튼 값 */
  value: PropTypes.string.isRequired,
  /** 선택 여부 */
  checked: PropTypes.bool,
  /** 변경 이벤트 핸들러 */
  onChange: PropTypes.func.isRequired,
  /** 라벨 텍스트 */
  label: PropTypes.string,
  
  // 상태 속성
  /** 비활성화 여부 */
  disabled: PropTypes.bool,
  /** 오류 상태 여부 */
  error: PropTypes.bool,
  
  // 크기 속성
  /** 라디오 버튼 크기 - RADIO_SIZES 상수 참조 */
  size: PropTypes.oneOf(Object.values(RADIO_SIZES)),
  
  // 기타 속성
  /** 추가 CSS 클래스 */
  className: PropTypes.string
};

export default Radio; 