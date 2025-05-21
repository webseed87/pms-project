import React from 'react';
import PropTypes from 'prop-types';

/**
 * 버튼 타입 상수 정의 - 다양한 스타일의 버튼 타입 옵션을 제공합니다.
 * @type {Object}
 */
export const BUTTON_TYPES = {
  // 주요 타입
  PRIMARY: 'primary',      // 주요 네이비 블루 버튼
  SECONDARY: 'secondary',  // 밝은 파란색 버튼
  DANGER: 'danger',        // 위험 작업용 빨간색/삭제 버튼
  LINE: 'line',            // 테두리만 있는 버튼 (outline)
  
  // 부가적인 타입
  ADD: 'add',              // 추가 버튼
  DELETE: 'delete',        // 삭제 버튼
  SAVE: 'save',            // 저장 버튼
  REFRESH: 'refresh',      // 리프레쉬 버튼
}

/**
 * 버튼 크기 상수 정의 - 다양한 크기의 버튼 옵션을 제공합니다.
 * @type {Object}
 */
export const BUTTON_SIZES = {
  SMALL: 'small',     // 작은 사이즈 (높이: 32px)
  MEDIUM: 'medium',   // 중간 사이즈 (높이: 40px)
  LARGE: 'large',     // 큰 사이즈 (높이: 48px)
  XLARGE: 'xlarge'    // 아주 큰 사이즈 (높이: 56px)
}

// 버튼 크기별 아이콘 크기 정의
export const ICON_SIZES = {
  [BUTTON_SIZES.SMALL]: 'h-3 w-3',
  [BUTTON_SIZES.MEDIUM]: 'h-4 w-4',
  [BUTTON_SIZES.LARGE]: 'h-5 w-5',
  [BUTTON_SIZES.XLARGE]: 'h-6 w-6',
}

/**
 * Button 컴포넌트 - 다양한 타입, 크기, 상태를 지원하는 버튼 컴포넌트입니다.
 * 
 * @component
 * @example
 * // 기본 사용법
 * <Button>버튼 텍스트</Button>
 * 
 * @example
 * // 다양한 속성을 사용한 예시
 * <Button 
 *   buttonType={BUTTON_TYPES.PRIMARY}
 *   size={BUTTON_SIZES.MEDIUM}
 *   icon={<IconComponent />}
 *   iconPosition="left"
 *   disabled={false}
 *   isLoading={false}
 *   onClick={handleClick}
 * >
 *   버튼 텍스트
 * </Button>
 */
const Button = ({
  children,
  type = 'button',
  // Type 속성 (버튼 종류)
  buttonType = BUTTON_TYPES.PRIMARY,
  // State 속성 (버튼 상태)
  disabled = false,
  isLoading = false,
  // Size 속성 (버튼 크기)
  size = BUTTON_SIZES.MEDIUM,
  // Icon 속성 (아이콘 관련)
  icon = null,
  iconPosition = 'left',
  // 기타 속성
  fullWidth = false,
  onClick,
  className = '',
  ...props
}) => {
  // 기본 버튼 스타일
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 ease-in-out focus:outline-none';
  
  // Type 스타일 (버튼 종류별 스타일)
  const typeClasses = {
    // PRIMARY - 네이비 블루 검색 버튼 (주요 작업용)
    [BUTTON_TYPES.PRIMARY]: 'bg-blue-950 text-white hover:bg-blue-500 focus:bg-blue-800 focus:ring-2 focus:ring-blue-300 focus:ring-offset-1',
    
    // SECONDARY - 밝은 파란색 버튼 (보조 작업용)
    [BUTTON_TYPES.SECONDARY]: 'bg-[#4285f4] text-white hover:bg-blue-300 focus:bg-blue-400 focus:ring-2 focus:ring-blue-200 focus:ring-offset-1',
    
    // DANGER - 빨간색 강조/삭제 버튼
    [BUTTON_TYPES.DANGER]: 'bg-white border border-[#e0e0e0] text-[#f44336] hover:bg-[#fff8f8] focus:bg-[#fff8f8] focus:border-[#f44336] focus:ring-1 focus:ring-[#f44336]',
    
    // LINE - 테두리만 있는 버튼 (outline)
    [BUTTON_TYPES.LINE]: 'bg-white border border-gray-300 text-gray-700 hover:bg-slate-200 focus:bg-slate-100 focus:border-gray-400 focus:ring-1 focus:ring-gray-400',
    
    // SAVE - 저장 버튼 
    [BUTTON_TYPES.SAVE]: 'bg-white text-blue-950 outline outline-1 outline-offset-[-1px] outline-blue-950 hover:bg-gray-50 hover:text-blue-800 hover:outline-blue-800 focus:bg-gray-50 focus:text-blue-800 focus:outline-blue-800 focus:ring-1 focus:ring-blue-200',
    
    // ADD - 추가 버튼 
    [BUTTON_TYPES.ADD]: 'bg-white text-blue-700 outline outline-1 outline-offset-[-1px] outline-blue-700 hover:bg-blue-50 hover:text-blue-900 hover:outline-blue-900 focus:bg-blue-50 focus:text-blue-900 focus:outline-blue-900 focus:ring-1 focus:ring-blue-200',
    
    // DELETE - 삭제 버튼 
    [BUTTON_TYPES.DELETE]: 'bg-white text-rose-600 outline outline-1 outline-offset-[-1px] outline-rose-600 hover:bg-rose-50 hover:text-rose-800 hover:outline-rose-800 focus:bg-rose-50 focus:text-rose-800 focus:outline-rose-800 focus:ring-1 focus:ring-rose-200',

    // REFRESH - 리프레쉬 버튼 
    [BUTTON_TYPES.REFRESH]: 'bg-slate-400 text-gray-50 rounded outline outline-1 outline-offset-[-1px] outline-gray-300 inline-flex justify-center items-center gap-2.5 focus:bg-slate-500 focus:outline-gray-400 focus:ring-1 focus:ring-gray-300',
  };
  
  // Size 스타일 (버튼 크기별 스타일)
  const sizeClasses = {
    [BUTTON_SIZES.SMALL]: 'text-xs px-3 py-1 rounded',
    [BUTTON_SIZES.MEDIUM]: 'text-sm px-3 p-2 rounded',
    [BUTTON_SIZES.LARGE]: 'text-base px-4 py-2 rounded',
    [BUTTON_SIZES.XLARGE]: 'text-lg px-8 py-4  w-full'
  };
  
  // State 스타일 (버튼 상태별 스타일)
  const stateClasses = {
    disabled: 'bg-gray-200 text-gray-400 hover:bg-gray-200 hover:text-gray-400 cursor-not-allowed border-none outline-none',
    loading: 'relative cursor-wait'
  };
  
  // 너비 스타일
  const widthClasses = fullWidth ? 'w-full' : '';
  
  // 최종 클래스 조합
  const buttonClasses = `
    ${baseClasses}
    ${disabled ? stateClasses.disabled : typeClasses[buttonType]}
    ${sizeClasses[size]}
    ${isLoading ? stateClasses.loading : ''}
    ${widthClasses}
    ${className}
  `.trim();
  
  // 로딩 스피너 컴포넌트
  const LoadingSpinner = () => (
    <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
  
  // 아이콘 클래스 생성 (크기에 따라 다른 클래스 적용)
  const getIconClass = () => {
    const iconClass = ICON_SIZES[size] || ICON_SIZES[BUTTON_SIZES.MEDIUM];
    return `${iconClass} ${children ? (iconPosition === 'left' ? 'mr-1' : 'ml-1') : ''}`;
  };
  
  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner />
        </span>
      )}
      
      <span className={isLoading ? 'invisible' : 'flex items-center'}>
        {icon && iconPosition === 'left' && (
          <span className={children ? 'mr-1' : ''}>{React.cloneElement(icon, { className: getIconClass() })}</span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <span className={children ? 'ml-1' : ''}>{React.cloneElement(icon, { className: getIconClass() })}</span>
        )}
      </span>
    </button>
  );
};

Button.propTypes = {
  /** 버튼 내용 (텍스트 또는 React 노드) */
  children: PropTypes.node,
  /** 버튼 HTML 타입 (form 제출 등에 사용) */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  /** 버튼 스타일 타입 - BUTTON_TYPES 상수 참조 */
  buttonType: PropTypes.oneOf(Object.values(BUTTON_TYPES)),
  /** 버튼 비활성화 여부 */
  disabled: PropTypes.bool,
  /** 로딩 상태 표시 여부 (로딩 스피너 표시) */
  isLoading: PropTypes.bool,
  /** 버튼 크기 - BUTTON_SIZES 상수 참조 */
  size: PropTypes.oneOf(Object.values(BUTTON_SIZES)),
  /** 버튼에 표시할 아이콘 요소 */
  icon: PropTypes.element,
  /** 아이콘 위치 (왼쪽 또는 오른쪽) */
  iconPosition: PropTypes.oneOf(['left', 'right']),
  /** 전체 너비 사용 여부 (width: 100%) */
  fullWidth: PropTypes.bool,
  /** 클릭 이벤트 핸들러 */
  onClick: PropTypes.func,
  /** 추가 CSS 클래스 */
  className: PropTypes.string
};

export default Button; 