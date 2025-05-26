import React from 'react';
import { Link } from 'react-router-dom';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import pageBG from '../assets/images/pagebg.png';

const MaintenancePage = () => {
  return (
    <div className=" flex items-center justify-center w-full h-full bg-gray-50"
    style={{
      backgroundImage: `url(${pageBG})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <div className="flex justify-center">
            <WrenchScrewdriverIcon className="h-24 w-24 text-slate-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            시스템 점검 중입니다
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            더 나은 서비스 제공을 위해 현재 시스템 점검을 진행하고 있습니다.
            잠시 후 다시 이용해 주시기 바랍니다.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            예상 점검 시간: 1시간
          </p>
        </div>
        <div className="mt-8">
          <Link
            to="/"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-700 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage; 