import React from 'react';
import Tab, { TAB_POSITIONS, TAB_SIZES, ICON_POSITIONS, TAB_DESIGNS } from './Tab';
import { HomeIcon, UserIcon, BellIcon, CogIcon, ChartBarIcon, DocumentTextIcon, UsersIcon, XMarkIcon } from '@heroicons/react/24/outline';

/**
 * Tab 컴포넌트 사용 예제
 */
const TabExample = () => {
  // 탭 변경 이벤트 핸들러
  const handleTabChange = (index) => {
    console.log(`탭이 ${index}번으로 변경되었습니다.`);
  };

  // 기본 탭 설정
  const tabs = [
    {
      label: '홈',
      icon: <HomeIcon className="w-5 h-5" />,
      content: <div className="p-4 border rounded bg-gray-50">홈 탭 내용입니다.</div>
    },
    {
      label: '사용자',
      icon: <UserIcon className="w-5 h-5" />,
      content: <div className="p-4 border rounded bg-gray-50">사용자 탭 내용입니다.</div>
    },
    {
      label: '알림',
      icon: <BellIcon className="w-5 h-5" />,
      content: <div className="p-4 border rounded bg-gray-50">알림 탭 내용입니다.</div>
    },
    {
      label: '설정',
      icon: <CogIcon className="w-5 h-5" />,
      content: <div className="p-4 border rounded bg-gray-50">설정 탭 내용입니다.</div>
    },
  ];

  // 좌측 탭 설정
  const sidebarTabs = [
    {
      label: '대시보드',
      icon: <ChartBarIcon className="w-5 h-5" />,
      content: <div className="p-4 border rounded bg-gray-50">대시보드 내용입니다.</div>
    },
    {
      label: '문서',
      icon: <DocumentTextIcon className="w-5 h-5" />,
      content: <div className="p-4 border rounded bg-gray-50">문서 내용입니다.</div>
    },
    {
      label: '팀 관리',
      icon: <UsersIcon className="w-5 h-5" />,
      content: <div className="p-4 border rounded bg-gray-50">팀 관리 내용입니다.</div>
    },
  ];

  // 아웃라인 디자인 탭 설정
  const outlineTabs = [
    {
      icon: <XMarkIcon className="w-5 h-5" />,
      label: '프로젝트 정보',
      content: <div className="p-4 border rounded bg-gray-50">프로젝트 정보 내용입니다.</div>
    },
    {
      icon: <XMarkIcon className="w-5 h-5" />,
      label: '과제목록',
      content: <div className="p-4 border rounded bg-gray-50">과제목록 내용입니다.</div>
    },
    {
      icon: <XMarkIcon className="w-5 h-5" />,
      label: '이슈관리',
      content: <div className="p-4 border rounded bg-gray-50">이슈관리 내용입니다.</div>
    },
  ];

  return (
    <div className="space-y-10 p-4">
      <section>
        <h2 className="text-xl font-bold mb-4">기본 탭 (상단)</h2>
        <div className="border border-gray-300 rounded overflow-hidden">
          <Tab 
            tabs={tabs}
            defaultActiveTab={0}
            onChange={handleTabChange}
            iconPosition={ICON_POSITIONS.LEFT}
          />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">아웃라인 디자인 탭</h2>
        <div className="p-4 border border-gray-300 rounded">
          <Tab 
            tabs={outlineTabs}
            defaultActiveTab={0}
            design={TAB_DESIGNS.OUTLINE}
            iconPosition={ICON_POSITIONS.RIGHT}
            showContent={true}
          />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">아웃라인 디자인 - 콘텐츠 없이</h2>
        <div className="p-4 border border-gray-300 rounded">
          <Tab 
            tabs={outlineTabs}
            defaultActiveTab={0}
            design={TAB_DESIGNS.OUTLINE}
            iconPosition={ICON_POSITIONS.RIGHT}
            showContent={false}
          />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">크기 - 작은 탭 (Small)</h2>
        <div className="border border-gray-300 rounded overflow-hidden">
          <Tab 
            tabs={tabs}
            defaultActiveTab={0}
            size={TAB_SIZES.SMALL}
            iconPosition={ICON_POSITIONS.LEFT}
          />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">크기 - 큰 탭 (Large)</h2>
        <div className="border border-gray-300 rounded overflow-hidden">
          <Tab 
            tabs={tabs}
            defaultActiveTab={0}
            size={TAB_SIZES.LARGE}
            iconPosition={ICON_POSITIONS.RIGHT}
          />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">좌측 탭 (세로 메뉴)</h2>
        <div className="border border-gray-300 rounded overflow-hidden h-80">
          <Tab 
            tabs={sidebarTabs}
            defaultActiveTab={0}
            position={TAB_POSITIONS.LEFT}
            iconPosition={ICON_POSITIONS.LEFT}
          />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">아이콘 없는 텍스트 탭</h2>
        <div className="border border-gray-300 rounded overflow-hidden">
          <Tab 
            tabs={[
              { label: '탭 1', content: <div className="p-4 border rounded bg-gray-50">첫 번째 탭 내용입니다.</div> },
              { label: '탭 2', content: <div className="p-4 border rounded bg-gray-50">두 번째 탭 내용입니다.</div> },
              { label: '탭 3', content: <div className="p-4 border rounded bg-gray-50">세 번째 탭 내용입니다.</div> },
            ]}
            defaultActiveTab={0}
            iconPosition={ICON_POSITIONS.RIGHT}
          />
        </div>
      </section>
    </div>
  );
};

export default TabExample; 