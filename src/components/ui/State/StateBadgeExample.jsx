import React from 'react';
import StateBadge, { BADGE_TYPES, BADGE_SIZES } from './StateBadge';
import { CheckIcon, ExclamationTriangleIcon, XCircleIcon, InformationCircleIcon, ClockIcon } from '@heroicons/react/24/solid';

const StateBadgeExample = () => {
  return (
    <div className="p-6 space-y-10">
      <section>
        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b">기본 상태 뱃지</h2>
        <div className="space-y-6">
          {/* 기본 타입 */}
          <div>
            <h3 className="font-semibold mb-3 text-gray-700">상태별</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-xs font-semibold mb-2 text-gray-500">SUCCESS</h4>
                <StateBadge badgeType={BADGE_TYPES.SUCCESS}>
                  완료
                </StateBadge>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-xs font-semibold mb-2 text-gray-500">WARNING</h4>
                <StateBadge badgeType={BADGE_TYPES.WARNING}>
                  주의
                </StateBadge>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-xs font-semibold mb-2 text-gray-500">ERROR</h4>
                <StateBadge badgeType={BADGE_TYPES.ERROR}>
                  오류
                </StateBadge>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-xs font-semibold mb-2 text-gray-500">INFO</h4>
                <StateBadge badgeType={BADGE_TYPES.INFO}>
                  정보
                </StateBadge>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-xs font-semibold mb-2 text-gray-500">PENDING</h4>
                <StateBadge badgeType={BADGE_TYPES.PENDING}>
                  진행중
                </StateBadge>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-xs font-semibold mb-2 text-gray-500">INACTIVE</h4>
                <StateBadge badgeType={BADGE_TYPES.INACTIVE}>
                  비활성
                </StateBadge>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-xs font-semibold mb-2 text-gray-500">CUSTOM</h4>
                <StateBadge 
                  badgeType={BADGE_TYPES.CUSTOM} 
                  customColor="bg-teal-100 text-teal-800"
                >
                  커스텀
                </StateBadge>
              </div>
            </div>
          </div>
          
          {/* 사이즈별 */}
          <div>
            <h3 className="font-semibold mb-3 text-gray-700">사이즈별</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-xs font-semibold mb-2 text-gray-500">SMALL</h4>
                <StateBadge 
                  badgeType={BADGE_TYPES.SUCCESS}
                  size={BADGE_SIZES.SMALL}
                >
                  작은 사이즈
                </StateBadge>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-xs font-semibold mb-2 text-gray-500">MEDIUM</h4>
                <StateBadge 
                  badgeType={BADGE_TYPES.SUCCESS}
                  size={BADGE_SIZES.MEDIUM}
                >
                  중간 사이즈
                </StateBadge>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-xs font-semibold mb-2 text-gray-500">LARGE</h4>
                <StateBadge 
                  badgeType={BADGE_TYPES.SUCCESS}
                  size={BADGE_SIZES.LARGE}
                >
                  큰 사이즈
                </StateBadge>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b">업무 상태 뱃지</h2>
        <div className="space-y-6">
          {/* 업무 상태 타입 - 첫 번째 줄 */}
          <div>
            <h3 className="font-semibold mb-3 text-gray-700">업무 프로세스 상태</h3>
            <div className="inline-flex flex-wrap gap-4 mb-4">
              <StateBadge badgeType={BADGE_TYPES.RECEIPT} rounded={false}>
                접수
              </StateBadge>
              
              <StateBadge badgeType={BADGE_TYPES.ASSIGN} rounded={false}>
                지정
              </StateBadge>
              
              <StateBadge badgeType={BADGE_TYPES.CONFIRM} rounded={false}>
                확인
              </StateBadge>
              
              <StateBadge badgeType={BADGE_TYPES.IN_DEVELOPMENT} rounded={false}>
                개발중
              </StateBadge>
              
              <StateBadge badgeType={BADGE_TYPES.DEV_COMPLETE} rounded={false}>
                개발완료
              </StateBadge>
              
              <StateBadge badgeType={BADGE_TYPES.TEST} rounded={false}>
                테스트
              </StateBadge>
              
              <StateBadge badgeType={BADGE_TYPES.TEST_REQUEST} rounded={false}>
                테스트요청
              </StateBadge>
            </div>
            
            {/* 업무 상태 타입 - 두 번째 줄 */}
            <div className="inline-flex flex-wrap gap-4 ml-4">
              <StateBadge badgeType={BADGE_TYPES.TEST_REJECT} rounded={false}>
                테스트부적합
              </StateBadge>
              
              <StateBadge badgeType={BADGE_TYPES.SUPPLEMENTING} rounded={false}>
                보완중
              </StateBadge>
              
              <StateBadge badgeType={BADGE_TYPES.DEV_END} rounded={false}>
                개발종료
              </StateBadge>
              
              <StateBadge badgeType={BADGE_TYPES.HOLD} rounded={false}>
                보류
              </StateBadge>
              
              <StateBadge badgeType={BADGE_TYPES.WITHDRAW} rounded={false}>
                철회
              </StateBadge>
              
              <StateBadge badgeType={BADGE_TYPES.TRANSFER} rounded={false}>
                이관
              </StateBadge>
            </div>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b">아웃라인 상태 뱃지</h2>
        <div className="space-y-6">
          {/* 아웃라인 타입 */}
          <div>
            <h3 className="font-semibold mb-3 text-gray-700">상태별</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-xs font-semibold mb-2 text-gray-500">SUCCESS</h4>
                <StateBadge 
                  badgeType={BADGE_TYPES.SUCCESS}
                  outline
                >
                  완료
                </StateBadge>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-xs font-semibold mb-2 text-gray-500">WARNING</h4>
                <StateBadge 
                  badgeType={BADGE_TYPES.WARNING}
                  outline
                >
                  주의
                </StateBadge>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-xs font-semibold mb-2 text-gray-500">ERROR</h4>
                <StateBadge 
                  badgeType={BADGE_TYPES.ERROR}
                  outline
                >
                  오류
                </StateBadge>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-xs font-semibold mb-2 text-gray-500">INFO</h4>
                <StateBadge 
                  badgeType={BADGE_TYPES.INFO}
                  outline
                >
                  정보
                </StateBadge>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b">아이콘 포함 뱃지</h2>
        <div className="space-y-6">
          {/* 아이콘 타입 */}
          <div>
            <h3 className="font-semibold mb-3 text-gray-700">상태별</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-xs font-semibold mb-2 text-gray-500">SUCCESS</h4>
                <StateBadge 
                  badgeType={BADGE_TYPES.SUCCESS}
                  icon={<CheckIcon />}
                >
                  완료
                </StateBadge>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-xs font-semibold mb-2 text-gray-500">WARNING</h4>
                <StateBadge 
                  badgeType={BADGE_TYPES.WARNING}
                  icon={<ExclamationTriangleIcon />}
                >
                  주의
                </StateBadge>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-xs font-semibold mb-2 text-gray-500">ERROR</h4>
                <StateBadge 
                  badgeType={BADGE_TYPES.ERROR}
                  icon={<XCircleIcon />}
                >
                  오류
                </StateBadge>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-xs font-semibold mb-2 text-gray-500">INFO</h4>
                <StateBadge 
                  badgeType={BADGE_TYPES.INFO}
                  icon={<InformationCircleIcon />}
                >
                  정보
                </StateBadge>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-xs font-semibold mb-2 text-gray-500">PENDING</h4>
                <StateBadge 
                  badgeType={BADGE_TYPES.PENDING}
                  icon={<ClockIcon />}
                >
                  진행중
                </StateBadge>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b">모서리 스타일</h2>
        <div className="space-y-6">
          {/* 모서리 스타일 */}
          <div>
            <h3 className="font-semibold mb-3 text-gray-700">모서리 타입</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-xs font-semibold mb-2 text-gray-500">ROUNDED (기본)</h4>
                <StateBadge 
                  badgeType={BADGE_TYPES.SUCCESS}
                  rounded={true}
                >
                  둥근 모서리
                </StateBadge>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-xs font-semibold mb-2 text-gray-500">SQUARE</h4>
                <StateBadge 
                  badgeType={BADGE_TYPES.SUCCESS}
                  rounded={false}
                >
                  직각 모서리
                </StateBadge>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StateBadgeExample; 