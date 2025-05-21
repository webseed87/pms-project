import React from 'react';
import { AliveScope } from 'react-activation';
import AppInner from '../components/table/AppInner';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import SearchForm from '../components/searchbox/SearchForm';
import ToolBar from '../components/searchbox/ToolBar';

const TablePage = () => (
  <div className='w-full flex flex-col gap-4'>
    <div className='w-full'>
      <ToolBar />
      <SearchForm />
    </div>
  <AliveScope>
    <AppInner />
  </AliveScope>
  </div>
);

export default TablePage;
