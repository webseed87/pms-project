import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ChevronDownIcon, ChevronRightIcon, Bars3Icon } from '@heroicons/react/24/outline';

/**
 * 메뉴 아이템 타입 정의
 * @typedef {Object} MenuItem
 * @property {string} id - 메뉴 아이템의 고유 식별자
 * @property {string} label - 메뉴에 표시될 텍스트
 * @property {React.ReactNode} [icon] - 메뉴 아이템 아이콘 (선택사항)
 * @property {Function} [onClick] - 메뉴 클릭 시 실행할 함수 (선택사항)
 * @property {boolean} [expanded] - 하위 메뉴가 펼쳐졌는지 여부 (선택사항)
 * @property {MenuItem[]} [children] - 하위 메뉴 아이템 배열 (선택사항)
 */

/**
 * SubMenu 컴포넌트 - 2차 메뉴를 표시합니다.
 */
const SubMenu = ({ items, level = 2, onMenuItemClick, parentId, selectedItemId }) => {
  return (
    <div className="bg-gray-50">
      {items.map((item) => {
        const isSelected = selectedItemId === item.id;
        return (
          <div
            key={item.id}
            className={`py-3 px-8 text-sm text-slate-700 border-t border-gray-200 cursor-pointer ${isSelected ? 'bg-blue-50' : 'hover:bg-blue-50'}`}
            onClick={(e) => {
              e.stopPropagation();
              if (item.onClick) item.onClick();
              if (onMenuItemClick) onMenuItemClick(item, parentId);
            }}
          >
            <div className="flex items-center gap-2">
              {item.icon && (
                <span className="text-blue-600">{item.icon}</span>
              )}
              <span className="font-medium">{item.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/**
 * MenuItem 컴포넌트 - 단일 메뉴 아이템을 표시합니다.
 */
const MenuItem = ({ item, isActive, onClick, onSubMenuToggle, selectedItemId }) => {
  const hasChildren = item.children && item.children.length > 0;
  const submenuRef = useRef(null);
  const [submenuHeight, setSubmenuHeight] = useState(0);
  
  useEffect(() => {
    if (submenuRef.current) {
      const height = isActive ? submenuRef.current.scrollHeight : 0;
      setSubmenuHeight(height);
    }
  }, [isActive]);
  
  return (
    <div className="menu-item">
      <div 
        className={`p-4 flex items-center justify-start gap-3 border-t border-gray-300 transition-colors cursor-pointer
          ${isActive ? 'bg-slate-800' : 'bg-white'}
        `}
        onClick={(e) => {
          if (hasChildren) {
            onSubMenuToggle(item.id);
            e.stopPropagation();
          } else if (onClick) {
            onClick(item);
          }
        }}
      >
        {/* 아이콘 컨테이너 */}
        <div className="w-6 h-6 relative overflow-hidden">
          {item.icon ? (
            <span className={`${isActive ? 'text-slate-200' : 'text-blue-600'}`}>{item.icon}</span>
          ) : (
            <div className="w-4 h-4 left-[4px] top-[4px] absolute outline outline-2 outline-offset-[-1px] outline-blue-500" />
          )}
        </div>
        
        {/* 텍스트와 화살표 컨테이너 */}
        <div className="flex-1 flex justify-between items-center">
          <div className={`justify-start text-base font-medium font-['Pretendard'] leading-normal ${isActive ? 'text-slate-200' : 'text-slate-900'}`}>
            {item.label}
          </div>
          
          {hasChildren && (
            <ChevronDownIcon 
              className={`w-4 h-4 ${isActive ? 'text-slate-200 transform rotate-180' : 'text-slate-900'} transition-transform duration-300`} 
            />
          )}
        </div>
      </div>
      
      {/* 하위 메뉴 - 높이 애니메이션 추가 */}
      {hasChildren && (
        <div 
          ref={submenuRef}
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: `${submenuHeight}px` }}
        >
          <SubMenu 
            items={item.children} 
            onMenuItemClick={onClick} 
            parentId={item.id}
            selectedItemId={selectedItemId}
          />
        </div>
      )}
    </div>
  );
};

/**
 * Menu 컴포넌트 - 1차 및 2차 메뉴를 지원하는 드롭다운 메뉴입니다.
 * 
 * @component
 * @example
 * const menuItems = [
 *   {
 *     id: 'menu1',
 *     label: '프로젝트 관리',
 *     icon: <DocumentIcon className="w-5 h-5" />,
 *     children: [
 *       { id: 'submenu1', label: '프로젝트 정보' },
 *       { id: 'submenu2', label: '프로젝트 업무 정보' }
 *     ]
 *   },
 *   {
 *     id: 'menu2',
 *     label: '과제관리',
 *     icon: <FolderIcon className="w-5 h-5" />,
 *   }
 * ];
 * 
 * <Menu 
 *   title="프로젝트 관리"
 *   items={menuItems}
 *   onMenuItemClick={(item) => console.log('선택된 메뉴:', item)}
 * />
 */
const Menu = ({ 
  title, 
  items, 
  onMenuItemClick,
  isCollapsible = true,
  defaultCollapsed = false,
  className = ""
}) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [activeMenus, setActiveMenus] = useState({});
  const menuBodyRef = useRef(null);
  const [menuBodyHeight, setMenuBodyHeight] = useState('auto');
  const [selectedItemId, setSelectedItemId] = useState(null);
  
  useEffect(() => {
    if (menuBodyRef.current) {
      if (collapsed) {
        setMenuBodyHeight(0);
      } else {
        setMenuBodyHeight(menuBodyRef.current.scrollHeight);
      }
    }
  }, [collapsed]);
  
  const handleSubMenuToggle = (menuId) => {
    setActiveMenus(prev => {
      // 클릭한 메뉴가 이미 활성화되어 있는지 확인
      const isCurrentlyActive = prev[menuId];
      
      // 새로운 상태 객체를 생성 (모든 메뉴 닫힘)
      const newState = {};
      
      // 클릭한 메뉴가 활성화되어 있지 않았다면 해당 메뉴만 열기
      if (!isCurrentlyActive) {
        newState[menuId] = true;
      }
      
      return newState;
    });
  };
  
  const handleMenuItemClick = (item, parentId) => {
    setSelectedItemId(item.id);
    if (onMenuItemClick) {
      onMenuItemClick(item, parentId);
    }
  };
  
  return (
    <div className={`bg-white shadow-sm border border-gray-300 ${className}`}>
      {/* 메뉴 헤더 */}
      {title && (
        <div 
          className={`flex items-center justify-between p-4 bg-slate-800 text-white ${isCollapsible ? 'cursor-pointer' : ''}`}
          onClick={() => isCollapsible && setCollapsed(!collapsed)}
        >
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 relative overflow-hidden flex items-center justify-center">
              <Bars3Icon className="w-5 h-5 text-slate-200" />
            </div>
            <div className="justify-start text-slate-200 text-base font-medium font-['Pretendard'] leading-normal">{title}</div>
          </div>
          {isCollapsible && (
            <ChevronDownIcon 
              className={`w-4 h-4 text-slate-200 transition-transform duration-300 ${!collapsed ? 'transform rotate-180' : ''}`} 
            />
          )}
        </div>
      )}
      
      {/* 메뉴 바디 - 전체 메뉴의 열고 닫힘에도 애니메이션 적용 */}
      <div 
        ref={menuBodyRef}
        className={`menu-body overflow-hidden transition-all duration-300 ease-in-out ${collapsed && isCollapsible ? 'opacity-0' : 'opacity-100'}`}
        style={{ maxHeight: !isCollapsible ? 'none' : (collapsed ? '0' : 'auto') }}
      >
        {items.map((item, index) => (
          <MenuItem 
            key={item.id}
            item={item}
            isActive={activeMenus[item.id]}
            onClick={handleMenuItemClick}
            onSubMenuToggle={handleSubMenuToggle}
            selectedItemId={selectedItemId}
          />
        ))}
      </div>
    </div>
  );
};

SubMenu.propTypes = {
  items: PropTypes.array.isRequired,
  level: PropTypes.number,
  onMenuItemClick: PropTypes.func,
  parentId: PropTypes.string
};

MenuItem.propTypes = {
  item: PropTypes.object.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  onSubMenuToggle: PropTypes.func
};

Menu.propTypes = {
  /** 메뉴의 제목 */
  title: PropTypes.string,
  /** 메뉴 아이템 배열 */
  items: PropTypes.array.isRequired,
  /** 메뉴 아이템 클릭 시 호출되는 콜백 함수 */
  onMenuItemClick: PropTypes.func,
  /** 메뉴가 접힐 수 있는지 여부 */
  isCollapsible: PropTypes.bool,
  /** 메뉴의 초기 접힘 상태 */
  defaultCollapsed: PropTypes.bool,
  /** 추가 CSS 클래스 */
  className: PropTypes.string
};

export default Menu; 