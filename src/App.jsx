import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import UiComponentsPage from './pages/UiComponentsPage';
import TablePage from './pages/TablePage';
import PagePage from './pages/PagePage';
import { ButtonExample } from './components/ui/Button';
import InputExample from './components/ui/Input/InputExample';
import SelectExample from './components/ui/Select/SelectExample';
import DatePickerExample from './components/ui/DatePicker/DatePickerExample';
import { MenuExample } from './components/ui/Menu';
import { CheckboxExample } from './components/ui/Checkbox';
import { LabelExample } from './components/ui/Label';

// 좌측 메뉴 컴포넌트
const LeftMenu = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="w-64 bg-gray-50 min-h-screen overflow-y-auto border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-800">메뉴</h2>
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
              UI 컴포넌트 사용예제
            </Link>
          </li>
          <li>
            <Link
              to="/table"
              className={`w-full text-left px-4 py-3 block ${
                isActive('/table') ? 'bg-blue-50 text-blue-600 font-medium border-l-4 border-blue-600' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              테이블
            </Link>
          </li>
          <li>
            <Link
              to="/page"
              className={`w-full text-left px-4 py-3 block ${
                isActive('/page') ? 'bg-blue-50 text-blue-600 font-medium border-l-4 border-blue-600' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              페이지
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="h-screen bg-gray-100 flex">
        {/* 좌측 메뉴 */}
        <LeftMenu />
        
        {/* 우측 콘텐츠 영역 */}
        <div className="flex-1 overflow-hidden p-6">
          <div className="bg-white rounded-lg shadow-xl p-6 h-full overflow-hidden">
            <Routes>
              <Route path="/" element={<UiComponentsPage />} />
              <Route path="/ui" element={<UiComponentsPage />} />
              <Route path="/table" element={<TablePage />} />
              <Route path="/page" element={<PagePage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
