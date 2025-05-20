import React from 'react';
import PropTypes from 'prop-types';

/**
 * 라벨 타입 상수 정의 - 다양한 스타일의 라벨 타입 옵션을 제공합니다.
 * @type {Object}
 */
export const LABEL_TYPES = {
  // 주요 타입
  BOX: 'box',      // 박스형 라벨 (배경색 있음)
  PLAIN: 'plain',  // 일반 텍스트 라벨 (배경색 없음)
};

/**
 * 라벨 컴포넌트 - 다양한 스타일로 텍스트 라벨을 표시하는 컴포넌트입니다.
 * 
 * @component
 * @example
 * // 기본 사용법
 * <Label>접수 NO</Label>
 * 
 * @example
 * // 다양한 속성을 사용한 예시
 * <Label 
 *   labelType={LABEL_TYPES.BOX}
 *   required={true}
 *   width="150px"
 * >
 *   이름
 * </Label>
 */
const Label = ({
  children,
  labelType = LABEL_TYPES.PLAIN,
  required = false,
  className = '',
  width = '',
  ...props
}) => {
  // 라벨 스타일 정의
  const getLabelStyles = () => {
    // 기본 스타일 (모든 라벨 타입에 공통으로 적용)
    let baseStyles = "font-normal text-sm text-slate-800 font-['Pretendard'] leading-tight";
    
    // 라벨 타입별 추가 스타일
    if (labelType === LABEL_TYPES.BOX) {
      return `h-14 min-w-28 px-3 py-2 bg-gray-50  border border-gray-300 inline-flex justify-center items-center gap-9 ${className}`;
    } else if (labelType === LABEL_TYPES.PLAIN) {
      return `py-0.5 inline-flex justify-start items-center gap-9 ${className}`;
    }
  };

  const labelStyles = getLabelStyles();
  const widthStyle = width ? { width } : {};

  // required 표시가 필요한 경우
  if (required) {
    return (
      <div className={`py-0.5 inline-flex items-center ${className}`} style={widthStyle} {...props}>
        <div className="text-left text-slate-800 text-sm font-normal font-['Pretendard'] leading-tight flex items-center">
          {children}
          <span className="text-orange-600 text-xs ml-0.5">*</span>
        </div>
      </div>
    );
  }

  // 일반 라벨 렌더링 (required 아닌 경우)
  if (labelType === LABEL_TYPES.BOX) {
    return (
      <div className={labelStyles} style={widthStyle} {...props}>
        <div className="flex-1 text-center text-slate-800 text-sm font-normal font-['Pretendard'] leading-tight">
          {children}
        </div>
      </div>
    );
  } else {
    return (
      <div className={labelStyles} style={widthStyle} {...props}>
        <div className="flex-1 text-left text-slate-800 text-sm font-normal font-['Pretendard'] leading-tight">
          {children}
        </div>
      </div>
    );
  }
};

Label.propTypes = {
  /** 라벨 내용 */
  children: PropTypes.node.isRequired,
  /** 라벨 타입 - LABEL_TYPES 상수 참조 */
  labelType: PropTypes.oneOf(Object.values(LABEL_TYPES)),
  /** 필수 여부 표시 */
  required: PropTypes.bool,
  /** 추가 CSS 클래스 */
  className: PropTypes.string,
  /** 라벨 너비 설정 */
  width: PropTypes.string,
};

export default Label; 