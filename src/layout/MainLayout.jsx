// layouts/MainLayout.jsx
import React, { useState, useEffect } from 'react';
import TopBar from '../components/topbar/TopBar';
import Menu from '../components/ui/Menu';
import SideBottom from '../components/sdiebottom/SideBottom';
import { BUTTON_TYPES } from '../components/ui/Button';
import { 
  Squares2X2Icon, 
  DocumentTextIcon, 
  ChartPieIcon, 
  DocumentChartBarIcon, 
  UserGroupIcon, 
  NewspaperIcon,
  Bars3Icon,
  XMarkIcon as CloseIcon
} from '@heroicons/react/24/outline';
import UserBox from '../components/userbox';
import Tab, { TAB_DESIGNS, ICON_POSITIONS } from '../components/ui/Tab';

const MainLayout = ({ children }) => {  
  // 선택된 메뉴 상태 추가
  const [selectedMenu, setSelectedMenu] = useState("프로젝트 정보");
  // 모바일 메뉴 열림/닫힘 상태
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // 화면 너비 상태
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // 모바일 화면 여부 (1280px 이하)
  const isMobile = windowWidth <= 1280;

  // 화면 크기 변경 감지
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 모바일 메뉴 토글 함수
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // 메뉴 아이템 배열 정의
  const menuItems = [
    {
      id: 'project',
      label: '프로젝트 관리',
      icon: <Squares2X2Icon className="w-6 h-6" />,
      children: [
        { id: 'project-info', label: '프로젝트 정보' },
        { id: 'project-task', label: '프로젝트 업무 정보' },
        { id: 'project-team', label: '프로젝트 팀 정보' },
        { id: 'project-member', label: '프로젝트 팀원 정보' },
        { id: 'project-status', label: '프로젝트 상세 정보' },
        { id: 'project-progress', label: '프로젝트 과제 접수' },
        { id: 'project-manager', label: '프로젝트 과제 담당자 정보' },
        { id: 'project-company', label: '프로젝트 업체 정보' },
      ]
    },
    {
      id: 'task',
      label: '과제관리',
      icon: <DocumentTextIcon className="w-6 h-6" />,
      children: [
        { id: 'task-list', label: '개인별 과제 정보' },
        { id: 'task-create', label: '과제 일일 정보' },
        { id: 'task-assign', label: '과제 테스트 정보' },
        { id: 'task-status', label: '과제 테스트요청 정보' },
        { id: 'task-progress', label: '과제 평가 정보' },
        { id: 'task-review-1', label: '발주사 완료 과제 전달' },
        { id: 'task-review-2', label: '과제 진척 정보' },
        { id: 'task-review-3', label: '발주사 반영 요청' },
      ]
    },
    {
      id: 'workflow',
      label: '워크플로우 관리',
      icon: <ChartPieIcon className="w-6 h-6" />,
      children: [
        { id: 'workflow-templates', label: 'SI 워크 정보' },
        { id: 'workflow-create', label: 'SM 워크 정보' },
      ]
    },
    {
      id: 'report',
      label: '보고서 관리',
      icon: <DocumentChartBarIcon className="w-6 h-6" />,
      children: [
        { id: 'report-daily', label: '개인별 과제 현황' },
        { id: 'report-weekly', label: '개인별 과제 실적 현황' },
        { id: 'report-monthly', label: '과제별 일일 현황' },
        { id: 'report-custom', label: '과제별 평가 현황' },
      ]
    },
    {
      id: 'user',
      label: '사용자 관리',
      icon: <UserGroupIcon className="w-6 h-6" />,
      children: [
        { id: 'user-activity', label: '휴가 정보' },
      ]
    },
    {
      id: 'settings',
      label: '기초정보관리',
      icon: <NewspaperIcon className="w-6 h-6" />,
      children: [
        { id: 'settings-company', label: '팀 정보' },
        { id: 'settings-department', label: '직무직급 정보' },
        { id: 'settings-code', label: '거래처 정보' },
        { id: 'settings-system', label: '공통 코드 정보' },
        { id: 'settings-backup-1', label: '공휴일 정보' },
        { id: 'settings-backup-2', label: '메시지 정보' },
      ]
    }
  ];
  
  const userOptions = [
    { label: '프로젝트1' },
    { label: '프로젝트2' },
    { label: '프로젝트3' },
  ];
  
  const handleMenuClick = (item) => {
    console.log('메뉴 클릭:', item);
    // 선택된 메뉴 상태 업데이트
    setSelectedMenu(item.label);
    // 모바일인 경우 메뉴 닫기
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  // 아웃라인 디자인 탭 설정
  const outlineTabs = [
    {
      icon: <CloseIcon className="w-5 h-5" />,
      label: '프로젝트 정보',
      content: <div className="p-4 border rounded bg-gray-50">프로젝트 정보 내용입니다.</div>
    },
    {
      icon: <CloseIcon className="w-5 h-5" />,
      label: '과제목록',
      content: <div className="p-4 border rounded bg-gray-50">과제목록 내용입니다.</div>
    },
    {
      icon: <CloseIcon className="w-5 h-5" />,
      label: '이슈관리',
      content: <div className="p-4 border rounded bg-gray-50">이슈관리 내용입니다.</div>
    },
  ];

 
  // 햄버거 메뉴 버튼 렌더링 함수
  const renderHamburgerButton = () => {
    return (
      <button 
        className="p-2 rounded-md text-white hover:bg-slate-700 transition-colors"
        onClick={toggleMobileMenu}
        aria-label="메뉴 열기"
      >
        <Bars3Icon className="w-6 h-6" />
      </button>
    );
  };

  // 모바일 메뉴 사이드바 렌더링 함수
  const renderMobileMenuSidebar = () => {
    if (!mobileMenuOpen) return null;
    
    return (
      <div className="fixed inset-0 z-50 flex">
        {/* 배경 오버레이 */}
        <div 
          className="fixed inset-0 transition-opacity" 
          onClick={toggleMobileMenu}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
        />
        
        {/* 사이드바 메뉴 */}
        <div className="fixed right-0 top-0 w-72 h-full bg-white shadow-lg transform transition-transform flex flex-col z-50">
          {/* 닫기 버튼 헤더 */}
          <div className="flex items-center justify-between p-4 border-b">
            <span className="font-medium">메뉴</span>
            <button 
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
              onClick={toggleMobileMenu}
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>
          
          {/* 전체 메뉴 영역을 스크롤 가능하게 변경 */}
          <div className="flex-1 overflow-auto">
            {/* 사용자 정보 */}
            <UserBox 
              userName="김경태" 
              teamName="프로젝트 1팀" 
              options={userOptions}
            />
            
            {/* 메뉴 - 스크롤 속성 제거 */}
            <div className="flex-grow">
              <Menu 
                items={menuItems}
                onMenuItemClick={handleMenuClick}
              />
            </div>
          </div>
          
          {/* 하단 버튼 */}
          <div className="border-t">
            <SideBottom />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col">
      <TopBar>
        {/* 모바일 화면에서만 보이는 햄버거 메뉴 버튼 */}
        {isMobile && renderHamburgerButton()}
      </TopBar>
      
      <div className="flex flex-1 overflow-hidden">
        {/* 데스크탑 메뉴 (모바일에서는 숨김) */}
        {!isMobile && (
          <div className="w-72 outline outline-1 outline-gray-300 h-full">
            <div className='flex flex-col '>
              <UserBox 
                userName="김경태" 
                teamName="프로젝트 1팀" 
                options={userOptions}
              />
                <SideBottom/>
              <div className="flex-grow h-full">
                <Menu 
                  items={menuItems}
                  onMenuItemClick={handleMenuClick}
                />
              </div>
            
            </div>
          </div>
        )}
        
        {/* 콘텐츠 영역 */}
        <div className='flex flex-col w-full overflow-hidden'>
          <div className="h-14 px-5 bg-gray-50 border-b border-l border-gray-300 flex justify-start items-center gap-2.5 w-full">
            <div className="flex justify-start items-center gap-2.5">
              <div className="justify-center text-slate-900 text-xl font-medium font-['Pretendard'] leading-7">
                {selectedMenu}
              </div>
            </div>
          </div>
          <div className='flex flex-col p-5 h-full border-l border-gray-300 gap-4 overflow-auto'>
            <Tab 
              tabs={outlineTabs}
              defaultActiveTab={0}
              design={TAB_DESIGNS.OUTLINE}
              iconPosition={ICON_POSITIONS.RIGHT}
              showContent={false}
            />
            
            {/* 콘텐츠 영역 - children으로 주입받음 */}
            <div className="w-full min-w-0">
              {children}
            </div>
          </div>
        </div>
      </div>
      
      {/* 모바일 메뉴 사이드바 (열릴 때만 표시) */}
      {isMobile && renderMobileMenuSidebar()}
    </div>
  );
};
export default MainLayout;