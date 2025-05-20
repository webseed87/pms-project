import React from 'react';
import PropTypes from 'prop-types';
import { DocumentTextIcon, ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline';

/**
 * UserBox 컴포넌트 - 사용자 정보와 액션 버튼을 표시합니다.
 * 
 * @component
 */
const UserBox = () => {
  return (
    <div className="flex flex-col  border-gray-300 flex-grow h-full">

  
      
      {/* 공지사항 및 로그아웃 버튼 */}
      <div className="w-72 px-3.5 py-4 bg-gray-50 border-t border-gray-300 inline-flex justify-center items-center mt-auto">
        <div className="flex-1 border-r border-slate-300 flex justify-center items-center gap-[5px]">
          <DocumentTextIcon className="w-6 h-6 text-zinc-700" />
          <div className="justify-start text-gray-700 text-base font-medium leading-normal">공지사항</div>
        </div>
        <div className="flex-1 flex justify-center items-center gap-1">
          <ArrowRightEndOnRectangleIcon className="w-6 h-6 text-gray-700" />
          <div className="justify-start text-gray-700 text-base font-medium leading-normal">로그아웃</div>
        </div>
      </div>
    </div>
  );
};

UserBox.propTypes = {
  /** 사용자 이름 */
  userName: PropTypes.string,
  /** 팀 이름 */
  teamName: PropTypes.string
};

export default UserBox; 