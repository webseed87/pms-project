import React from 'react';
import PropTypes from 'prop-types';

/**
 * 상단 네비게이션 바 컴포넌트
 * 로고와 제목을 포함합니다.
 * 
 * @component
 * @example
 * <TopBar />
 */
const TopBar = ({ title = "Project Manager System", className = "", children }) => {
  return (
    <div className={`h-14 w-full px-5 py-2.5 bg-slate-800 border-b border-gray-200 flex justify-between items-center ${className}`}>
      <div className="flex justify-start items-center gap-2.5">
        <img src="/pms.svg" alt="pms" className="w-6 h-6" />
        <div className="justify-start text-gray-50 text-lg font-normal font-['Pretendard']">{title}</div>
      </div>
      <div className="flex items-center">
        {children}
      </div>
    </div>
  );
};

TopBar.propTypes = {
  /** 상단 바에 표시될 타이틀 텍스트 */
  title: PropTypes.string,
  
  /** 추가 CSS 클래스 */
  className: PropTypes.string,

  /** 햄버거 메뉴 버튼 */
  children: PropTypes.node
};

export default TopBar; 