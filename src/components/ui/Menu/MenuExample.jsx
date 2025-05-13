import React, { useState } from 'react';
import Menu from './Menu';
import { 
  DocumentTextIcon, 
  CalendarIcon, 
  ChartBarIcon, 
  UserIcon, 
  CogIcon, 
  Squares2X2Icon,
  DocumentChartBarIcon,
  UserGroupIcon,
  ChartPieIcon,
  NewspaperIcon
} from '@heroicons/react/24/outline';

const MenuExample = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  // 메뉴 아이템 데이터
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
        { id: 'task-review', label: '발주사 완료 과제 전달' },
        { id: 'task-review', label: '과제 진척 정보' },
        { id: 'task-review', label: '발주사 반영 요청' },

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
      icon: <NewspaperIcon   className="w-6 h-6" />,
      children: [
        { id: 'settings-company', label: '팀 정보' },
        { id: 'settings-department', label: '직무직급 정보' },
        { id: 'settings-code', label: '거래처 정보' },
        { id: 'settings-system', label: '공통 코드 정보' },
        { id: 'settings-backup', label: '공휴일 정보' },
        { id: 'settings-backup', label: '메시지 정보' },
      ]
    }
  ];

  const handleMenuItemClick = (item, parentId) => {
    let label = item.label;
    if (parentId) {
      const parent = menuItems.find(m => m.id === parentId);
      if (parent) {
        label = `${parent.label} > ${item.label}`;
      }
    }
    
    setSelectedItem(label);
    console.log('선택된 메뉴:', item, '부모 메뉴:', parentId);
  };

  return (
    <div className="p-6 space-y-10">
      <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b">메뉴 컴포넌트 예제</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1">
          <Menu 
            items={menuItems}
            onMenuItemClick={handleMenuItemClick}
            isCollapsible={false}
          />
        </div>
        
        <div className="col-span-2 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-4">선택된 메뉴</h3>
          {selectedItem ? (
            <div className="p-4 bg-white rounded border border-gray-200">
              {selectedItem}
            </div>
          ) : (
            <div className="p-4 bg-white rounded border border-gray-200 text-gray-500">
              왼쪽 메뉴에서 항목을 선택해주세요.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuExample; 