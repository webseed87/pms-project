import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldExclamationIcon } from '@heroicons/react/24/outline';
import pageBG from '../assets/images/pagebg.png';
const UnauthorizedPage = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-50"
    style={{
      backgroundImage: `url(${pageBG})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <div className="flex justify-center">
            <ShieldExclamationIcon className="h-24 w-24 text-orange-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            접근 권한이 없습니다
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            이 페이지에 접근할 수 있는 권한이 없습니다.
            관리자에게 문의하시거나 다른 페이지로 이동해주세요.
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <Link
            to="/"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            홈으로 돌아가기
          </Link>
          <button
            onClick={() => window.history.back()}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            이전 페이지로
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage; 