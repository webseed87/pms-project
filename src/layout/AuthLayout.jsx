import React from 'react';
import { Link } from 'react-router-dom';
import authBg from '../assets/images/authbg.png';

/**
 * 인증 페이지 레이아웃 컴포넌트
 * 로그인, 회원가입, 비밀번호 찾기 등의 인증 관련 페이지에서 사용되는 공통 레이아웃
 * 
 * @param {ReactNode} children - 레이아웃 내부에 표시될 콘텐츠
 * @param {string} title - 페이지 제목 (선택사항)
 * @returns {JSX.Element}
 */
export default function AuthLayout({ children, title }) {
  return (
    <div 
      className="flex flex-col items-center justify-center w-full h-full"
      style={{
         backgroundImage: `url(${authBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",

      }}
    >
      {/* 인증 카드 */}
      <div className="w-full min-w-[400px] max-w-[600px] bg-white rounded-lg shadow-lg py-8 px-10">
        {/* 로고 영역 */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-3">
          <img src="/pms.svg" alt="pms" className="w-12 h-12" />
        <span className="text-zinc-800 text-3xl font-bold">PMS</span>
          </div>
        </div>

        {/* 제목 (있을 경우) */}
        {title && (
          <h2 className="text-xl font-medium text-gray-800 mb-6 text-center">{title}</h2>
        )}

        {/* 메인 콘텐츠 */}
        <div >
          {children}
        </div>
      </div>
    </div>
  );
}