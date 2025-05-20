import React, { useState } from 'react';
import { ButtonExample } from '../components/ui/Button';
import InputExample from '../components/ui/Input/InputExample';
import SelectExample from '../components/ui/Select/SelectExample';
import DatePickerExample from '../components/ui/DatePicker/DatePickerExample';
import { MenuExample } from '../components/ui/Menu';
import { CheckboxExample } from '../components/ui/Checkbox';
import { LabelExample } from '../components/ui/Label';
import Tab, { TAB_DESIGNS, ICON_POSITIONS } from '../components/ui/Tab';
import { TabExample } from '../components/ui/Tab';
import { UserBoxExample } from '../components/userbox';

const UiComponentsPage = () => {
  const [activeTab, setActiveTab] = useState('button');

  // 탭 변경 핸들러
  const handleTabChange = (index) => {
    const tabKeys = ['button', 'input', 'select', 'datepicker', 'menu', 'checkbox', 'label', 'tab', 'userbox'];
    setActiveTab(tabKeys[index]);
  };

  // UI 컴포넌트 탭 정의
  const tabs = [
    { label: 'Button 컴포넌트', content: null },
    { label: 'Input 컴포넌트', content: null },
    { label: 'Select 컴포넌트', content: null },
    { label: 'DatePicker 컴포넌트', content: null },
    { label: 'Menu 컴포넌트', content: null },
    { label: 'Checkbox 컴포넌트', content: null },
    { label: 'Label 컴포넌트', content: null },
    { label: 'Tab 컴포넌트', content: null },
  ];

  // 활성 탭 인덱스 계산
  const getActiveTabIndex = () => {
    const tabKeys = ['button', 'input', 'select', 'datepicker', 'menu', 'checkbox', 'label', 'tab'];
    return tabKeys.indexOf(activeTab);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-none">
        <h2 className="text-xl font-semibold mb-4">UI 컴포넌트 사용 예제</h2>
        <p className="text-sm text-gray-500 mb-6">https://heroicons.com/ 에서 아이콘 선택해서 사용하세요.</p>
        
        <Tab 
          tabs={tabs}
          defaultActiveTab={getActiveTabIndex()}
          onChange={handleTabChange}
          className="mb-6"
          design={TAB_DESIGNS.OUTLINE}
          iconPosition={ICON_POSITIONS.LEFT}
          
          showContent={false}
        />
      </div>
      
      <div className="flex-1 overflow-auto">
        {activeTab === 'button' && <ButtonExample />}
        {activeTab === 'input' && <InputExample />}
        {activeTab === 'select' && <SelectExample />}
        {activeTab === 'datepicker' && <DatePickerExample />}
        {activeTab === 'menu' && <MenuExample />}
        {activeTab === 'checkbox' && <CheckboxExample />}
        {activeTab === 'label' && <LabelExample />}
        {activeTab === 'tab' && <TabExample />}

      </div>
    </div>
  );
};

export default UiComponentsPage; 