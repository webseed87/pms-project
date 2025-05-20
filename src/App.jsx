import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import UiComponentsPage from './pages/UiComponentsPage';
import TablePage from './pages/TablePage';
import PagePage from './pages/PagePage';
import SearchBox from './pages/SearchBox';
import ModalPage from './pages/ModalPage';
import { ButtonExample } from './components/ui/Button';
import InputExample from './components/ui/Input/InputExample';
import SelectExample from './components/ui/Select/SelectExample';
import DatePickerExample from './components/ui/DatePicker/DatePickerExample';
import { MenuExample } from './components/ui/Menu';
import { CheckboxExample } from './components/ui/Checkbox';
import { LabelExample } from './components/ui/Label';
import UserBox from './components/userbox';

// 좌측 메뉴 컴포넌트
const LeftMenu = ({ isCollapsed, onToggle }) => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  // 사용자 옵션
  const userOptions = [
    { label: '내 프로필', onClick: () => console.log('내 프로필 클릭') },
    { label: '설정', onClick: () => console.log('설정 클릭') },
    { label: '로그아웃', onClick: () => console.log('로그아웃 클릭') },
  ];

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} bg-gray-50 min-h-screen overflow-y-auto border-r border-gray-200 transition-all duration-300 ease-in-out`}>
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!isCollapsed && <h2 className="text-lg font-medium text-gray-800">메뉴</h2>}
        <button
          onClick={onToggle}
          className="p-1 rounded hover:bg-gray-200 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRightIcon className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>
      
    
      
      <nav className="mt-4">
        <ul>
          <li>
            <Link
              to="/ui"
              className={`w-full text-left px-4 py-3 block ${
                isActive('/ui') ? 'bg-blue-50 text-blue-600 font-medium border-l-4 border-blue-600' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {!isCollapsed && "UI 컴포넌트 사용예제"}
            </Link>
          </li>
          <li>
            <Link
              to="/searchbox"
              className={`w-full text-left px-4 py-3 block ${
                isActive('/searchbox') ? 'bg-blue-50 text-blue-600 font-medium border-l-4 border-blue-600' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {!isCollapsed && "상단"}
            </Link>
          </li>
          <li>
            <Link
              to="/table"
              className={`w-full text-left px-4 py-3 block ${
                isActive('/table') ? 'bg-blue-50 text-blue-600 font-medium border-l-4 border-blue-600' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {!isCollapsed && "테이블"}
            </Link>
          </li>
          <li>
            <Link
              to="/modal"
              className={`w-full text-left px-4 py-3 block ${
                isActive('/modal') ? 'bg-blue-50 text-blue-600 font-medium border-l-4 border-blue-600' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {!isCollapsed && "모달 팝업"}
            </Link>
          </li>
          <li>
            <Link
              to="/page"
              className={`w-full text-left px-4 py-3 block ${
                isActive('/page') ? 'bg-blue-50 text-blue-600 font-medium border-l-4 border-blue-600' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {!isCollapsed && "예제 페이지"}
            </Link>
          </li>
        
        </ul>
      </nav>
    </div>
  );
};

function App() {
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);

  const toggleMenu = () => {
    setIsMenuCollapsed(!isMenuCollapsed);
  };

  return (
    <Router>
      <div className="h-screen bg-gray-100 flex">
        {/* 좌측 메뉴 */}
        <LeftMenu isCollapsed={isMenuCollapsed} onToggle={toggleMenu} />
        
        {/* 우측 콘텐츠 영역 */}
        <div className="flex-1 overflow-hidden p-6">
          <div className="bg-white rounded-lg shadow-xl p-6 h-full overflow-hidden">
            <Routes>
              <Route path="/" element={<UiComponentsPage />} />
              <Route path="/ui" element={<UiComponentsPage />} />
              <Route path="/searchbox" element={<SearchBox />} />
              <Route path="/table" element={<TablePage />} />
              <Route path="/page" element={<PagePage />} />
              <Route path="/modal" element={<ModalPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
