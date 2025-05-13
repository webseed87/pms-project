import { useState } from 'react';
import { ButtonExample } from './components/ui/Button';
import InputExample from './components/ui/Input/InputExample';
import SelectExample from './components/ui/Select/SelectExample';
import DatePickerExample from './components/ui/DatePicker/DatePickerExample';
import { MenuExample } from './components/ui/Menu';

function App() {
  const [activeTab, setActiveTab] = useState('button');

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">UI 컴포넌트 사용 예제</h1>
        <p className="text-sm text-gray-500 text-center mb-6">https://heroicons.com/ 에서 아이콘 선택해서 사용하세요.</p>
        
        {/* 탭 네비게이션 */}
        <div className="flex border-b mb-6 overflow-x-auto">
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'button' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
            onClick={() => setActiveTab('button')}
          >
            Button 컴포넌트
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'input' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
            onClick={() => setActiveTab('input')}
          >
            Input 컴포넌트
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'select' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
            onClick={() => setActiveTab('select')}
          >
            Select 컴포넌트
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'datepicker' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
            onClick={() => setActiveTab('datepicker')}
          >
            DatePicker 컴포넌트
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'menu' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
            onClick={() => setActiveTab('menu')}
          >
            Menu 컴포넌트
          </button>
        </div>
        
        {/* 컴포넌트 예제 */}
        {activeTab === 'button' && <ButtonExample />}
        {activeTab === 'input' && <InputExample />}
        {activeTab === 'select' && <SelectExample />}
        {activeTab === 'datepicker' && <DatePickerExample />}
        {activeTab === 'menu' && <MenuExample />}
      </div>
    </div>
  );
}

export default App;
