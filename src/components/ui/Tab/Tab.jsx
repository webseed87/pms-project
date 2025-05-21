import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * 탭 위치 상수 정의
 * @type {Object}
 */
export const TAB_POSITIONS = {
  TOP: 'top',       // 상단에 탭 메뉴
  LEFT: 'left',     // 좌측에 탭 메뉴
};

/**
 * 탭 크기 상수 정의
 * @type {Object}
 */
export const TAB_SIZES = {
  SMALL: 'small',   // 작은 크기 탭
  MEDIUM: 'medium', // 중간 크기 탭
  LARGE: 'large',   // 큰 크기 탭
};

/**
 * 아이콘 위치 상수 정의
 * @type {Object}
 */
export const ICON_POSITIONS = {
  LEFT: 'left',     // 왼쪽에 아이콘
  RIGHT: 'right',   // 오른쪽에 아이콘
  TOP: 'top',       // 위쪽에 아이콘
  NONE: 'none',     // 아이콘 없음
};

/**
 * 탭 디자인 타입 상수 정의
 * @type {Object}
 */
export const TAB_DESIGNS = {
  DEFAULT: 'default',  // 기본 디자인 (하단 또는 우측 바)
  OUTLINE: 'outline',  // 아웃라인 디자인 (테두리 있는 버튼형)
};

/**
 * 탭 메뉴 컴포넌트
 * 여러 탭을 통해 다른 컨텐츠를 표시할 수 있는 UI 컴포넌트
 * 
 * @component
 * @example
 * // 기본 사용법
 * <Tab tabs={[
 *   { label: '탭1', content: <div>내용1</div> },
 *   { label: '탭2', content: <div>내용2</div> }
 * ]} />
 */
const Tab = ({ 
  tabs, 
  defaultActiveTab = 0, 
  onChange,
  position = TAB_POSITIONS.TOP,
  size = TAB_SIZES.MEDIUM,
  iconPosition = ICON_POSITIONS.LEFT,
  design = TAB_DESIGNS.DEFAULT,
  className = '',
  showContent = true,
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  const handleTabClick = (index) => {
    setActiveTab(index);
    if (onChange) {
      onChange(index);
    }
  };

  // 기본 컨테이너 클래스
  const containerClasses = `flex ${position === TAB_POSITIONS.TOP ? 'flex-col' : 'flex-row'} w-full ${className}`;
  
  // 탭 헤더 클래스 - 디자인 타입에 따라 다른 스타일 적용
  const headerClasses = `flex ${position === TAB_POSITIONS.TOP ? 'flex-row' : 'flex-col'} ${
    design === TAB_DESIGNS.DEFAULT ? 
    (position === TAB_POSITIONS.TOP ? 'border-b' : 'border-r') + ' border-gray-300' : 
    'gap-2'
  } bg-white flex-wrap ${position === TAB_POSITIONS.LEFT ? 'min-w-[180px]' : ''}`;
  
  // 탭 콘텐츠 클래스
  const contentClasses = 'bg-white flex-1 p-4';

  // 탭 아이템 크기별 스타일 - 디자인 타입 별로 다른 패딩 적용
  const tabSizeClasses = {
    [TAB_SIZES.SMALL]: design === TAB_DESIGNS.DEFAULT ? 'text-xs py-2 px-3' : 'text-xs px-3 py-1',
    [TAB_SIZES.MEDIUM]: design === TAB_DESIGNS.DEFAULT ? 'text-sm py-3 px-4' : 'text-sm px-4 py-2',
    [TAB_SIZES.LARGE]: design === TAB_DESIGNS.DEFAULT ? 'text-base py-4 px-6' : 'text-base px-5 py-2.5',
  };

  // 탭 아이템 공통 클래스
  const getBaseClasses = (isActive) => {
    if (design === TAB_DESIGNS.DEFAULT) {
      return 'flex items-center gap-2 cursor-pointer transition-colors duration-200 whitespace-nowrap relative';
    } else { // OUTLINE 디자인
      return `rounded outline outline-1 outline-offset-[-1px] ${
        isActive ? 
        'bg-blue-50 outline-blue-800' : 
        'bg-white outline-gray-300'
      } inline-flex justify-center items-center gap-2 cursor-pointer whitespace-nowrap`;
    }
  };
  
  // 아이콘 위치에 따른 클래스
  const getIconPositionClasses = () => {
    switch (iconPosition) {
      case ICON_POSITIONS.RIGHT:
        return 'flex-row-reverse';
      case ICON_POSITIONS.TOP:
        return 'flex-col items-center';
      case ICON_POSITIONS.NONE:
        return '';
      default: // LEFT
        return '';
    }
  };
  
  // 활성탭 스타일 (디자인 타입에 따라 다른 스타일 적용)
  const getActiveClasses = (isActive) => {
    if (design === TAB_DESIGNS.DEFAULT) {
      if (!isActive) return 'text-gray-500 hover:text-gray-700 hover:bg-gray-50';
      
      const activePositionClass = position === TAB_POSITIONS.TOP 
        ? 'after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[2px] after:bg-blue-700' 
        : 'after:absolute after:right-[-1px] after:top-0 after:w-[2px] after:h-full after:bg-blue-700';
      
      return `text-blue-700 font-medium ${activePositionClass}`;
    } else { // OUTLINE 디자인
      return isActive ? 'text-blue-800' : 'text-gray-500';
    }
  };

  // 아이콘 렌더링 함수
  const renderIcon = (tab, isActive) => {
    if (!tab.icon || iconPosition === ICON_POSITIONS.NONE) {
      // 아이콘이 없을 때 디자인 타입이 OUTLINE이고 ICON_POSITIONS.RIGHT인 경우 기본 화살표 아이콘 추가
      if (design === TAB_DESIGNS.OUTLINE && iconPosition === ICON_POSITIONS.RIGHT) {
        return (
          <div className="w-4 h-4 relative overflow-hidden">
            <div className={`w-2.5 h-2.5 left-[3.20px] top-[3.19px] absolute ${isActive ? 'bg-blue-800' : 'bg-gray-500'}`} />
          </div>
        );
      }
      return null;
    }
    
    return (
      <span className={`tab-icon ${iconPosition === ICON_POSITIONS.TOP ? 'mb-1' : ''}`}>
        {tab.icon}
      </span>
    );
  };

  return (
    <div className={containerClasses}>
      <div className={headerClasses}>
        {tabs.map((tab, index) => {
          const isActive = activeTab === index;
          return (
            <div
              key={index}
              className={`${getBaseClasses(isActive)} ${tabSizeClasses[size]} ${getIconPositionClasses()} ${getActiveClasses(isActive)}`}
              onClick={() => handleTabClick(index)}
            >
              {renderIcon(tab, isActive)}
              <div className={`justify-start font-normal font-['Pretendard'] leading-tight max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap`}>
                {tab.label}
              </div>
            </div>
          );
        })}
      </div>
      {showContent && tabs[activeTab]?.content && (
        <div className={contentClasses}>
          {tabs[activeTab].content}
        </div>
      )}
    </div>
  );
};

Tab.propTypes = {
  /** 탭 아이템 배열 */
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      /** 탭 라벨 */
      label: PropTypes.string.isRequired,
      /** 탭 아이콘 (선택사항) */
      icon: PropTypes.node,
      /** 탭 내용 */
      content: PropTypes.node,
    })
  ).isRequired,
  /** 기본 활성화 탭 인덱스 */
  defaultActiveTab: PropTypes.number,
  /** 탭 변경 시 호출되는 콜백 함수 */
  onChange: PropTypes.func,
  /** 탭 위치 (상단 또는 좌측) */
  position: PropTypes.oneOf(Object.values(TAB_POSITIONS)),
  /** 탭 크기 */
  size: PropTypes.oneOf(Object.values(TAB_SIZES)),
  /** 아이콘 위치 */
  iconPosition: PropTypes.oneOf(Object.values(ICON_POSITIONS)),
  /** 탭 디자인 타입 */
  design: PropTypes.oneOf(Object.values(TAB_DESIGNS)),
  /** 콘텐츠 표시 여부 */
  showContent: PropTypes.bool,
  /** 추가 클래스 */
  className: PropTypes.string,
};

export default Tab; 