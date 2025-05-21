import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { XMarkIcon } from '@heroicons/react/24/outline';

/**
 * 모달 컴포넌트
 * 팝업 형태의 모달 다이얼로그를 표시합니다.
 * 
 * @component
 * @example
 * <Modal
 *   isOpen={isModalOpen}
 *   onClose={() => setIsModalOpen(false)}
 *   title="개발자 조회"
 * >
 *   <div>모달 내용</div>
 * </Modal>
 * 
 * @example
 * // 헤더에 액션 버튼 추가
 * <Modal
 *   isOpen={isModalOpen}
 *   onClose={() => setIsModalOpen(false)}
 *   title="테스트 상세 정보"
 *   headerActions={
 *     <div className="flex space-x-2">
 *       <Button>저장</Button>
 *       <Button>수정</Button>
 *     </div>
 *   }
 * >
 *   <div>모달 내용</div>
 * </Modal>
 */
const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  width = 'max-w-3xl',
  closeOnOverlayClick = true,
  headerActions
}) => {
  // 모달이 열려있을 때 body 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // 모달이 닫혀있을 때 렌더링 방지
  if (!isOpen) return null;

  // 배경 클릭 핸들러
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 overflow-auto p-4"
      onClick={handleOverlayClick}
    >
      <div className={`p-8 bg-white rounded-md shadow-lg ${width} w-full max-h-[90vh] flex flex-col overflow-hidden relative`}>
        {/* 닫기 버튼 - 상단 우측에 고정 */}
        <button
          type="button"
          className="absolute top-2 right-2 focus:outline-none"
          onClick={onClose}
        >
          <div className="w-6 h-6 flex items-center justify-center relative overflow-hidden bg-slate-100 rounded-[20px]">
            <XMarkIcon className="w-5 h-5 text-gray-700" />
          </div>
        </button>
        
        {/* 모달 헤더 */}
        <div data-type="Default" className="self-stretch h-14 p-2.5 border-b border-gray-600 flex justify-between items-center">
          <div className="self-stretch flex flex-col justify-center items-start">
            <div className="justify-start text-slate-900 text-xl font-medium font-['Pretendard'] leading-7">{title}</div>
          </div>
          {headerActions && (
            <div className="flex items-center">
              {headerActions}
            </div>
          )}
        </div>
        
        {/* 모달 내용 */}
        <div className="flex-1 overflow-auto p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  /** 모달 열림 여부 */
  isOpen: PropTypes.bool.isRequired,
  
  /** 모달 닫기 핸들러 */
  onClose: PropTypes.func.isRequired,
  
  /** 모달 타이틀 */
  title: PropTypes.string.isRequired,
  
  /** 모달 내용 */
  children: PropTypes.node.isRequired,
  
  /** 모달 너비 클래스 */
  width: PropTypes.string,
  
  /** 오버레이 클릭 시 닫기 여부 */
  closeOnOverlayClick: PropTypes.bool,
  
  /** 헤더에 표시할 액션 버튼 */
  headerActions: PropTypes.node
};

export default Modal; 