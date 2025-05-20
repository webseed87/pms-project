import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { EyeIcon, EyeSlashIcon, CalendarIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

/**
 * 입력 필드 타입 상수 정의 - 다양한 종류의 입력 필드를 지원합니다.
 * @type {Object}
 */
export const INPUT_TYPES = {
  TEXT: 'text',           // 일반 텍스트 입력
  PASSWORD: 'password',   // 비밀번호 입력 (마스킹 처리)
  DATE: 'date',           // 날짜 선택 입력
  SELECT: 'select',       // 선택 상자 입력
  TEXTAREA: 'textarea'    // 여러 줄 텍스트 입력
};

/**
 * 입력 필드 크기 상수 정의 - 다양한 크기의 입력 필드를 지원합니다.
 * @type {Object}
 */
export const INPUT_SIZES = {
  SMALL: 'small',     // 작은 사이즈 (높이: 32px)
  MEDIUM: 'medium',   // 중간 사이즈 (높이: 40px)
  LARGE: 'large'      // 큰 사이즈 (높이: 48px)
};

/**
 * 입력 필드 상태 상수 정의 - 입력 필드의 다양한 상태를 표현합니다.
 * @type {Object}
 */
export const INPUT_STATES = {
  DEFAULT: 'default',  // 기본 상태
  FOCUS: 'focus',      // 포커스 상태
  ERROR: 'error',      // 오류 상태
  DISABLED: 'disabled' // 비활성화 상태
};

/**
 * Input 컴포넌트 - 다양한 타입, 크기, 상태를 지원하는 입력 필드 컴포넌트입니다.
 * 
 * @component
 * @example
 * // 기본 텍스트 입력 필드
 * <Input 
 *   id="email"
 *   name="email"
 *   value={email}
 *   onChange={handleChange}
 *   placeholder="이메일을 입력하세요"
 * />
 * 
 * @example
 * // 비밀번호 입력 필드
 * <Input 
 *   type={INPUT_TYPES.PASSWORD}
 *   id="password"
 *   name="password"
 *   value={password}
 *   onChange={handleChange}
 *   placeholder="비밀번호를 입력하세요"
 * />
 * 
 * @example
 * // 여러 줄 텍스트 입력 필드 (textarea)
 * <Input 
 *   type={INPUT_TYPES.TEXTAREA}
 *   id="description"
 *   name="description"
 *   value={description}
 *   onChange={handleChange}
 *   placeholder="설명을 입력하세요"
 *   rows={5}
 * />
 */
const Input = forwardRef(({
  // 기본 속성
  type = INPUT_TYPES.TEXT,
  id,
  name,
  value,
  onChange,
  placeholder = '',
  // 상태 속성
  disabled = false,
  readOnly = false,
  error = false,
  // 크기 속성
  size = INPUT_SIZES.MEDIUM,
  // 텍스트 영역 속성
  rows = 3,
  // 선택 상자 속성
  options = [],
  // 아이콘 속성
  icon = null,
  iconPosition = 'right',
  // 기타 속성
  className = '',
  ...props
}, ref) => {
  // 비밀번호 표시 상태
  const [showPassword, setShowPassword] = useState(false);
  
  // 기본 입력 필드 스타일
  const baseClasses = 'w-full transition-colors duration-200 ease-in-out font-normal font-pretendard text-sm leading-tight';
  
  // 크기별 스타일
  const sizeClasses = {
    [INPUT_SIZES.SMALL]: 'px-3 py-1.5 h-8',
    [INPUT_SIZES.MEDIUM]: 'px-4 py-2.5 h-10',
    [INPUT_SIZES.LARGE]: 'px-5 py-3 h-12'
  };
  
  // 상태별 스타일
  const stateClasses = {
    default: 'bg-white outline outline-1  outline-gray-400 focus-within:outline-blue-800',
    error: 'bg-white outline outline-1 outline-red-500 focus-within:outline-red-600',
    disabled: 'bg-gray-100 outline outline-1  outline-gray-300 text-gray-500 cursor-not-allowed'
  };
  
  // 타입별 아이콘
  const typeIcons = {
    [INPUT_TYPES.DATE]: <CalendarIcon className="h-4 w-4 text-gray-500" />,
    [INPUT_TYPES.SELECT]: <ChevronDownIcon className="h-4 w-4 text-gray-500" />
  };
  
  // 최종 클래스 조합
  const inputClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${disabled ? stateClasses.disabled : error ? stateClasses.error : stateClasses.default}
    ${className}
  `.trim();
  
  // 입력 필드 아이콘 (있는 경우)
  const renderIcon = () => {
    if (type === INPUT_TYPES.PASSWORD) {
      return (
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => setShowPassword(!showPassword)}
          tabIndex="-1"
        >
          {showPassword ? (
            <EyeSlashIcon className="h-4 w-4 text-gray-500" />
          ) : (
            <EyeIcon className="h-4 w-4 text-gray-500" />
          )}
        </button>
      );
    }
    
    if (typeIcons[type]) {
      return (
        <div className={`absolute inset-y-0 ${iconPosition === 'right' ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none`}>
          {typeIcons[type]}
        </div>
      );
    }
    
    if (icon) {
      return (
        <div className={`absolute inset-y-0 ${iconPosition === 'right' ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none`}>
          {icon}
        </div>
      );
    }
    
    return null;
  };
  
  // textarea 렌더링
  if (type === INPUT_TYPES.TEXTAREA) {
    // textarea에는 고정 높이 클래스를 제거하고 패딩만 적용
    const textareaClasses = baseClasses + ' ' + 
      (disabled ? stateClasses.disabled : error ? stateClasses.error : stateClasses.default) + 
      ' resize-none placeholder:text-gray-500 px-4 py-2.5';

    return (
      <textarea
        ref={ref}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        rows={rows}
        className={`${textareaClasses} ${className}`}
        {...props}
      />
    );
  }
  
  // select 렌더링
  if (type === INPUT_TYPES.SELECT) {
    return (
      <div className="relative w-full">
        <select
          ref={ref}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`${inputClasses} appearance-none pr-10 text-gray-500`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
          <ChevronDownIcon className="h-4 w-4 text-gray-500" />
        </div>
      </div>
    );
  }
  
  // 기본 입력 필드 (텍스트, 비밀번호, 날짜 등)
  // 컨테이너 스타일을 변경하고 input 요소에는 테두리 스타일을 제거합니다
  const containerClasses = `w-full relative ${disabled ? stateClasses.disabled : error ? stateClasses.error : stateClasses.default} ${sizeClasses[size]}`;
  
  // 입력 필드에는 최소한의 스타일만 적용합니다
  const fieldClasses = `w-full h-full bg-transparent border-none outline-none px-0 py-0 font-normal font-pretendard text-sm leading-tight placeholder:text-gray-500
    ${(type === INPUT_TYPES.PASSWORD || typeIcons[type] || (icon && iconPosition === 'right')) ? 'pr-10' : ''}
    ${(icon && iconPosition === 'left') ? 'pl-10' : ''}
    ${className}`;
  
  return (
    <div className={containerClasses}>
      <input
        ref={ref}
        type={type === INPUT_TYPES.PASSWORD ? (showPassword ? 'text' : 'password') : type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        className={fieldClasses}
        {...props}
      />
      {renderIcon()}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  // 기본 속성
  /** 입력 필드 타입 - INPUT_TYPES 상수 참조 */
  type: PropTypes.oneOf(Object.values(INPUT_TYPES)),
  /** 입력 필드 ID (label 연결 및 접근성) */
  id: PropTypes.string,
  /** 입력 필드 이름 (form 제출 시 사용) */
  name: PropTypes.string,
  /** 입력 필드 값 */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** 값 변경 시 호출될 함수 */
  onChange: PropTypes.func,
  /** 입력 필드 플레이스홀더 텍스트 */
  placeholder: PropTypes.string,
  
  // 상태 속성
  /** 비활성화 여부 */
  disabled: PropTypes.bool,
  /** 읽기 전용 여부 */
  readOnly: PropTypes.bool,
  /** 오류 상태 여부 (빨간색 테두리 표시) */
  error: PropTypes.bool,
  
  // 크기 속성
  /** 입력 필드 크기 - INPUT_SIZES 상수 참조 */
  size: PropTypes.oneOf(Object.values(INPUT_SIZES)),
  
  // 텍스트 영역 속성
  /** 텍스트 영역 행 수 (textarea 타입일 때만 적용) */
  rows: PropTypes.number,
  
  // 선택 상자 속성
  /** 선택 상자 옵션 배열 (select 타입일 때만 적용) */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      /** 옵션 값 */
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      /** 옵션 레이블 (표시 텍스트) */
      label: PropTypes.string.isRequired
    })
  ),
  
  // 아이콘 속성
  /** 입력 필드 옆에 표시할 아이콘 요소 */
  icon: PropTypes.element,
  /** 아이콘 위치 (왼쪽 또는 오른쪽) */
  iconPosition: PropTypes.oneOf(['left', 'right']),
  
  // 기타 속성
  /** 추가 CSS 클래스 */
  className: PropTypes.string
};

export default Input; 