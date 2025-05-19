import React, { useState } from 'react';
import { ButtonExample } from '../components/ui/Button';
import InputExample from '../components/ui/Input/InputExample';
import SelectExample from '../components/ui/Select/SelectExample';
import DatePickerExample from '../components/ui/DatePicker/DatePickerExample';
import { MenuExample } from '../components/ui/Menu';
import { CheckboxExample } from '../components/ui/Checkbox';
import { LabelExample } from '../components/ui/Label';

const UiComponentsPage = () => {
  const [activeTab, setActiveTab] = useState('button');

  // UI 컴포넌트 탭 네비게이션 렌더링
  const renderUiTabs = () => {
    return (
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
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'checkbox' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
          onClick={() => setActiveTab('checkbox')}
        >
          Checkbox 컴포넌트
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'label' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
          onClick={() => setActiveTab('label')}
        >
          Label 컴포넌트
        </button>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-none">
        <h2 className="text-xl font-semibold mb-4">UI 컴포넌트 사용 예제</h2>
        <p className="text-sm text-gray-500 mb-6">https://heroicons.com/ 에서 아이콘 선택해서 사용하세요.</p>
        
        {renderUiTabs()}
      </div>
      
      <div className="flex-1 overflow-auto">
        {activeTab === 'button' && <ButtonExample />}
        {activeTab === 'input' && <InputExample />}
        {activeTab === 'select' && <SelectExample />}
        {activeTab === 'datepicker' && <DatePickerExample />}
        {activeTab === 'menu' && <MenuExample />}
        {activeTab === 'checkbox' && <CheckboxExample />}
        {activeTab === 'label' && <LabelExample />}
      </div>
    </div>
  );
};

export default UiComponentsPage; 