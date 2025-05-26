import React from 'react';
import { Link } from 'react-router-dom';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Button, { BUTTON_TYPES, BUTTON_SIZES } from '../components/ui/Button';
import pageBG from '../assets/images/pagebg.png';

const NotFoundPage = () => {
  return (
    <div 
      className="w-full h-full flex items-center justify-center bg-gray-50"
      style={{
        backgroundImage: `url(${pageBG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <div className="flex justify-center">
            <ExclamationTriangleIcon className="h-24 w-24 text-blue-800" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-4">
          <Link to="/" className="w-full">
            <Button 
              buttonType={BUTTON_TYPES.PRIMARY}
              size={BUTTON_SIZES.LARGE}
              fullWidth={true}
            >
              홈으로 돌아가기
            </Button>
          </Link>
          <Button
            buttonType={BUTTON_TYPES.LINE}
            size={BUTTON_SIZES.LARGE}
            onClick={() => window.history.back()}
          >
            이전 페이지로
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage; 