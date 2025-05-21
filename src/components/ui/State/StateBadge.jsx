import React from 'react';
import PropTypes from 'prop-types';

/**
 * 상태 뱃지 타입 상수 정의 - 다양한 상태를 나타내는 뱃지 타입 옵션
 * @type {Object}
 */
export const BADGE_TYPES = {
  // 기본 상태 타입
  SUCCESS: 'success',   // 성공/완료 상태
  WARNING: 'warning',   // 경고/주의 상태
  ERROR: 'error',       // 오류/실패 상태
  INFO: 'info',         // 정보 상태
  PENDING: 'pending',   // 대기/진행중 상태
  INACTIVE: 'inactive', // 비활성 상태
  CUSTOM: 'custom',     // 커스텀 상태
  
  // 업무 상태 타입
  RECEIPT: 'receipt',             // 접수
  ASSIGN: 'assign',               // 지정
  CONFIRM: 'confirm',             // 확인
  IN_DEVELOPMENT: 'inDevelopment', // 개발중
  DEV_COMPLETE: 'devComplete',     // 개발완료
  TEST: 'test',                   // 테스트
  TEST_REQUEST: 'testRequest',     // 테스트요청
  TEST_REJECT: 'testReject',       // 테스트부적합
  SUPPLEMENTING: 'supplementing',   // 보완중
  DEV_END: 'devEnd',               // 개발종료
  HOLD: 'hold',                   // 보류
  WITHDRAW: 'withdraw',           // 철회
  TRANSFER: 'transfer',           // 이관
}

/**
 * 뱃지 크기 상수 정의
 * @type {Object}
 */
export const BADGE_SIZES = {
  SMALL: 'small',   // 작은 사이즈 (높이: 20px)
  MEDIUM: 'medium', // 중간 사이즈 (높이: 24px)
  LARGE: 'large',   // 큰 사이즈 (높이: 28px)
}

/**
 * StateBadge 컴포넌트 - 다양한 상태를 시각적으로 표시하는 뱃지 컴포넌트입니다.
 * 
 * @component
 * @example
 * // 기본 사용법
 * <StateBadge>진행중</StateBadge>
 * 
 * @example
 * // 다양한 속성을 사용한 예시
 * <StateBadge 
 *   badgeType={BADGE_TYPES.SUCCESS}
 *   size={BADGE_SIZES.MEDIUM}
 *   icon={<IconComponent />}
 *   outline={false}
 * >
 *   완료
 * </StateBadge>
 */
const StateBadge = ({
  children,
  // Type 속성 (뱃지 종류)
  badgeType = BADGE_TYPES.INFO,
  // Size 속성 (뱃지 크기)
  size = BADGE_SIZES.MEDIUM,
  // Style 속성 (뱃지 스타일)
  outline = false,
  rounded = true,
  // Icon 속성 (아이콘 관련)
  icon = null,
  // 기타 속성
  className = '',
  customColor = '',
  ...props
}) => {
  // 기본 뱃지 스타일
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 ease-in-out';
  
  // Type 스타일 (뱃지 종류별 스타일)
  const getTypeClasses = () => {
    // 아웃라인 모드일 경우 다른 스타일 적용
    if (outline) {
      return {
        // 기본 상태 타입
        [BADGE_TYPES.SUCCESS]: 'bg-white text-green-600 outline outline-1 outline-offset-[-1px] outline-green-600',
        [BADGE_TYPES.WARNING]: 'bg-white text-amber-500 outline outline-1 outline-offset-[-1px] outline-amber-500',
        [BADGE_TYPES.ERROR]: 'bg-white text-rose-600 outline outline-1 outline-offset-[-1px] outline-rose-600',
        [BADGE_TYPES.INFO]: 'bg-white text-blue-600 outline outline-1 outline-offset-[-1px] outline-blue-600',
        [BADGE_TYPES.PENDING]: 'bg-white text-purple-600 outline outline-1 outline-offset-[-1px] outline-purple-600',
        [BADGE_TYPES.INACTIVE]: 'bg-white text-gray-500 outline outline-1 outline-offset-[-1px] outline-gray-300',
        [BADGE_TYPES.CUSTOM]: `bg-white outline outline-1 outline-offset-[-1px] ${customColor}`,
        
        // 업무 상태 타입
        [BADGE_TYPES.RECEIPT]: 'bg-white text-gray-600 outline outline-1 outline-offset-[-1px] outline-gray-300',
        [BADGE_TYPES.ASSIGN]: 'bg-white text-cyan-600 outline outline-1 outline-offset-[-1px] outline-cyan-300',
        [BADGE_TYPES.CONFIRM]: 'bg-white text-orange-600 outline outline-1 outline-offset-[-1px] outline-orange-300',
        [BADGE_TYPES.IN_DEVELOPMENT]: 'bg-white text-pink-600 outline outline-1 outline-offset-[-1px] outline-pink-300',
        [BADGE_TYPES.DEV_COMPLETE]: 'bg-white text-green-600 outline outline-1 outline-offset-[-1px] outline-green-300',
        [BADGE_TYPES.TEST]: 'bg-white text-teal-600 outline outline-1 outline-offset-[-1px] outline-teal-300',
        [BADGE_TYPES.TEST_REQUEST]: 'bg-white text-sky-600 outline outline-1 outline-offset-[-1px] outline-sky-300',
        [BADGE_TYPES.TEST_REJECT]: 'bg-white text-fuchsia-600 outline outline-1 outline-offset-[-1px] outline-fuchsia-300',
        [BADGE_TYPES.SUPPLEMENTING]: 'bg-white text-indigo-600 outline outline-1 outline-offset-[-1px] outline-indigo-300',
        [BADGE_TYPES.DEV_END]: 'bg-white text-stone-600 outline outline-1 outline-offset-[-1px] outline-stone-300',
        [BADGE_TYPES.HOLD]: 'bg-white text-yellow-600 outline outline-1 outline-offset-[-1px] outline-yellow-300',
        [BADGE_TYPES.WITHDRAW]: 'bg-white text-violet-600 outline outline-1 outline-offset-[-1px] outline-violet-300',
        [BADGE_TYPES.TRANSFER]: 'bg-white text-lime-600 outline outline-1 outline-offset-[-1px] outline-lime-300',
      };
    }
    
    // 기본 모드 스타일
    return {
      // 기본 상태 타입
      [BADGE_TYPES.SUCCESS]: 'bg-green-100 text-green-800',
      [BADGE_TYPES.WARNING]: 'bg-amber-100 text-amber-800',
      [BADGE_TYPES.ERROR]: 'bg-rose-100 text-rose-800',
      [BADGE_TYPES.INFO]: 'bg-blue-100 text-blue-800',
      [BADGE_TYPES.PENDING]: 'bg-purple-100 text-purple-800',
      [BADGE_TYPES.INACTIVE]: 'bg-gray-100 text-gray-600',
      [BADGE_TYPES.CUSTOM]: customColor || 'bg-slate-100 text-slate-800',
      
      // 업무 상태 타입
      [BADGE_TYPES.RECEIPT]: 'bg-gray-50 text-gray-600',
      [BADGE_TYPES.ASSIGN]: 'bg-cyan-50 text-cyan-600',
      [BADGE_TYPES.CONFIRM]: 'bg-orange-50 text-orange-600',
      [BADGE_TYPES.IN_DEVELOPMENT]: 'bg-pink-50 text-pink-600',
      [BADGE_TYPES.DEV_COMPLETE]: 'bg-green-50 text-green-600',
      [BADGE_TYPES.TEST]: 'bg-teal-50 text-teal-600',
      [BADGE_TYPES.TEST_REQUEST]: 'bg-sky-50 text-sky-600',
      [BADGE_TYPES.TEST_REJECT]: 'bg-fuchsia-50 text-fuchsia-600',
      [BADGE_TYPES.SUPPLEMENTING]: 'bg-indigo-50 text-indigo-600',
      [BADGE_TYPES.DEV_END]: 'bg-stone-50 text-stone-600',
      [BADGE_TYPES.HOLD]: 'bg-yellow-50 text-yellow-600',
      [BADGE_TYPES.WITHDRAW]: 'bg-violet-50 text-violet-600',
      [BADGE_TYPES.TRANSFER]: 'bg-lime-50 text-lime-600',
    };
  };
  
  // Size 스타일 (뱃지 크기별 스타일)
  const sizeClasses = {
    [BADGE_SIZES.SMALL]: 'text-xs px-1.5 py-0.5',
    [BADGE_SIZES.MEDIUM]: 'text-sm px-2 py-0.5',
    [BADGE_SIZES.LARGE]: 'text-sm px-2.5 py-1',
  };
  
  // 아이콘 크기별 스타일
  const iconSizeClasses = {
    [BADGE_SIZES.SMALL]: 'h-3 w-3',
    [BADGE_SIZES.MEDIUM]: 'h-3.5 w-3.5',
    [BADGE_SIZES.LARGE]: 'h-4 w-4',
  };
  
  // 모서리 스타일
  const roundedClasses = rounded ? 'rounded-full' : 'rounded';
  
  // 최종 클래스 결합
  const badgeClasses = `
    ${baseClasses}
    ${getTypeClasses()[badgeType]}
    ${sizeClasses[size]}
    ${roundedClasses}
    ${className}
  `;
  
  // 아이콘 클래스 생성 함수
  const getIconClass = () => {
    return iconSizeClasses[size];
  };

  return (
    <span
      className={badgeClasses}
      {...props}
    >
      {icon && (
        <span className="mr-1">{React.cloneElement(icon, { className: getIconClass() })}</span>
      )}
      {children}
    </span>
  );
};

StateBadge.propTypes = {
  /** 뱃지 내용 (텍스트 또는 React 노드) */
  children: PropTypes.node,
  /** 뱃지 타입 - BADGE_TYPES 상수 참조 */
  badgeType: PropTypes.oneOf(Object.values(BADGE_TYPES)),
  /** 뱃지 크기 - BADGE_SIZES 상수 참조 */
  size: PropTypes.oneOf(Object.values(BADGE_SIZES)),
  /** 아웃라인 모드 여부 */
  outline: PropTypes.bool,
  /** 모서리 둥글게 표시 여부 */
  rounded: PropTypes.bool,
  /** 뱃지에 표시할 아이콘 요소 */
  icon: PropTypes.element,
  /** 추가 CSS 클래스 */
  className: PropTypes.string,
  /** 커스텀 색상 (BADGE_TYPES.CUSTOM에서 사용) */
  customColor: PropTypes.string,
};

export default StateBadge;
