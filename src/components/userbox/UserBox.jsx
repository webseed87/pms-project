import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ChevronDownIcon,  ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';

/**
 * UserBox 컴포넌트 - 사용자 정보와 드롭다운 메뉴를 표시합니다.
 * 
 * @component
 */
const UserBox = ({ userName, teamName, options = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const handleOptionClick = (option) => {
    if (option.onClick) {
      option.onClick();
    }
    setIsOpen(false);
  };
  
  return (
    <div className="py-7 flex justify-center items-center gap-4 flex-col relative  border-gray-300" ref={dropdownRef}>
      {/* 사용자 정보 표시 영역 */}
      <div className="self-stretch inline-flex justify-center items-center gap-3">
    
        <div className="justify-start text-slate-800 text-base font-medium font-['Pretendard'] leading-normal">{userName} </div>
        <div className="ml-3 justify-start text-slate-800 text-lg font-normal font-['Pretendard'] leading-7">{teamName}</div>
      </div>
      
      {/* 드롭다운 토글 버튼 */}
      <div 
        className="px-5 py-2 bg-slate-50 rounded-2xl inline-flex justify-start items-center gap-2.5 cursor-pointer"
        onClick={toggleDropdown}
      >
        <ChatBubbleBottomCenterTextIcon className="w-6 h-6 text-slate-800" />
        <div className="flex justify-start items-center gap-[5px]">
          <div className="justify-start text-slate-800 text-base font-medium font-['Pretendard'] leading-normal">PMS 개발</div>
          <ChevronDownIcon className={`w-5 h-5 text-slate-800 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>
      
      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className="absolute w-44 bg-white border border-gray-200 rounded-md shadow-lg z-10 mt-0 left-1/2 transform -translate-x-1/2 top-[calc(100%-1rem)]">
          <ul className="py-1">
            {options.map((option, index) => (
              <li 
                key={index}
                className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </li>
            ))}
            {options.length === 0 && (
              <li className="px-3 py-1.5 text-sm text-gray-500">옵션이 없습니다</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

UserBox.propTypes = {
  /** 사용자 이름 */
  userName: PropTypes.string.isRequired,
  /** 팀 이름 */
  teamName: PropTypes.string.isRequired,
  /** 드롭다운 메뉴 옵션 배열 */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func
    })
  )
};

export default UserBox; 